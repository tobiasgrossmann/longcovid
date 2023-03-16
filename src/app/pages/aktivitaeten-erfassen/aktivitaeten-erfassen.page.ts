import { AfterViewInit, Component, OnInit } from "@angular/core";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {SQLiteService} from "../../services/sqlite.service";
import {DetailService} from "../../services/detail.service";
import {DatabaseCrudService} from "../../services/database-crud.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastServiceService} from "../../services/toast-service.service";
import {TranslateService} from "@ngx-translate/core";
import {Aktivitaet} from "../../utils/interfaces";

@Component({
  selector: "app-aktivitaeten-erfassen",
  templateUrl: "./aktivitaeten-erfassen.page.html",
  styleUrls: ["./aktivitaeten-erfassen.page.scss"],
})
export class AktivitaetenErfassenPage implements OnInit, AfterViewInit {

  public form: FormGroup;
  public aktivitaeten: Array<Aktivitaet> = [];
  public aktivitaetenNameListe: string;
  public aktivitaetenCheckboxListeArray: any;
  public aktivitaetenValues: any;
  public aktivitaetenCheckboxListe = [
    {
      aktivitaet: this.translateService.instant("aktivitaet-erfassen-page.sport"),
      value: this.translateService.instant("aktivitaet-erfassen-page.sport"),
      number_value: null,
      checked: false
    },
    {
      aktivitaet: this.translateService.instant("aktivitaet-erfassen-page.arbeit"),
      value: this.translateService.instant("aktivitaet-erfassen-page.arbeit"),
      number_value: null,
      checked: false
    },
    {
      aktivitaet: this.translateService.instant("aktivitaet-erfassen-page.hausarbeit"),
      value: this.translateService.instant("aktivitaet-erfassen-page.hausarbeit"),
      number_value: null,
      checked: false
    },
    {
      aktivitaet: this.translateService.instant("aktivitaet-erfassen-page.entspannung"),
      value: this.translateService.instant("aktivitaet-erfassen-page.entspannung"),
      number_value: null,
      checked: false
    }
  ];

  private readonly tagId;

  constructor(
      private fb: FormBuilder,
      private sqliteService: SQLiteService,
      private detailService: DetailService,
      private databaseCrudService: DatabaseCrudService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private toastService: ToastServiceService,
      public translateService: TranslateService
  ) {
    this.tagId = this.activatedRoute.snapshot.params.tagId;

    this.form = this.fb.group({
      aktivitaetenCheckboxListe: this.fb.array([]),
      aktivitaetenListe: [""],
      sportValue: null,
      arbeitValue: null,
      hausarbeitValue: null,
      entspannungValue: null
    });

    this.onLoadCheckboxStatus();
  }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    await this.loadAktivitaeten();
  }

  onLoadCheckboxStatus() {
    const aktivitaetenCheckboxListe: FormArray = this.form.get("aktivitaetenCheckboxListe") as FormArray;
    this.aktivitaetenCheckboxListe.forEach(o => {
      this.updateCheckControl(aktivitaetenCheckboxListe, o);
    });
  }

  loadAktivitaeten(): any {
    this.databaseCrudService.getAktivitaetenListbyTagId(this.tagId)
        .then(res => {
          if (res.values) {

            if (res.values[0].aktivitaetenNames) {
              this.aktivitaetenNameListe = res.values[0].aktivitaetenNames;
              this.form.patchValue({aktivitaetenListe: this.aktivitaetenNameListe});
            }

            if (res.values[0].aktivitaetenNamesCheckboxes) {

              this.aktivitaetenCheckboxListe[0].number_value = res.values[0].sportValue;
              this.aktivitaetenCheckboxListe[1].number_value = res.values[0].arbeitValue;
              this.aktivitaetenCheckboxListe[2].number_value = res.values[0].hausarbeitValue;
              this.aktivitaetenCheckboxListe[3].number_value = res.values[0].entspannungValue;

              //patch values from database to form
              this.form.patchValue({
                sportValue: res.values[0].sportValue,
                arbeitValue: res.values[0].arbeitValue,
                hausarbeitValue: res.values[0].hausarbeitValue,
                entspannungValue: res.values[0].entspannungValue,
              });

              //split string data from database into array
              this.aktivitaetenCheckboxListeArray = res.values[0].aktivitaetenNamesCheckboxes.split(",");
              //loop through array
              this.aktivitaetenCheckboxListeArray.forEach((item: string) => {
                //if array item can be identified as possible activity then go on
                if (this.aktivitaetenCheckboxListe.find(x => x.aktivitaet === item)) {
                  //find Index of activitiy
                  const aktivitaetenCheckboxListeIndex = this.aktivitaetenCheckboxListe.findIndex(x => x.aktivitaet === item);
                  //check checkbox of activitiy
                  this.aktivitaetenCheckboxListe[aktivitaetenCheckboxListeIndex].checked = true;
                }
              });
            }

          }
          return this.aktivitaetenNameListe;
        })
        .catch(error => {
          console.log(error);
          this.toastService.showErrorToast(this.translateService.instant("aktivitaet-erfassen-page.error"));
        });

  }

  updateAktivitaeten(): any {
    this.databaseCrudService.updateAktivitaetenNames(
        this.tagId,
        this.form.value.aktivitaetenListe,
        this.form.value.aktivitaetenCheckboxListe,
        this.form.value.sportValue,
        this.form.value.arbeitValue,
        this.form.value.hausarbeitValue,
        this.form.value.entspannungValue
    )
        .then(res => {
          if (res.values) {
            this.aktivitaetenNameListe = res.values[0].aktivitaetenNames;
            this.aktivitaetenCheckboxListe = res.values[0].aktivitaetenNamesCheckboxes;
            this.form.patchValue({
              aktivitaetenListe: this.aktivitaetenNameListe,
              sportValue: res.values[0].sportValue,
              arbeitValue: res.values[0].arbeitValue,
              hausarbeitValue: res.values[0].hausarbeitValue,
              entspannungValue: res.values[0].entspannungValue,
            });
          }
          this.toastService.showSuccessToast(this.translateService.instant("aktivitaet-erfassen-page.success"));
          return this.aktivitaetenNameListe;
        })
        .catch(error => {
          console.log(error);
          this.toastService.showErrorToast(this.translateService.instant("aktivitaet-erfassen-page.error"));
        });
  }

  onSelectionChange(event: any, item: any) {
    const aktivitaetenCheckboxListe: FormArray = this.form.get("aktivitaetenCheckboxListe") as FormArray;
    this.aktivitaetenCheckboxListe[item].checked = event.target.checked;
    this.updateCheckControl(aktivitaetenCheckboxListe, event.target);
  }

  updateCheckControl(cal, object) {
    if (object.checked) {
      cal.push(new FormControl(object.value));
    } else {
      cal.controls.forEach((item: FormControl, index) => {
        if (item.value === object.value) {
          cal.removeAt(index);
          return;
        }
      });
    }
  }

  onValueChange(event: any, item: any) {
    this.aktivitaetenCheckboxListe[item].number_value = event.detail.value;
    switch (item) {
      case 0:
        //Sport
        return this.form.patchValue({sportValue: this.aktivitaetenCheckboxListe[item].number_value});
        break;
      case 1:
        //Arbeit
        return this.form.patchValue({arbeitValue: this.aktivitaetenCheckboxListe[item].number_value});
        break;
      case 2:
        //Hausarbeit
        return this.form.patchValue({hausarbeitValue: this.aktivitaetenCheckboxListe[item].number_value});
        break;
      case 3:
        //Entspannung
        return this.form.patchValue({entspannungValue: this.aktivitaetenCheckboxListe[item].number_value});
        break;
      default:
        throw Error("Invalider case");
    }
  }

  async onSubmit() {
    await this.updateAktivitaeten();
    await this.loadAktivitaeten();
    await this.router.navigateByUrl("/tabs/tagebuch-timeline");
  }

}

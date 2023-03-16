import { AfterViewInit, Component, OnInit } from "@angular/core";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {SQLiteService} from "../../services/sqlite.service";
import {DetailService} from "../../services/detail.service";
import {DatabaseCrudService} from "../../services/database-crud.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastServiceService} from "../../services/toast-service.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-tagesform-erfassen",
  templateUrl: "./tagesform-erfassen.page.html",
  styleUrls: ["./tagesform-erfassen.page.scss"],
})
export class TagesformErfassenPage implements OnInit, AfterViewInit {

  public form: UntypedFormGroup;
  public tagesformValue: number = null;
  public erschoepfungsartValue: number = null;
  public schlafValue: number = null;
  public stimmungValue: number = null;
  private readonly tagId;

  constructor(
      private fb: UntypedFormBuilder,
      private sqliteService: SQLiteService,
      private detailService: DetailService,
      private databaseCrudService: DatabaseCrudService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private toastService: ToastServiceService,
      public translateService: TranslateService,
  ) {
    this.tagId = this.activatedRoute.snapshot.params.tagId;

  }

  ngOnInit() {
    this.form = this.fb.group({
      tagesform: [],
      erschoepfungsart: [],
      schlaf: [],
      stimmung: []
    });
  }

  async ngAfterViewInit() {
    await this.loadTagesform();
  }

  loadTagesform(): any {
    this.databaseCrudService.getTagesformListbyTagId(this.tagId)
        .then(res => {
          if (res.values) {
              console.log(res);
              this.tagesformValue = res.values[0]?.tagesformValue;
              this.erschoepfungsartValue = res.values[0]?.erschoepfungsartValue;
              this.schlafValue = res.values[0]?.schlafValue;
              this.stimmungValue = res.values[0]?.stimmungValue;

              this.form.patchValue(
                  {
                    erschoepfungsart: this.erschoepfungsartValue,
                    tagesform: this.tagesformValue,
                    schlaf: this.schlafValue,
                    stimmung: this.stimmungValue
                  }
              );

          }

        })
        .catch(error => {
          console.log(error);
          this.toastService.showErrorToast(this.translateService.instant("tagesform-erfassen-page.error"));
          // this.translateService.get("fahrauftrag-anzeigen.fetch-fehler").subscribe((res: string) => {
          //   this.toastService.error(res, "",{opacity: 0.9});
          // });
        });

  }

    updateTagesform(): any {
        console.log(this.form.value.tagesform);
        console.log(this.form.value.erschoepfungsart);
        console.log(this.form);
        console.log(this.tagesformValue);
        console.log(this.erschoepfungsartValue);

        this.databaseCrudService.updateTagesformNames(this.tagId, this.form.value.tagesform, this.form.value.erschoepfungsart,
        this.form.value.schlaf, this.form.value.stimmung)
            .then(res => {
                console.log(res);
                if (res.values) {
                    console.log(res.values[0]?.tagesformValue);
                    console.log(res.values[0]?.erschoepfungsartValue);
                    this.tagesformValue = res.values[0]?.tagesformValue;
                    this.erschoepfungsartValue = res.values[0]?.erschoepfungsartValue;
                    this.schlafValue = res.values[0]?.schlafValue;
                    this.stimmungValue = res.values[0]?.stimmungValue;
                    this.form.patchValue(
                        {
                            erschoepfungsart: this.erschoepfungsartValue,
                            tagesform: this.tagesformValue,
                            schlaf: this.schlafValue,
                            stimmung: this.stimmungValue
                        }
                    );
                }
                this.toastService.showSuccessToast(this.translateService.instant("tagesform-erfassen-page.success"));
            })
            .catch(error => {
                console.log(error);
                this.toastService.showErrorToast(this.translateService.instant("tagesform-erfassen-page.error"));
            });
    }

    onSelectionChange(event: any, key: any) {
        if (key === "tagesformValue") {
            this.tagesformValue = event.detail.value;
        } else if ( key === "erschoepfungsartValue") {
            this.erschoepfungsartValue = event.detail.value;
        } else if ( key === "schlafValue") {
            this.schlafValue = event.detail.value;
        } else if ( key === "stimmungValue") {
            this.stimmungValue = event.detail.value;
        }
    }

  async onSubmit() {
      await this.updateTagesform();
      await this.loadTagesform();
      await this.router.navigateByUrl("/tabs/tagebuch-timeline");
  }


}

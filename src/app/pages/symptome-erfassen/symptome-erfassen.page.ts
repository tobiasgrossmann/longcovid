import {AfterViewInit, Component, OnInit} from "@angular/core";
import {UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {SQLiteService} from "../../services/sqlite.service";
import {DetailService} from "../../services/detail.service";
import {DatabaseCrudService} from "../../services/database-crud.service";
import {Symptom} from "../../utils/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastServiceService} from "../../services/toast-service.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: "app-symptome-erfassen",
    templateUrl: "./symptome-erfassen.page.html",
    styleUrls: ["./symptome-erfassen.page.scss"],
})
export class SymptomeErfassenPage implements OnInit, AfterViewInit {

    public form: UntypedFormGroup;
    public symptome: Array<Symptom> = [];
    public symptomeNameListe: string;
    public symptomeCheckboxListeArray: any;
    public symptomValues: any;
    public symptomeCheckboxListe = [
        {
            symptom: this.translateService.instant("symptome-erfassen-page.husten"),
            value: this.translateService.instant("symptome-erfassen-page.husten"),
            number_value: null,
            checked: false
        },
        {
            symptom: this.translateService.instant("symptome-erfassen-page.fieber"),
            value: this.translateService.instant("symptome-erfassen-page.fieber"),
            number_value: null,
            checked: false
        },
        {
            symptom: this.translateService.instant("symptome-erfassen-page.fatigue"),
            value: this.translateService.instant("symptome-erfassen-page.fatigue"),
            number_value: null,
            checked: false
        },
        {
            symptom: this.translateService.instant("symptome-erfassen-page.kurzatmigkeit"),
            value: this.translateService.instant("symptome-erfassen-page.kurzatmigkeit"),
            number_value: null,
            checked: false
        },
        {
            symptom: this.translateService.instant("symptome-erfassen-page.brustschmerzen"),
            value: this.translateService.instant("symptome-erfassen-page.brustschmerzen"),
            number_value: null,
            checked: false
        },
        {
            symptom: this.translateService.instant("symptome-erfassen-page.kopfschmerzen"),
            value: this.translateService.instant("symptome-erfassen-page.kopfschmerzen"),
            number_value: null,
            checked: false
        },
        {
            symptom: this.translateService.instant("symptome-erfassen-page.geschmacksverlust"),
            value: this.translateService.instant("symptome-erfassen-page.geschmacksverlust"),
            number_value: null,
            checked: false
        },
        {
            symptom: this.translateService.instant("symptome-erfassen-page.neurologische-störung"),
            value: this.translateService.instant("symptome-erfassen-page.neurologische-störung"),
            number_value: null,
            checked: false
        },
        {
            symptom: this.translateService.instant("symptome-erfassen-page.muskelschmerzen"),
            value: this.translateService.instant("symptome-erfassen-page.muskelschmerzen"),
            number_value: null,
            checked: false
        },
        {
            symptom: this.translateService.instant("symptome-erfassen-page.hautausschlag"),
            value: this.translateService.instant("symptome-erfassen-page.hautausschlag"),
            number_value: null,
            checked: false
        },
        {
            symptom: this.translateService.instant("symptome-erfassen-page.missempfindungen"),
            value: this.translateService.instant("symptome-erfassen-page.missempfindungen"),
            number_value: null,
            checked: false
        },
        {
            symptom: this.translateService.instant("symptome-erfassen-page.schwindel"),
            value: this.translateService.instant("symptome-erfassen-page.schwindel"),
            number_value: null,
            checked: false
        },
        {
            symptom: this.translateService.instant("symptome-erfassen-page.gedaechtniseinschraenkungen"),
            value: this.translateService.instant("symptome-erfassen-page.gedaechtniseinschraenkungen"),
            number_value: null,
            checked: false
        },
        {
            symptom: this.translateService.instant("symptome-erfassen-page.leseeinschraenkungen"),
            value: this.translateService.instant("symptome-erfassen-page.leseeinschraenkungen"),
            number_value: null,
            checked: false
        }
    ];

    private readonly tagId;

    constructor(
        private fb: UntypedFormBuilder,
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
            symptomeCheckboxListe: this.fb.array([]),
            symptomeListe: [""],
            hustenValue: null,
            fieberValue: null,
            fatigueValue: null,
            kurzatmigkeitValue: null,
            brustschmerzenValue: null,
            kopfschmerzenValue: null,
            geschmacksverlustValue: null,
            neurologischeStoerungValue: null,
            muskelschmerzenValue: null,
            hautausschlagValue: null,
            missempfindungenValue: null,
            schwindelValue: null,
            gedaechtniseinschraenkungenValue: null,
            leseeinschraenkungenValue: null
        });

        this.onLoadCheckboxStatus();
    }

    onLoadCheckboxStatus() {
        const symptomeCheckboxListe: UntypedFormArray = this.form.get("symptomeCheckboxListe") as UntypedFormArray;
        this.symptomeCheckboxListe.forEach(o => {
            this.updateCheckControl(symptomeCheckboxListe, o);
        });
    }

    ngOnInit() {
    }

    async ngAfterViewInit() {
        await this.loadSymptome();
    }

    loadSymptome(): any {
        this.databaseCrudService.getSymptomeListbyTagId(this.tagId)
            .then(res => {
                if (res.values) {

                    if (res && Array.isArray(res.values) && res.values[0]?.symptomNames) {
                        this.symptomeNameListe = res.values[0]?.symptomNames;
                        this.form.patchValue({symptomeListe: this.symptomeNameListe});
                    }

                    if (res && Array.isArray(res.values) && res.values[0]?.symptomNamesCheckboxes) {

                        this.symptomeCheckboxListe[0].number_value = res.values[0]?.hustenValue;
                        this.symptomeCheckboxListe[1].number_value = res.values[0]?.fieberValue;
                        this.symptomeCheckboxListe[2].number_value = res.values[0]?.fatigueValue;
                        this.symptomeCheckboxListe[3].number_value = res.values[0]?.kurzatmigkeitValue;
                        this.symptomeCheckboxListe[4].number_value = res.values[0]?.brustschmerzenValue;
                        this.symptomeCheckboxListe[5].number_value = res.values[0]?.kopfschmerzenValue;
                        this.symptomeCheckboxListe[6].number_value = res.values[0]?.geschmacksverlustValue;
                        this.symptomeCheckboxListe[7].number_value = res.values[0]?.neurologischeStoerungValue;
                        this.symptomeCheckboxListe[8].number_value = res.values[0]?.muskelschmerzenValue;
                        this.symptomeCheckboxListe[9].number_value = res.values[0]?.hautausschlagValue;
                        this.symptomeCheckboxListe[10].number_value = res.values[0]?.missempfindungenValue;
                        this.symptomeCheckboxListe[11].number_value = res.values[0]?.schwindelValue;
                        this.symptomeCheckboxListe[12].number_value = res.values[0]?.gedaechtniseinschraenkungenValue;
                        this.symptomeCheckboxListe[13].number_value = res.values[0]?.leseeinschraenkungenValue;

                        //patch values from database to form
                        this.form.patchValue({
                            hustenValue: res.values[0]?.hustenValue,
                            fieberValue: res.values[0]?.fieberValue,
                            fatigueValue: res.values[0]?.fatigueValue,
                            kurzatmigkeitValue: res.values[0]?.kurzatmigkeitValue,
                            brustschmerzenValue: res.values[0]?.brustschmerzenValue,
                            kopfschmerzenValue: res.values[0]?.kopfschmerzenValue,
                            geschmacksverlustValue: res.values[0]?.geschmacksverlustValue,
                            neurologischeStoerungValue: res.values[0]?.neurologischeStoerungValue,
                            muskelschmerzenValue: res.values[0]?.muskelschmerzenValue,
                            hautausschlagValue: res.values[0]?.hautausschlagValue,
                            missempfindungenValue: res.values[0]?.missempfindungenValue,
                            schwindelValue: res.values[0]?.schwindelValue,
                            gedaechtniseinschraenkungenValue: res.values[0]?.gedaechtniseinschraenkungenValue,
                            leseeinschraenkungenValue: res.values[0]?.leseeinschraenkungenValue
                        });

                        //split string data from database into array
                        this.symptomeCheckboxListeArray = res.values[0]?.symptomNamesCheckboxes.split(",");
                        //loop through array
                        this.symptomeCheckboxListeArray.forEach((item: string) => {
                            //if array item can be identified as possible activity then go on
                            if (this.symptomeCheckboxListe.find(x => x.symptom === item)) {
                                //find Index of activitiy
                                const symptomeCheckboxListeIndex = this.symptomeCheckboxListe.findIndex(x => x.symptom === item);
                                //check checkbox of activitiy
                                this.symptomeCheckboxListe[symptomeCheckboxListeIndex].checked = true;
                            }
                        });
                    }

                }
                return this.symptomeNameListe;
            })
            .catch(error => {
                console.log(error);
                this.toastService.showErrorToast(this.translateService.instant("symptome-erfassen-page.error"));
            });

    }

    updateSymptome(): any {
        this.databaseCrudService.updateSymptomeNames(
            this.tagId,
            this.form.value.symptomeListe,
            this.form.value.symptomeCheckboxListe,
            this.form.value.hustenValue,
            this.form.value.fieberValue,
            this.form.value.fatigueValue,
            this.form.value.kurzatmigkeitValue,
            this.form.value.brustschmerzenValue,
            this.form.value.kopfschmerzenValue,
            this.form.value.geschmacksverlustValue,
            this.form.value.neurologischeStoerungValue,
            this.form.value.muskelschmerzenValue,
            this.form.value.hautausschlagValue,
            this.form.value.missempfindungenValue,
            this.form.value.schwindelValue,
            this.form.value.gedaechtniseinschraenkungenValue,
            this.form.value.leseeinschraenkungenValue,
        )
            .then(res => {
                if (res.values) {
                    this.symptomeNameListe = res.values[0]?.symptomNames;
                    this.symptomeCheckboxListeArray = res.values[0]?.symptomNamesCheckboxes;
                    this.form.patchValue({
                        symptomeListe: this.symptomeNameListe,
                        hustenValue: res.values[0]?.hustenValue,
                        fieberValue: res.values[0]?.fieberValue,
                        fatigueValue: res.values[0]?.fatigueValue,
                        kurzatmigkeitValue: res.values[0]?.kurzatmigkeitValue,
                        brustschmerzenValue: res.values[0]?.brustschmerzenValue,
                        kopfschmerzenValue: res.values[0]?.kopfschmerzenValue,
                        geschmacksverlustValue: res.values[0]?.geschmacksverlustValue,
                        neurologischeStoerungValue: res.values[0]?.neurologischeStoerungValue,
                        muskelschmerzenValue: res.values[0]?.muskelschmerzenValue,
                        hautausschlagValue: res.values[0]?.hautausschlagValue,
                        missempfindungenValue: res.values[0]?.missempfindungenValue,
                        schwindelValue: res.values[0]?.schwindelValue,
                        gedaechtniseinschraenkungenValue: res.values[0]?.gedaechtniseinschraenkungenValue,
                        leseeinschraenkungenValue: res.values[0]?.leseeinschraenkungenValue
                    });
                }
                this.toastService.showSuccessToast(this.translateService.instant("symptome-erfassen-page.success"));
                return this.symptomeNameListe;
            })
            .catch(error => {
                console.log(error);
                this.toastService.showErrorToast(this.translateService.instant("symptome-erfassen-page.error"));
            });
    }

    onSelectionChange(event: any, item: any) {
        const symptomeCheckboxListe: UntypedFormArray = this.form.get("symptomeCheckboxListe") as UntypedFormArray;
        this.symptomeCheckboxListe[item].checked = event.target.checked;
        this.updateCheckControl(symptomeCheckboxListe, event.target);
    }

    updateCheckControl(cal, object) {
        if (object.checked) {
            cal.push(new UntypedFormControl(object.value));
        } else {
            cal.controls.forEach((item: UntypedFormControl, index) => {
                if (item.value === object.value) {
                    cal.removeAt(index);
                    return;
                }
            });
        }
    }

    onValueChange(event: any, item: any) {
        this.symptomeCheckboxListe[item].number_value = event.detail.value;

        switch (item) {
            case 0:
                //Husten
                return this.form.patchValue({hustenValue: this.symptomeCheckboxListe[item].number_value});
                break;
            case 1:
                //Fieber
                return this.form.patchValue({fieberValue: this.symptomeCheckboxListe[item].number_value});
                break;
            case 2:
                //Fatique
                return this.form.patchValue({fatigueValue: this.symptomeCheckboxListe[item].number_value});
                break;
            case 3:
                //Kurzatmigkeit
                return this.form.patchValue({kurzatmigkeitValue: this.symptomeCheckboxListe[item].number_value});
                break;
            case 4:
                //Brustschmerzen
                return this.form.patchValue({brustschmerzenValue: this.symptomeCheckboxListe[item].number_value});
                break;
            case 5:
                //Kopfschmerzen
                return this.form.patchValue({kopfschmerzenValue: this.symptomeCheckboxListe[item].number_value});
                break;
            case 6:
                //Geschmacksverlust
                return this.form.patchValue({geschmacksverlustValue: this.symptomeCheckboxListe[item].number_value});
                break;
            case 7:
                //Neurologische Stoerung
                return this.form.patchValue({neurologischeStoerungValue: this.symptomeCheckboxListe[item].number_value});
                break;
            case 8:
                //Muskelschmerzen
                return this.form.patchValue({muskelschmerzenValue: this.symptomeCheckboxListe[item].number_value});
                break;
            case 9:
                //Hautausschlag
                return this.form.patchValue({hautausschlagValue: this.symptomeCheckboxListe[item].number_value});
                break;
            case 10:
                //Missempfindungen
                return this.form.patchValue({missempfindungenValue: this.symptomeCheckboxListe[item].number_value});
                break;
            case 11:
                //Schwindel
                return this.form.patchValue({schwindelValue: this.symptomeCheckboxListe[item].number_value});
                break;
            case 12:
                //Gedächtniseinschränkungen
                return this.form.patchValue({gedaechtniseinschraenkungenValue: this.symptomeCheckboxListe[item].number_value});
                break;
            case 13:
                //Leseeinschränkung
                return this.form.patchValue({leseeinschraenkungenValue: this.symptomeCheckboxListe[item].number_value});
                break;
            default:
                throw Error("Invalider case");
        }

        console.log(this.form.value);
    }

    async onSubmit() {
        await this.updateSymptome();
        await this.loadSymptome();
        await this.router.navigateByUrl("/tabs/tagebuch-timeline");
    }

}

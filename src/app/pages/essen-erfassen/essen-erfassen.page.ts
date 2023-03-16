import {AfterViewInit, Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SQLiteService} from "../../services/sqlite.service";
import {DetailService} from "../../services/detail.service";
import {DatabaseCrudService} from "../../services/database-crud.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Essen} from "../../utils/interfaces";
import {ToastServiceService} from "../../services/toast-service.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: "app-essen-erfassen",
    templateUrl: "./essen-erfassen.page.html",
    styleUrls: ["./essen-erfassen.page.scss"],
})
export class EssenErfassenPage implements OnInit, AfterViewInit {

    public form: FormGroup;
    public essen: Array<Essen> = [];
    public vormittagEssen = "";
    public mittagEssen = "";
    public abendEssen = "";
    public medikamenteValue = "";
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
    }

    ngOnInit() {
        this.form = this.fb.group({
            vormittag: [""],
            mittag: [""],
            abend: [""],
            medikamente: [""]
        });
    }

    async ngAfterViewInit() {
        await this.loadEssen();
    }

    loadEssen(): any {
        this.databaseCrudService.getEssenListbyTagId(this.tagId)
            .then(res => {
                if (res.values[0].vormittag) {
                    this.vormittagEssen = res.values[0]?.vormittag;
                    console.log(this.vormittagEssen);
                    this.form.patchValue({
                        vormittag: this.vormittagEssen,
                    });
                }

                if (res.values[0].mittag) {
                    this.mittagEssen = res.values[0]?.mittag;
                    console.log(this.mittagEssen);
                    this.form.patchValue({
                        mittag: this.mittagEssen,
                    });
                }

                if (res.values[0].abend) {
                    this.abendEssen = res.values[0]?.abend;
                    console.log(this.abendEssen);
                    this.form.patchValue({
                        abend: this.abendEssen,
                    });
                }

                if (res.values[0].medikamenteValue) {
                    this.medikamenteValue = res.values[0]?.medikamenteValue;
                    console.log(this.medikamenteValue);
                    this.form.patchValue({
                        medikamente: this.medikamenteValue,
                    });
                }

                return this.vormittagEssen && this.mittagEssen && this.abendEssen && this.medikamenteValue;
            })
            .catch(error => {
                console.log(error);
                this.toastService.showErrorToast(this.translateService.instant("essen-erfassen-page.error"));
            });
    }

    updateEssen(): any {
        console.log(this.form.value.vormittag);
        console.log(this.form.value.mittag);
        console.log(this.form.value.abend);
        console.log(this.form.value.medikamente);
            this.databaseCrudService.updateEssenNames(this.tagId, this.form.value.vormittag,
                 this.form.value.mittag, this.form.value.abend, this.form.value.medikamente)
                .then(res => {
                    if (res.values) {
                        this.vormittagEssen = res.values[0]?.vormittag;
                        this.mittagEssen = res.values[0]?.mittag;
                        this.abendEssen = res.values[0]?.abend;
                        this.medikamenteValue = res.values[0]?.medikamenteValue;
                        this.form.patchValue({
                            vormittag: this.vormittagEssen,
                            mittag: this.mittagEssen,
                            abend: this.abendEssen,
                            medikamente: this.medikamenteValue
                        });
                    }
                    this.toastService.showSuccessToast(this.translateService.instant("essen-erfassen-page.success"));
                })
                .catch(error => {
                    console.log(error);
                    this.toastService.showErrorToast(this.translateService.instant("essen-erfassen-page.error"));
                });
    }

    async onSubmit() {
            await this.updateEssen();
            await this.loadEssen();
            await this.router.navigateByUrl("/tabs/tagebuch-timeline");
    }

}

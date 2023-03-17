import {AfterViewInit, Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Backup, Language} from "../../utils/interfaces";
import {TranslateService} from "@ngx-translate/core";
import {SQLiteService} from "../../services/sqlite.service";
import {DetailService} from "../../services/detail.service";
import {DatabaseCrudService} from "../../services/database-crud.service";
import {Directory, Encoding, Filesystem} from "@capacitor/filesystem";
import * as moment from "moment-timezone";
import {ToastServiceService} from "../../services/toast-service.service";
import {AlertController} from "@ionic/angular";
@Component({
    selector: "app-einstellungen",
    templateUrl: "./einstellungen.page.html",
    styleUrls: ["./einstellungen.page.scss"],
})
export class EinstellungenPage implements OnInit, AfterViewInit {

    public languageForm: FormGroup;
    public languages: Language[] = [
        {
            id: 1,
            name: "Deutsch",
            short: "de"
        },
        {
            id: 2,
            name: "English",
            short: "en"
        },
        {
            id: 3,
            name: "Français",
            short: "fr"
        }
    ];

    public countryForm: FormGroup;
    public countries: string[] = [];
    public curentLanguage: string;
    public currentCountry: string;

    public wantedBackupsNumber: number = this.databaseCrudService.getWantedBackupsNumber();
    public defaultBackup: Backup = null;
    public backupForm: FormGroup;
    public backups: Backup[] = [];
    public selectedBackup;
    public jsonResponse;
    constructor(
        private fb: FormBuilder,
        public translateService: TranslateService,
        private sqliteService: SQLiteService,
        private detailService: DetailService,
        private toastService: ToastServiceService,
        private databaseCrudService: DatabaseCrudService,
        private alertController: AlertController,
    ) {
    }

    ngOnInit(): void {
        this.curentLanguage = localStorage.getItem("currentLanguage") || "de";
        this.currentCountry = localStorage.getItem("currentCountry") || "DE";
        this.countries = ["DE","CH"];
        this.countryForm = this.fb.group({
          country: [this.currentCountry,
              Validators.compose([
                  Validators.required,
              ])
          ]
        });

        this.languageForm = this.fb.group({
            language: [this.curentLanguage,
                Validators.compose([
                    Validators.required,
                ])
            ]
        });

        this.backupForm = this.fb.group({
            backup: [this.defaultBackup,
                Validators.compose([
                    Validators.required,
                ])
            ]
        });
    }

    ngAfterViewInit() {
        this.checkIfBackupsFolderExistsAndPushBackupsToObject();
    }

    assignCountry(){
      this.currentCountry = localStorage.getItem("currentCountry") || "DE";
      this.countryForm.reset();
      this.countryForm.setValue({
        country: this.currentCountry
      });
    }

  onValueChange(event: any) {
    this.wantedBackupsNumber = event.detail.value;
    console.log("wantedBackups:" + event.detail.value);
    this.databaseCrudService.setWantedBackupsNumber(this.wantedBackupsNumber);
  }

    onLanguageChange(languageValue: string) {
        this.curentLanguage = languageValue;
        localStorage.setItem("currentLanguage", languageValue);
        this.translateService.setDefaultLang(languageValue);
        this.translateService.use(languageValue);
        this.assignCountry();
    }

    onCountryChange(countryValue: string) {
      localStorage.setItem("currentCountry", countryValue);
    }

    onBackupChange(backupValue: any) {
        console.log(backupValue);
        this.selectedBackup = backupValue;
    }

    onBackupClick() {
        this.databaseCrudService.getDatabaseExport("full").then(
            response => {
            console.log(response);
            this.jsonResponse = response.export;
            console.log(this.jsonResponse);
            this.checkIfBackupDirectoryExists().then(
                res => {
                    this.createBackupExport("Backup_" + moment().format("DD_MM_YYYY_HH_mm_ss") + ".ts", JSON.stringify(this.jsonResponse));

                }
            );
        });
    }

    async createBackupExport(name: string, exportData: any) {
        await Filesystem.writeFile({
            directory: Directory.External,
            path: "backups/" + name,
            data: exportData,
            encoding: Encoding.UTF16,
        }).then(response => {
            console.log(response);
 /*           Share.share({
                title: "PatientStrength",
                text: this.translateService.instant("analyse.erfassung-hinweis"),
                url: response.uri,
                dialogTitle: "Backup versenden",
            }).catch(error => {
                console.log("Share failed:", error);
            });*/
            this.checkIfBackupsFolderExistsAndPushBackupsToObject();
        }, err => {
            console.log("Error: ", err);
            this.toastService.showErrorToast(this.translateService.instant("einstellungen.backup-creation-fail"));
        });
    }

    async createBackupDirectory() {
        await Filesystem.mkdir({
            directory: Directory.External,
            path: "backups",
        }).then(response => {
            console.log(response);
        });
    }

    async checkIfBackupDirectoryExists() {
        await Filesystem.readdir({
            directory: Directory.External,
            path: "backups",
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log("Error:", error);
            this.createBackupDirectory().then(res => {
                this.checkIfBackupDirectoryExists();
            });
        });
    }

   async checkIfBackupDirectoryExistsAndReturnBoolean(): Promise<boolean> {
      try {
        const directoryExists: any = await Filesystem.readdir({directory: Directory.External, path: "backups"});
        console.log(directoryExists);
        if (directoryExists) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    }

    async checkIfBackupsAvailableAndPushToObject() {
      await Filesystem.readdir({
        directory: Directory.External,
        path: "backups",
      }).then(response => {
        console.log(response);
        console.log(response.files);

        response.files.forEach((item: any) => {
          console.log("item");
          console.log(item);
          const itemWithoutEnding = item.replace(".ts", "");
          console.log(itemWithoutEnding);
          console.log(this.backups.find(x => x.name === (itemWithoutEnding)));

          if ( this.backups.find(x => x.name === (itemWithoutEnding)) ) {
            console.log("nicht hinzugefügt");
          } else {
            console.log("hinzugefügt");

            this.backups.push(
              {
                name: itemWithoutEnding
              });
          }
        });
        console.log(this.backups);
      }).catch(error => {
          console.log("Error: ", error);
          this.toastService.showErrorToast(this.translateService.instant("einstellungen.backup-creation-fail"));
      });
    }

    async checkIfBackupsFolderExistsAndPushBackupsToObject() {
      const backupFolderExists = await this.checkIfBackupDirectoryExistsAndReturnBoolean();

      if (backupFolderExists === true) {
        await this.checkIfBackupsAvailableAndPushToObject();
      } else {
        await this.createBackupDirectory();
        await this.checkIfBackupsAvailableAndPushToObject();
      }
    }

    async deleteBackupsAlert() {
        const alert = await this.alertController.create({
            header: this.translateService.instant("einstellungen.backup-delete-all"),
            message: this.translateService.instant("einstellungen.delete-alert-message"),
            buttons: [
                {
                    text: this.translateService.instant("einstellungen.back"),
                    role: "cancel",
                    cssClass: "ion-alert-grey",
                    handler: () => {
                    }
                }, {
                    text: this.translateService.instant("einstellungen.delete-alert-do-delete"),
                    cssClass: "ion-alert-red",
                    handler: () => {
                        this.deleteBackups();
                    }
                }
            ]
        });
        await alert.present();
    }

    async deleteBackups() {
        await Filesystem.readdir({
            directory: Directory.External,
            path: "backups",
        }).then(response => {
            console.log(response);
            console.log(response.files);

            response.files.forEach((item: any, index: number) => {
                console.log("item");
                console.log(item);
                Filesystem.deleteFile({
                    directory: Directory.External,
                    path: "backups/" + item,
                });
                this.backups = [];
                console.log(this.backups);
                this.toastService.showSuccessToast(this.translateService.instant("einstellungen.backup-delete-all-success"));
            }, error => {
                console.log("Error: ", error);
                this.toastService.showSuccessToast(this.translateService.instant("einstellungen.backup-delete-all-fail"));
            });
        });
    }

  async deleteOldBackupsIfMoreThanWanted() {
    await Filesystem.readdir({
      directory: Directory.External,
      path: "backups",
    }).then(response => {
      console.log(response);
      console.log(response.files);

      if (response.files.length >= this.databaseCrudService.wantedBackupsNumber-1) {
        const backupArray = response.files.sort().reverse();
        backupArray.forEach((item: any, index: number) => {
          console.log(item + " " + index);
          if (index >= this.databaseCrudService.wantedBackupsNumber-1) {
            Filesystem.deleteFile({
              directory: Directory.External,
              path: "backups/" + item,
            });
          }
        }, error => {
          console.log("Error: ", error);
        });
      }
    });

  }


  async importBackupAlert() {
        const alert = await this.alertController.create({
            header: this.translateService.instant("einstellungen.import-alert-title"),
            message: this.translateService.instant("einstellungen.import-alert-message"),
            buttons: [
                {
                    text: this.translateService.instant("einstellungen.back"),
                    role: "cancel",
                    cssClass: "ion-alert-grey",
                    handler: () => {
                    }
                }, {
                    text: this.translateService.instant("einstellungen.import-alert-do-import"),
                    cssClass: "ion-alert-red",
                    handler: () => {
                        this.importBackup();
                    }
                }
            ]
        });
        await alert.present();
    }

    async importBackup() {
        console.log(this.selectedBackup);
        await Filesystem.readFile({
            directory: Directory.External,
            path: "backups/" + this.selectedBackup + ".ts",
            encoding: Encoding.UTF16,
        }).then(response => {
            const databaseData = JSON.parse(response.data);
            console.log(databaseData);

            this.databaseCrudService.createDatabaseFromBackup(databaseData).then(res => {
                console.log(res);
                this.toastService.showSuccessToast(this.translateService.instant("einstellungen.backup-import-success"));
            }).catch(error => {
                console.log(error);
                this.toastService.showErrorToast(this.translateService.instant("einstellungen.backup-import-fail"));
            });

        }, err => {
            console.log("Error: ", err);
        });
    }

  //----- DELETE DATABASE AND RESTART ----- //

  public async presentDeleteAlert() {
    const alert = await this.alertController.create({
      header: this.translateService.instant("tagebuch-timeline.delete-alert-title"),
      message: this.translateService.instant("tagebuch-timeline.delete-alert-message"),
      buttons: [
        {
          text: this.translateService.instant("tagebuch-timeline.back"),
          role: "cancel",
          cssClass: "ion-alert-grey",
          handler: () => {
          }
        }, {
          text: this.translateService.instant("tagebuch-timeline.delete-alert-do-delete"),
          cssClass: "ion-alert-red",
          handler: () => {
            this.deleteDatabase();
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteDatabase() {
    await this.databaseCrudService.deleteDatabaseByName();
    await this.databaseCrudService.createDatabaseFromJSON();
  }

}

import {AfterViewInit, Component, OnDestroy, OnInit} from "@angular/core";
import {SQLiteService} from "../../services/sqlite.service";
import {DetailService} from "../../services/detail.service";
import {DatabaseCrudService} from "../../services/database-crud.service";
import {Dialog} from "@capacitor/dialog";
import {Aktivitaet, Essen, Symptom, Tag, Tagesform, TimelineData} from "../../utils/interfaces";
import {ToastServiceService} from "../../services/toast-service.service";
import {TranslateService} from "@ngx-translate/core";
import * as moment from "moment-timezone";
import {Share} from "@capacitor/share";
import {Directory, Encoding, Filesystem} from "@capacitor/filesystem";
import {Papa} from "ngx-papaparse";
import {AlertController} from "@ionic/angular";
import {DateOnlyPipe} from "../../utils/util-filters/date-only.pipe";
import {DeviceDetectorService} from "ngx-device-detector";
import {TagesformPipe} from "../../utils/util-filters/tagesform-pipe.pipe";
import {ErschoepfungsartPipe} from "../../utils/util-filters/erschoepfungsart-pipe.pipe";
import {SymptomePipe} from "../../utils/util-filters/symptome.pipe";
import {CommaBlankSeparatorPipe} from "../../utils/util-filters/comma-blank-separator.pipe";
import packageJson from "../../../../package.json";
import {delay} from "rxjs/operators";
import { App } from "@capacitor/app";
import { PluginListenerHandle } from "@capacitor/core";
import { BackgroundTask } from "@robingenz/capacitor-background-task";
import { NavigationEnd, Router } from "@angular/router";
@Component({
    selector: "app-tagebuch-timeline",
    templateUrl: "./tagebuch-timeline.page.html",
    styleUrls: ["./tagebuch-timeline.page.scss"],
})
export class TagebuchTimelinePage implements AfterViewInit, OnInit, OnDestroy  {
    private isAllLoaded = false;
    public tage: Array<Tag> = [];
    public symptome: Array<Symptom> = [];
    public essen: Array<Essen> = [];
    public tagesform: Array<Tagesform> = [];
    public aktivitaeten: Array<Aktivitaet> = [];
    public timelineTable: TimelineData;
    public export = null;
    public timelineTableInnerJoin: any;
    private csv: any;
    private txt = "";
    private detailsPagingNumber = 0;
    private tagePagingNumber = 0;
    public deviceInfo = null;
    public version: string = packageJson.version;
    private appStateChangeListener: PluginListenerHandle | undefined;
    private routerSubscription: any;
    public jsonResponse;
    public wantedBackupsNumber: number = this.databaseCrudService.getWantedBackupsNumber();


    constructor(
                private router: Router,
                //load database services
                private sqliteService: SQLiteService,
                private detailService: DetailService,
                private databaseCrudService: DatabaseCrudService,
                //load feedback services
                private toastService: ToastServiceService,
                private alertController: AlertController,
                //load export csv service
                private papa: Papa,
                //load translate service
                private translateService: TranslateService,
                //load device detection service
                private deviceService: DeviceDetectorService,
                //load pipes
                private dateOnlyPipe: DateOnlyPipe,
                private tagesformPipe: TagesformPipe,
                private erschoepfungsartPipe: ErschoepfungsartPipe,
                private symptomePipe: SymptomePipe,
                private commaBlankSeparatorPipe: CommaBlankSeparatorPipe
    ) {
        this.clearTimelineTable();
        this.deviceInfo = this.deviceService.getDeviceInfo();
    }


  //----- ngOnInit - OLNY USED FOR AUTOMATIC BACKUP CREATION WHEN BEFORE CLOSING THE APP ----- //

    public ngOnInit() {
      this.routerSubscription = this.router.events.subscribe((event) => {if (event instanceof NavigationEnd) {
        if (event.url.includes("tagebuch-timeline")) {
          this.clearTimelineTable();
          this.updateTimelineData();
        }
      }});

      App.addListener("appStateChange", async ({ isActive }) => {
        if (isActive) {
          return;
        }
        // The app state has been changed to inactive.
        // Start the background task by calling `beforeExit`.
        const taskId = await BackgroundTask.beforeExit(async () => {
          // Run your code...
          await this.checkIfBackupsFolderExistsAndCreateBackup();
          await this.deleteOldBackupsIfMoreThanWanted();
          // Finish the background task as soon as everything is done.
          BackgroundTask.finish({ taskId });
        });
      });
    }

    public ngOnDestroy() {
      this.clearTimelineTable();
      this.routerSubscription?.unsubscribe();
      this.appStateChangeListener?.remove();
    }

    async checkIfBackupsFolderExistsAndCreateBackup() {
      const backupFolderExists = await this.checkIfBackupDirectoryExistsAndReturnBoolean();

      if (backupFolderExists === true) {
        this.onBackupClick();
      } else {
        await this.createBackupDirectory();
        this.onBackupClick();
      }
    }

    async checkIfBackupDirectoryExistsAndReturnBoolean(): Promise<boolean> {
      try {
        const directoryExists: any = await Filesystem.readdir({directory: Directory.External, path: "backups"});
        console.log(directoryExists);
        return !!directoryExists;
      } catch (error) {
        return false;
      }
    }

    async createBackupDirectory() {
      await Filesystem.mkdir({
        directory: Directory.External,
        path: "backups",
      }).then(response => {
        console.log(response);
      });
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

    async createBackupExport(name: string, exportData: any) {
      await Filesystem.writeFile({
        directory: Directory.External,
        path: "backups/" + name,
        data: exportData,
        encoding: Encoding.UTF16,
      }).then(response => {
        console.log(response);
      }, err => {
        console.log("Error: ", err);
        this.toastService.showErrorToast(this.translateService.instant("einstellungen.backup-creation-fail"));
      });
    }

  async deleteOldBackupsIfMoreThanWanted() {
    this.wantedBackupsNumber = this.databaseCrudService.getWantedBackupsNumber();
    console.log(this.wantedBackupsNumber);
    await Filesystem.readdir({
      directory: Directory.External,
      path: "backups",
    }).then(response => {
      console.log(response);
      console.log(response.files);

      if (response.files.length >= this.wantedBackupsNumber-1) {
        const backupArray = response.files.sort().reverse();
        backupArray.forEach((item: any, index: number) => {
          console.log(item + " " + index);
          if (index >= this.wantedBackupsNumber-1) {
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

    //----- START --> AfterViewInit ----- //

    async ngAfterViewInit() {
        const showAlert = async (message: string) => {
            await Dialog.alert({
                title: this.translateService.instant("message-title"),
                message
            });
        };
        //setup database
        try {

          console.log(">>>> im Tagebuch-Timeline  this.startupProcess");
          await this.startupProcess();

        } catch (err) {
            console.log(`$$$ runTest failed ${err.message}`);
            await showAlert(err.message);
            /*
            * App neu starten. Datenbank neu init
            * */
            throw new Error(err.message);
        }
        this.clearTimelineTable();
        this.updateTimelineData();
    }

    async ionViewWillLeave() {
      await this.clearTimelineTable();
    }

    //----- FUNCTIONS FOR AfterViewInit ----- //

    private async startupProcess() {
      console.log(">>>> im Tagebuch-Timeline ");

      const dbExists = await this.databaseCrudService.openDatabaseConnectionAndReturnDatabaseBoolean();
      console.log("setupDone");

      if (dbExists === false) {
        console.log("createDatabase");
        await this.databaseCrudService.createDatabaseFromJSON();
        // await this.loadTimelineData();

      } else if (dbExists === true) {
        console.log("openDatabase");
        await this.databaseCrudService.openDatabase();
        await this.checkDatabaseSchemaAndUpgrade();
        // await this.loadTimelineData();

      } else {
        await delay(5000);
        await this.presentStartupProcessRetryAlert();
      }

    }

  //----- RETRY ALERT IF SETUP DATABASE PROCESS FAILS ----- //

  public async presentStartupProcessRetryAlert() {
    const alert = await this.alertController.create({
      header: "Datenbank Erstellung fehlgeschlagen",
      message: "Willst du es nochmal probieren?",
      buttons: [
        {
          text: "Nochmal versuchen",
          cssClass: "ion-alert-primary",
          handler: () => {
            this.startupProcess();
          }
        }
      ]
    });
    await alert.present();
  }

    //----- ionViewWillEnter after AfterViewInit ----- //

    async ionViewWillEnter() {
        // await this.clearTimelineTable();
        // await this.updateTimelineData();
        // await this.createNeuerTag();
    }

  //----- ionViewWillEnter after AfterViewInit ----- //

  //----- FUNCTIONS FOR ionViewWillEnter ----- //
    //FIXME: is this necessary? why the format of the date is not correct?
    // createNeuerTag(): any {
    //     const currentDate = moment().tz("Europe/Berlin", true).format(); // DD-MM-YYYY
    //     console.log(currentDate);
    //     this.databaseCrudService.postNeuerTag(currentDate)
    //         .then(response => {
    //             console.log(response);
    //         }
    //         ).catch(error => {
    //             if (error) {
    //                 throw new Error(error.message);
    //             }
    //         });
    // }

    async doInfinite(event) {
      if(!this.isAllLoaded){
        this.detailsPagingNumber++;
        await this.updateTimelineData();
      }
      event.target.complete();
    }

    async updateTimelineData() {
        // await this.clearTimelineTable();
        await this.loadTimelineData();
    }

    async clearTimelineTable() {
      this.isAllLoaded = false;
      this.tagePagingNumber = 0;
      this.detailsPagingNumber = 0;
      this.tage = [];
      this.timelineTable = {
          tage: [],
          symptome: [],
          essen: [],
          tagesform: [],
          aktivitaeten: []
      };
    }

    async loadTimelineData() {
      const p1 = performance.now();
      if(this.detailsPagingNumber%4 === 0) {
        await this.loadTagesWithPaging();
      }
      await this.loadFiveDays();
      // await this.loadSymptome();
      // await this.loadEssen();
      // await this.loadTagesform();
      // await this.loadAktivitaet();
      const p2 = performance.now();
      console.log("loadTimelineData took " + (p2 - p1) + " milliseconds.");
      console.log(this.timelineTable);
    }

    //----- FUNCTIONS FOR loadTimelineData ----- //

    async loadDetails(DaysIds: number[]) {
      const p1 = performance.now();
        await this.databaseCrudService.essenRepository.findAllInRange(DaysIds).then(res => {
          if (res.values) {
            this.timelineTable.essen = this.timelineTable.essen.concat(res);
          }
          })
          .catch(error => {
              if (error) {
                  console.log(error);
              }
          });
        const p2 = performance.now();
        console.log(`Time to load Essen: ${p2 - p1}`);
        await this.databaseCrudService.aktivitaetRepository.findAllInRange(DaysIds).then(res => {
          if (res.values) {
            this.timelineTable.aktivitaeten = this.timelineTable.aktivitaeten.concat(res);
          }
          })
          .catch(error => {
              if (error) {
                  console.log(error);
              }
          });
        const p3 = performance.now();
        console.log(`Time to load Aktivitaet: ${p3 - p2}`);
        await this.databaseCrudService.symptomRepository.findAllInRange(DaysIds).then(res => {
          if (res.values) {
            this.timelineTable.symptome = this.timelineTable.symptome.concat(res);
          }
          })
          .catch(error => {
              if (error) {
                  console.log(error);
              }
          });
        const p4 = performance.now();
        console.log(`Time to load Symptome: ${p4 - p3}`);
        await this.databaseCrudService.tagesformRepository.findAllInRange(DaysIds).then(res => {
          if (res.values) {
            this.timelineTable.tagesform = this.timelineTable.tagesform.concat(res);
          }
          })
          .catch(error => {
              if (error) {
                  console.log(error);
              }
          });
        const p5 = performance.now();
        console.log(`Time to load Tagesform: ${p5 - p4}`);
        const p6 = performance.now();
        console.log("loadFiveDays: " + (p6 - p1) + " ms");
    }

    async loadFiveDays(): Promise<any> {
      if(this.tage.length > 0 && this.detailsPagingNumber*5+5 <= this.tage.length) {
        const fiveDays = this.tage.slice(this.detailsPagingNumber*5, this.detailsPagingNumber*5 + 5);
        const fiveDaysIds =fiveDays.map(day => day.id);
        this.timelineTable.tage = this.timelineTable.tage.concat(fiveDays);
        await this.loadDetails(fiveDaysIds);
        }
        else if(this.tage.length > 0 && this.detailsPagingNumber*5+5 > this.tage.length) {
          const restDays = this.tage.slice(this.detailsPagingNumber*5, this.tage.length);
          const restDaysIds =restDays.map(day => day.id);
          this.timelineTable.tage = this.timelineTable.tage.concat(restDays);
          await this.loadDetails(restDaysIds);
          this.isAllLoaded = true;
        }
        else{
          console.log("error with database or timelineTable is empty");
          return 0;
        }

    }

    async loadTagesWithPaging(): Promise<any> {
      const p1 = performance.now();
      await this.databaseCrudService.getTagesInRnage(this.tagePagingNumber*20, 20).then(res => {
        if (res.values) {
            // it filters day to prevent displaying day without date, now You cant add such day, but its fox for past versions
            this.tage =  this.tage.concat(res.values.filter(x => !x.date.startsWith("T")));
            const p2 = performance.now();
            console.log(`Time to load Tage: ${p2 - p1}`);
            this.tagePagingNumber++;
        }
    })
    .catch(error => {
        if (error) {
            console.log(error);
        }
    });

    }

    async loadTage(): Promise<any> {
        await this.databaseCrudService.getTageList()
            .then(res => {
                if (res.values) {
                    this.timelineTable.tage = res.values;
                }
            })
            .catch(error => {
                if (error) {
                    console.log(error);
                    // this.toastService.showErrorToast("Fehler: Tage laden fehlgeschlagen!");
                }
            });
    }

    async loadSymptome(): Promise<any> {
      await this.databaseCrudService.getSymptomeList()
          .then(res => {
              if (res.values) {
                  this.timelineTable.symptome = res.values;
              }
          })
          .catch(error => {
              if (error) {
                  console.log(error);
                  // this.toastService.showErrorToast("Fehler: Symptome laden fehlgeschlagen!");
              }
          });
    }

    async loadEssen(): Promise<any> {
      await this.databaseCrudService.getEssenList()
            .then(res => {
                if (res) {
                    this.timelineTable.essen = res;
                }
            })
            .catch(error => {
                if (error) {
                    console.log(error);
                    // this.toastService.showErrorToast("Fehler: Essen laden fehlgeschlagen!");
                }
            });
    }

    async loadTagesform(): Promise<any> {
      await this.databaseCrudService.getTagesformList()
            .then(res => {
                if (res.values) {
                    this.timelineTable.tagesform = res.values;
                }
            })
            .catch(error => {
                if (error) {
                    console.log(error);
                    // this.toastService.showErrorToast("Fehler: Essen laden fehlgeschlagen!");
                }
            });
    }

    async loadAktivitaet(): Promise<any> {
      await this.databaseCrudService.getAktivitaetList()
            .then(res => {
                if (res.values) {
                    this.timelineTable.aktivitaeten = res.values;
                }
            })
            .catch(error => {
                if (error) {
                    console.log(error);
                    // this.toastService.showErrorToast("Fehler: Essen laden fehlgeschlagen!");
                }
            });
    }

    //----- DELETE DATABASE AND RESTART ----- //

    async deleteDatabase() {
        await this.databaseCrudService.deleteDatabaseByName();
        await this.databaseCrudService.createDatabaseFromJSON();
        await this.clearTimelineTable();
        const currentDate = new Date().toISOString().split("T")[0]; // with format: YYYY-MM-DD
        await this.createNeuerTagNachWunsch(currentDate);
        // await this.updateTimelineData();
    }

    public async startTimeline() {
        await this.deleteDatabase();
        await this.toastService.showSuccessToast(this.translateService.instant("tagebuch-timeline.app-gestartet"));
    }


  //----- ALERT BEFORE STARTING TIMLINE - BECAUSE OLD DATABASE WILL BE DELETED ----- //

    public async presentAlertBeforeStartingTimeline() {
      const alert = await this.alertController.create({
        header: "Timeline starten",
        message: "Willst du die Timeline starten? Eventuelle alte Einträge werden gelöscht.",
        buttons: [
          {
            text: this.translateService.instant("tagebuch-timeline.back"),
            role: "cancel",
            cssClass: "ion-alert-grey",
            handler: () => {
            }
          },
          {
            text: "Timeline starten",
            cssClass: "ion-alert-primary",
            handler: () => {
              this.startTimeline();
            }
          }
        ]
      });
      await alert.present();
    }

    //----- CHECK DATABASE SCHEMA ----- //

    public async checkDatabaseSchemaAndUpgrade() {
      const result = await this.databaseCrudService.compareCurrentDatabaseExportedJSONWithSchemaJSON();
      if (result === false) {
        console.log(">>>> creating Backup before Upgrading Database Schema");
        await this.checkIfBackupsFolderExistsAndCreateBackup();
        console.log(">>>> starting upgradeDatabaseSchema");
        await this.databaseCrudService.upgradeDatabaseSchema();
      }
    }


    //----- CREATE NEW DAY ----- //

    public async presentCreateDayAlert() {
        const alert = await this.alertController.create({
            header: this.translateService.instant("tagebuch-timeline.tag-erstellen-title"),
            message: this.translateService.instant("tagebuch-timeline.tag-erstellen-message"),
            inputs: [
                {
                    type: "date",
                    name: "date",
                }
            ],
            buttons: [
                {
                    text: this.translateService.instant("tagebuch-timeline.back"),
                    role: "cancel",
                    cssClass: "ion-alert-grey",
                    handler: () => {
                    }
                }, {
                    text: this.translateService.instant("tagebuch-timeline.tag-erstellen"),
                    cssClass: "ion-alert-primary",
                    handler: (response) => {
                        console.log(response.date);
                        if(response.date){
                          const constructedDate = response.date + "T00:00:00+01:00";
                          this.createNeuerTagNachWunsch(constructedDate);
                          const currentDate = moment().tz("Europe/Berlin", true).format(); // DD-MM-YYYY
                          console.log(currentDate);
                      }else{
                        this.toastService.showErrorToast(this.translateService.instant("tagebuch-timeline.error-adding-empty-day"));
                      }
                    }
                }
            ]
        });
        await alert.present();
    }

    async addingDayWithoutRefresh(res: any) {
      this.timelineTable.tage.push(res.values[0]);
      this.timelineTable.tage.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      const essen: Essen = {
        id: res.values[0].id,
        tageid: res.values[0].id,
        lastModified: null,
      };
      const tagesform: Tagesform = {
        id: res.values[0].id,
        tageid: res.values[0].id,
        lastModified: null,
      };
      const aktivitaeten: Aktivitaet = {
        id: res.values[0].id,
        tageid: res.values[0].id,
        lastModified: null,
      };
      const symptom: Symptom = {
        id: res.values[0].id,
        tageid: res.values[0].id,
        lastModified: null,
      };

      this.timelineTable.essen.push(essen);
      this.timelineTable.tagesform.push(tagesform);
      this.timelineTable.aktivitaeten.push(aktivitaeten);
      this.timelineTable.symptome.push(symptom);
      this.timelineTable.essen.sort((a, b) => new Date(b.tageid).getTime() - new Date(a.tageid).getTime());
      this.timelineTable.tagesform.sort((a, b) => new Date(b.tageid).getTime() - new Date(a.tageid).getTime());
      this.timelineTable.aktivitaeten.sort((a, b) => new Date(b.tageid).getTime() - new Date(a.tageid).getTime());
      this.timelineTable.symptome.sort((a, b) => new Date(b.tageid).getTime() - new Date(a.tageid).getTime());
    }

    async createNeuerTagNachWunsch(newDate: any) {

        const showAlert = async (message: string) => {
            await Dialog.alert({
                title: "Error Dialog",
                message,
            });
        };
        //setup database
        try {
            await this.databaseCrudService.postNeuerTagAnyDay(newDate)
                .then(res => {
                  // this.addingDayWithoutRefresh(res); //TODO: improve this
                  this.clearTimelineTable();
                  this.updateTimelineData();

                })
                .catch(error => {
                    if (error) {
                        this.toastService.showErrorToast(this.translateService.instant("tagebuch-timeline.tag-erstellen-fehler"));
                    }
                });
        } catch (err) {
            await showAlert(err.message);
        }

    }

    //----- DELETE SPECIFIC DAY ----- //

    public async presentDeleteDayAlert() {
        const alert = await this.alertController.create({
            header: this.translateService.instant("tagebuch-timeline.tag-loeschen-title"),
            message: this.translateService.instant("tagebuch-timeline.tag-loeschen-message"),
            inputs: [
                {
                    type: "date",
                    name: "date",
                }
            ],
            buttons: [
                {
                    text: this.translateService.instant("tagebuch-timeline.back"),
                    role: "cancel",
                    cssClass: "ion-alert-grey",
                    handler: () => {
                    }
                }, {
                    text: this.translateService.instant("tagebuch-timeline.tag-loeschen"),
                    cssClass: "ion-alert-primary",
                    handler: (response) => {
                        console.log(response.date);
                        this.deleteTagNachWunsch(response.date);
                    }
                }
            ]
        });
        await alert.present();
    }
    async deleteTagNachWunsch(date: any) {

        const showAlert = async (message: string) => {
            await Dialog.alert({
                title: "Error Dialog",
                message,
            });
        };
        //delete specific day
        try {
            await this.databaseCrudService.deleteTagAnyDay(date)
                .then(() => {
                  this.clearTimelineTable();
                  this.updateTimelineData();
                })
                .catch(error => {
                    if (error) {
                        this.toastService.showErrorToast(this.translateService.instant("tagebuch-timeline.tag-loeschen-fehler"));
                    }
                });
        } catch (err) {
            await showAlert(err.message);
        }

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

    //----- FUNCTIONS FOR EXPORT OF DATA ----- //

    async shareJSON() {
        await this.databaseCrudService.getTablesCombined()
            .then(res => {
                if (res.values) {
                    this.timelineTableInnerJoin = res.values;
                }
            })
            .catch(error => {
                if (error) {
                    console.log(error);
                    // this.toastService.showErrorToast("Fehler: Essen laden fehlgeschlagen!");
                }
            });

        await this.presentExportSwitch();
    }

    async presentExportSwitch() {
        //let user decide if they want csv or txt file as export
        const alert = await this.alertController.create({
            header: this.translateService.instant("tagebuch-timeline.daten-exportieren-header"),
            message: this.translateService.instant("tagebuch-timeline.daten-exportieren-message"),
            inputs: [
                {
                    name: this.translateService.instant("tagebuch-timeline.txt-datei"),
                    type: "radio",
                    label: this.translateService.instant("tagebuch-timeline.txt-datei"),
                    value: "txt",
                    checked: true
                },
                {
                    name: this.translateService.instant("tagebuch-timeline.csv-datei"),
                    type: "radio",
                    label: this.translateService.instant("tagebuch-timeline.csv-datei"),
                    value: "csv"
                }
            ],
            buttons: [
                {
                    text: this.translateService.instant("tagebuch-timeline.back"),
                    role: "cancel",
                    cssClass: "ion-alert-grey",
                    handler: () => {
                    }
                }, {
                    text: this.translateService.instant("tagebuch-timeline.exportieren"),
                    handler: (data: string) => {
                        if (data === "txt") {
                            this.createExportDataTXT(this.timelineTableInnerJoin);
                            this.createFileExportAndShare("LongCovid_Export.txt", this.txt,
                            this.translateService.instant("tagebuch-timeline.teile-txt"));
                        } else if (data === "csv") {
                            this.createExportDataCSV(this.timelineTableInnerJoin);
                            this.createFileExportAndShare("LongCovid_Export.csv", this.csv,
                            this.translateService.instant("tagebuch-timeline.teile-csv"));
                        } else {
                            this.toastService.showErrorToast(this.translateService.instant("tagebuch-timeline.export-fehler"));
                        }
                    }
                }
            ]
        });

        await alert.present();
    }

    async createExportDataCSV(data: any) {
        //create csv data for export
        const valuesArray = [];

        const dataCount = data.length;

        for (let i = 0; i < dataCount; i++) {
            valuesArray.push(Object.values(data[i]));
        }

        this.csv = this.papa.unparse({
            fields: Object.keys(data[data.length - 1]),
            data: valuesArray
        });
    }

    async createExportDataTXT(data: any) {
        //create txt data for export
        this.txt = "";
        if (data) {
            console.log(data);
            data.forEach(item => {
                const dayTxt = this.dateOnlyPipe.transform(item.date) + "\n" +
                    "Symptome_Checkboxen: " + this.commaBlankSeparatorPipe.transform(item.symptom_names_checkboxes) + "\n" +
                    "Symptome_Freitext: " + item.symptom_names + "\n" +
                    "Husten: " + item.husten_value + "\n" +
                    "Fieber: " + item.fieber_value + "° Celsius" +  "\n" +
                    "Fatigue: " + item.fatigue_value + "\n" +
                    "Brustschmerzen: " + item.brustschmerzen_value + "\n" +
                    "Kopfschmerzen: " + item.kopfschmerzen_value + "\n" +
                    "Geschmacksverlust: " + item.geschmacksverlust_value + "\n" +
                    "Neurologische Störung: " + item.neurologische_stoerung_value + "\n" +
                    "Muskelschmerzen: " + item.muskelschmerzen_value + "\n" +
                    "Hautausschlag: " + item.hautausschlag_value + "\n" +
                    "Frühstück: " + item.vormittag + "\n" +
                    "Mittag: " + item.mittag + "\n" +
                    "Abend: " + item.abend + "\n" +
                    "Medikamente: " + item.medikamente_value + "\n" +
                    "Tagesform: " + item.tagesform_value + "\n" +
                    "Erschöpfungsart: " + item.erschoepfungsart_value + "\n" +
                    "Schlaf: " + item.schlaf_value + "\n" +
                    "Stimmung: "  + item.stimmung_value + "\n" +
                    "Aktivitaeten_Checkboxen: " + this.commaBlankSeparatorPipe.transform(item.aktivitaeten_names_checkboxes) + "\n" +
                    "Aktivitaeten_Freitext: " + item.aktivitaeten_names + "\n" +
                    "Sport: " + item.sport_value + "\n" +
                    "Arbeit: " + item.arbeit_value + "\n" +
                    "Hausarbeit: " + item.hausarbeit_value + "\n" +
                    "Entspannung: " + item.entspannung_value + "\n\n";
                this.txt += dayTxt;
            });
        }
    }

    async createFileExportAndShare(name: string, exportData: any, message: any) {
        await Filesystem.writeFile({
            directory: Directory.External,
            path: name,
            data: exportData,
            encoding: Encoding.UTF16,
        }).then(res => {
            console.log(res);
            Share.share({
                title: "PatientStrength Timeline",
                text: this.translateService.instant("tagebuch-timeline.erfassung-hinweis"),
                url: res.uri,
                dialogTitle: message,
            }).catch(e => {
                console.log("Share failed:", e);
            });
        }, err => {
            console.log("Error: ", err);
        });
    }

    createDatabaseExport(mode: string) {
        this.databaseCrudService.createDatabaseExport(mode)
            .then(res => {
                if (res) {
                }
                return res;
            })
            .catch(error => {
                if (error) {
                    console.log(error);
                    this.toastService.showErrorToast(error.toString());
                }
            });
    }
}

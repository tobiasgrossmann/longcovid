import { Component, OnInit } from "@angular/core";
import { CalendarComponentOptions } from "ion2-calendar";
import * as htmlToImage from "html-to-image";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import { TranslateService } from "@ngx-translate/core";
import { DatabaseCrudService } from "../../services/database-crud.service";
import { ToastServiceService } from "../../services/toast-service.service";
import { DateOnlyPipe } from "../../utils/util-filters/date-only.pipe";
import { HealthDataService } from "src/app/services/health-data.service";

@Component({
  selector: "app-analyse",
  templateUrl: "./analyse.page.html",
  styleUrls: ["./analyse.page.scss"],
})
export class AnalysePage implements OnInit {

  public allDataArray: any;

  type: "dateObj";
  optionsMulti: CalendarComponentOptions = {
    pickMode: "single",
    color: "primary",
    monthFormat: "MMM YYYY",
    weekdays: ["S", "M", "D", "M", "D", "F", "S"],
    weekStart: 1,
  };

  public heartRateData = [];

  getColorForHeart(value: number) {
    if(value < 1){
      return 0;
    } else if (value < 40) {
      return 1;
    } else if (value < 73) {
      return 3;
    } else if (value < 82) {
      return 2;
    } else {
      return 1;
    }
  }

  dateToday = new Date();

  tagesformArray = [];

  constructor(
    private translateService: TranslateService,
    private databaseCrudService: DatabaseCrudService,
    private toastService: ToastServiceService,
    private dateOnlyPipe: DateOnlyPipe,
    private healthDataService: HealthDataService,
  ) {

  }

  async ngOnInit() {
    this.healthDataService.requestAuthorization();
    //load all data in the database
    await this.loadAllData();

  }

  async ionViewDidEnter() {
    //label all calendar with data from the database
    await this.labelAllCalendar();
  }

  async labelAllCalendar() {
    //label all calendar images with data from database
    await this.labelCalendar("#tagesformCalendar", "tagesform_value", this.allDataArray);
    await this.labelCalendar("#erschoepfungCalendar", "erschoepfungsart_value", this.allDataArray);
    await this.labelCalendar("#schlafCalendar", "schlaf_value", this.allDataArray);
    await this.labelCalendar("#stimmungCalendar", "stimmung_value", this.allDataArray);
    await this.labelCalendar("#sportCalendar", "sport_value", this.allDataArray);
    await this.labelCalendar("#arbeitCalendar", "arbeit_value", this.allDataArray);
    await this.labelCalendar("#hausarbeitCalendar", "hausarbeit_value", this.allDataArray);
    await this.labelCalendar("#entspannungCalendar", "entspannung_value", this.allDataArray);
    await this.labelCalendar("#heartCalendar", "heart_value", this.heartRateData);
  }

  async labelCalendar(container: string, valuesKey: any, labelArray: Array<any>) {
    const containerVariable = document.querySelector(container);

    // wait 1second for html dom to fully load in order to be able to access aria-label and add classes (not the preferred solution but works)
    setTimeout(() => {
      labelArray.forEach(item => {
        const itemSelector = containerVariable.querySelector("button[aria-label=\"" + this.dateOnlyPipe.dateInWords(item.date) + "\"]");
        if (itemSelector !== null) {
          if(valuesKey === "heart_value") {
            itemSelector.classList.add("health-bar-color-" + this.getColorForHeart(item.heart_value));
          } else {
            itemSelector.classList.add("ion-color-analyse-" + item[valuesKey]);
          }
        }
      });
    }, 1000);
  }

  async loadAllData(): Promise<any> {
    await this.databaseCrudService.getTablesCombined()
      .then(async res => {
        if (res.values) {
          this.allDataArray = res.values;
          res.values.forEach(async (x) =>{
            const dayString = x.date;
            let date;
                if(dayString.includes("T")){
                  date = new Date(dayString.split("T")[0]);
                } else{
                  date = new Date(dayString);
                }
           this.heartRateData
            .push(
              {
                heart_value: await this.healthDataService.getAverageDayHeartRate(date),
                date: new Date(x.date)
              });
            });

        }
        this.onChangeMonth("#heartCalendar","heart_value", this.heartRateData);

      })
      .catch(error => {
        console.log(error);
        this.toastService.showErrorToast(this.translateService.instant("tagesform-erfassen-page.error"));
      });
  }


  async onChangeMonth(container: string, valuesKey: any, labelArray = this.allDataArray) {
    //automatically relabel calendar of the selected month if month gets switched
    await this.labelCalendar(container, valuesKey, labelArray);
  }


  async shareAsImage(container: string) {
    // export HTML DOM of calendar as a png Image and ask where to share
    console.log(container);
    await htmlToImage.toPng(document.getElementById(container))
      .then(dataUrl => {
        this.createFileExportAndShare(container + ".png", dataUrl, this.translateService.instant("analyse.teile-bild"));
      }).catch(error => {
        console.log(error);
      });
  }

  async createFileExportAndShare(name: string, exportData: any, message: any) {
    await Filesystem.writeFile({
      directory: Directory.External,
      path: name,
      data: exportData,
    }).then(res => {
      console.log(res);
      Share.share({
        title: "PatientStrength",
        text: this.translateService.instant("analyse.erfassung-hinweis"),
        url: res.uri,
        dialogTitle: message,
      }).catch(e => {
        console.log("Share failed:", e);
      });
    }, err => {
      console.log("Error: ", err);
    });
  }
}

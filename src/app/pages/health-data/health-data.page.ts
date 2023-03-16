/* eslint-disable @typescript-eslint/quotes */
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import Chart from "chart.js/auto";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs";
import { HealthDataService } from "src/app/services/health-data.service";
import { ActivatedRoute } from "@angular/router";
import { IHeartRate } from "src/app/models/IHeartRate";
import { DeviceDetectorService } from "ngx-device-detector";

@Component({
  selector: "app-health-data",
  templateUrl: "./health-data.page.html",
  styleUrls: ["./health-data.page.scss"],
})
export class HealthDataPage implements OnInit, AfterViewInit, OnDestroy {
  readonly name = "GooglefitService";
  isAuthorized$ = new BehaviorSubject<boolean>(false);
  public day: Date;
  public dailySteps;
  public dailyStages;
  public dailyDistance;
  public dailyHeartRate;
  public dailyStepsGoal = 10000;
  private lineChart: any;
  public deviceInfo = null;
  @ViewChild("lineCanvas", { static: false }) private lineCanvas: ElementRef;

  constructor(
    private translateService: TranslateService,
    private changeDetectorRef: ChangeDetectorRef,
    private healthDataService: HealthDataService,
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceDetectorService,
  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

// clear values on destroy
  ngOnDestroy() {
    this.dailySteps = null;
    this.dailyStages = null;
    this.dailyDistance = null;
    this.dailyHeartRate = null;
    this.lineChart = null;
    this.day = null;
    this.isAuthorized$.next(false);
  }


  async ngOnInit() {
    const dayString = this.activatedRoute.snapshot.params.tag;
    if(dayString.includes("T")){
      this.day = new Date(dayString.split("T")[0]);
    }else{
      this.day = new Date(dayString);
    }

    this.isAuthorized$.next(await this.healthDataService.isAuthorized());
  }

  async ngAfterViewInit() {
    if(this.isAuthorized$) {
     await this.getDataFromService();
    }
  }

  public async connectHealthKit() {
    this.healthDataService.askForInstallingGoogleFit();
    if(await this.healthDataService.isAuthorized()) {
      //check on IOS is this ever happened?
      console.log("hi, documentation was wrong");
      this.isAuthorized$.next(true);
    } else {
      await this.healthDataService.requestAuthorization();
      this.isAuthorized$.next(true);
    }
    await this.getDataFromService();
  }

  public async connectGoogleFit() {
    if(!await this.healthDataService.isHealthAvailable()) {
      this.healthDataService.askForInstallingGoogleFit();
      return;
    }
    if(await this.healthDataService.isAuthorized()) {
      this.isAuthorized$.next(true);
    } else {
      await this.healthDataService.requestAuthorization();
      this.isAuthorized$.next(true);
    }
    await this.getDataFromService();

  }

  private setBar(name: string, value: number, goal?: number) {
    const stepsBar = document.getElementById(name);
    let color = 1;
    let percent = 100;
    if(name === "heart") {
      // only for heart rate
      if (value < 40) {
        color = 1;
      } else if (value < 73) {
        color = 3;
      } else if (value < 82) {
        color = 2;
      }
    }
    else if(!goal){
      color = 3;
    }
    else{
      color = Math.floor((value/goal+0.5)*2);
      color = color > 3 ? 3 : color;
      percent = value/goal*100;
    }
    stepsBar.style.background = `linear-gradient(90deg,var(--health-bar-color-${color}) ${percent}%, rgb(190, 190, 190) ${percent}%)`;
  }

  private async getDataFromService(){
    this.dailyDistance = await this.healthDataService.getDayDistanceInMeters(this.day);
    this.dailySteps = await this.healthDataService.getDaySteps(this.day);
    this.dailyStages = await this.healthDataService.getDayFloors(this.day);
    this.dailyHeartRate = await this.healthDataService.getAverageDayHeartRate(this.day);
    this.initView();
  }

  private initView() {
    this.changeDetectorRef.detectChanges();
    this.setBar("steps", this.dailySteps, this.dailyStepsGoal);
    this.setBar("stages", this.dailyStages);
    this.setBar("distance", this.dailyDistance);
    this.setBar("heart", this.dailyHeartRate);
    this.startChart();
  }

  private async startChart() {
    const heartRate: IHeartRate[] = await this.healthDataService.getDayHeartRatesByHours(this.day);
    const labels = heartRate.map(x => x.hour);
    const data = heartRate.map(x => x.heartRate);
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: this.translateService.instant("analyse.heart"),
            fill: false,
            backgroundColor: "rgba(86,180,114,0.6)",
            borderColor: "rgba(0,0,0,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderWidth: 1.5,
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(86,180,114,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(86,180,114,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            data,
            spanGaps: false,
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
              suggestedMin: 60,
              suggestedMax: 80
          }
        }
      }
    }
    );
  }

}

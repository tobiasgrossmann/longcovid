/* eslint-disable @typescript-eslint/quotes */
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import Chart from "chart.js/auto";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs";
import { HealthDataService } from "src/app/services/health-data.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { IHeartRate } from "src/app/models/IHeartRate";
import { DeviceDetectorService } from "ngx-device-detector";
import { EChartsOption, SeriesOption, ECharts  } from 'echarts';
import { reduce } from "cypress/types/bluebird";
import { DatabaseCrudService } from "src/app/services/database-crud.service";
import { Tagesform } from "src/app/utils/interfaces";
import * as echarts from 'echarts';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit, AfterViewInit, OnDestroy {
  readonly name = "GooglefitService";
  isAuthorized$ = new BehaviorSubject<boolean>(false);
  public dailySteps;
  public dailyStages;
  public dailyDistance;
  public dailyHeartRate;
  public dailyStepsGoal = 10000;
  private lineChart: any;
  public deviceInfo = null;
  private routerSubscription: any;

  private numberOfDays = 7;

  @ViewChild('tagesformChart') tagesformRef: ElementRef;
  tagesformChart: ECharts;
  @ViewChild('symptomeChart') symptomeRef: ElementRef;
  symptomeChart: ECharts;
  @ViewChild('aktivitaetenChart') aktivitaetenRef: ElementRef;
  aktivitaetenChart: ECharts;

  @ViewChild("lineCanvas", { static: false }) private lineCanvas: ElementRef;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  addDays(date, days):Date {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  dates(numberOfDays:number):Date[]  {
    let dates:Date[] = [];
    let date:Date = new Date();
    date.setHours(0,0,0,0);
    date = this.addDays(date, - numberOfDays);

    for (let day = 1; day <= numberOfDays; day++){
      dates.push(this.addDays(date, day));
      console.log("dashboard set dates", dates[dates.length-1].toLocaleDateString());
     }
     
    return dates;
  }

  days():string[]  {
    return this.dates(this.numberOfDays).map(date => this.translateService.instant('day' + date.getDay()));
  }
  
  symptomeOptions: EChartsOption = {
    legend:{show:true},
    xAxis: {
      type: 'category',
      data:  this.days()
    },
    yAxis: {
      type: 'value',
      show:false,
      min: 5,
      max: 1,
      inverse: true       
    },
    series: null,
    connectNulls: true
  };

  aktivitaetenOptions: EChartsOption = {
    legend:{show:true},
    xAxis: {
      type: 'category',
      data: this.days()
    },
    yAxis: {
      type: 'value',
      show:false,
      min: 5,
      max: 1,
      inverse: true  
    },
    series: null,
    connectNulls: true
  };

  tagesformOptions: EChartsOption = {
    legend:{show:true},
    xAxis: {
      type: 'category',
      data: this.days()
    },
    yAxis: {
      type: 'value',
      show:false,
      min: 5,
      max: 1,
      inverse: true      
    },
    series: null,
  };

  constructor(
    private translateService: TranslateService,
    private changeDetectorRef: ChangeDetectorRef,
    private healthDataService: HealthDataService,
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private databaseCrudService: DatabaseCrudService,
    private router: Router,
  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    console.debug(this.deviceInfo); 
  }

  ngAfterViewInit(): void {
  }

  createLine(name:string, color:string):SeriesOption{
    return       {
      data: [this.numberOfDays],
      type: 'line',
      smooth: true,
      color: color,
      connectNulls: true,
      name: this.translateService.instant(name)
    }

  }

  onTagesFormChartInit(chart: object, instance: any) {
    this.tagesformChart = instance;
  }

  async reloadTagesForm() {
    console.debug("reloadTagesForm"); 
    let dates = this.dates(this.numberOfDays);
    let tagesforms = await this.databaseCrudService.getTagesformListAndIdDate(dates[0], this.addDays(dates[dates.length - 1], 1));

    let series: SeriesOption[] = [
      this.createLine("tagesform-erfassen-page.tagesform","green"),
      this.createLine("tagesform-erfassen-page.erschoepfungsart","blue"),
      this.createLine("tagesform-erfassen-page.schlaf","orange"),
      this.createLine("tagesform-erfassen-page.stimmung","purple"),
    ]

    for (const tagesform of tagesforms.values) {
      let tagesFormDate = new Date(tagesform.date);

      let index = dates.findIndex(date => {        
        return date.toLocaleDateString() === tagesFormDate.toLocaleDateString()}
      );

      if (index !== -1){
        series[0].data[index] = tagesform.tagesform_value;
        series[1].data[index] = tagesform.erschoepfungsart_value;
        series[2].data[index] = tagesform.schlaf_value;
        series[3].data[index] = tagesform.stimmung_value;
        ;
      }
      
    }

    this.tagesformOptions.series = this.removeEmptySeries(series);
    this.tagesformChart.setOption(this.tagesformOptions);
  }

  async reloadAktivitaeten() {

    let dates = this.dates(this.numberOfDays);
    let aktivitaeten = await this.databaseCrudService.getAktivitaetenListAndIdDate(dates[0], this.addDays(dates[dates.length - 1], 1));

    let series: SeriesOption[] = [
      this.createLine("aktivitaet-erfassen-page.sport","green"),
      this.createLine("aktivitaet-erfassen-page.arbeit","blue"),
      this.createLine("aktivitaet-erfassen-page.hausarbeit","orange"),
      this.createLine("aktivitaet-erfassen-page.entspannung","purple"),
    ]

    for (const aktivitaet of aktivitaeten.values) {
      let aktivitaetenDate = new Date(aktivitaet.date);

      let index = dates.findIndex(date => {        
        return date.toLocaleDateString() === aktivitaetenDate.toLocaleDateString()}
      );

      if (index !== -1){
        series[0].data[index] = aktivitaet.aktivitaeten_names_checkboxes?.includes('Sport')?aktivitaet.sport_value:null;
        series[1].data[index] = aktivitaet.aktivitaeten_names_checkboxes?.includes('Arbeit')?aktivitaet.arbeit_value:null;
        series[2].data[index] = aktivitaet.aktivitaeten_names_checkboxes?.includes('Hausarbeit')?aktivitaet.hausarbeit_value:null;
        series[3].data[index] = aktivitaet.aktivitaeten_names_checkboxes?.includes('Entspannung')?aktivitaet.entspannung_value:null;
        ;
      }
      
    }

    this.aktivitaetenOptions.series = this.removeEmptySeries(series);
    this.aktivitaetenChart.setOption(this.aktivitaetenOptions);

  }

  removeEmptySeries(series:SeriesOption[]){
    return series.filter((serie) => {
      let retVal = (serie.data as any[]).find(data=> data!==null && data!=="null") !== undefined;
       return retVal ;
    }
    );
  }

  
  async reloadSymptome() {

    let dates = this.dates(this.numberOfDays);
    let symptome = await this.databaseCrudService.getSymptomeListAndIdDate(dates[0], this.addDays(dates[dates.length - 1], 1));

    let series: SeriesOption[] = [
      this.createLine("symptome-erfassen-page.husten","green"),
      this.createLine("symptome-erfassen-page.fieber","blue"),
      this.createLine("symptome-erfassen-page.fatigue","orange"),
      this.createLine("symptome-erfassen-page.kurzatmigkeit","purple"),
      this.createLine("symptome-erfassen-page.brustschmerzen","pink"),
      this.createLine("symptome-erfassen-page.kopfschmerzen","red"),
      this.createLine("symptome-erfassen-page.geschmacksverlust","black"),
      this.createLine("symptome-erfassen-page.neurologische-störung","cyan"),
      this.createLine("symptome-erfassen-page.muskelschmerzen","pink"),
      this.createLine("symptome-erfassen-page.hautausschlag","brown"),
      this.createLine("symptome-erfassen-page.missempfindungen","beige"),
      this.createLine("symptome-erfassen-page.schwindel","gray"),
      this.createLine("symptome-erfassen-page.gedaechtniseinschraenkungen","#abdbe3"),
      this.createLine("symptome-erfassen-page.leseeinschraenkungen","#063970"),
    ]

    for (const symptom of symptome.values) {
      let symptomeDate = new Date(symptom.date);

      let index = dates.findIndex(date => {  
        const foundDate = date.toLocaleDateString() === symptomeDate.toLocaleDateString();
        if (foundDate){
          console.log("dashboard found date", date.toLocaleDateString(), JSON.stringify(symptom));   
        }   
        return foundDate;
    });

      if (index !== -1){
        series[0].data[index] = symptom.symptom_names_checkboxes?.includes('Husten')?symptom.husten_value:undefined;
        series[1].data[index] = symptom.symptom_names_checkboxes?.includes('Fieber')?symptom.fieber_value:undefined;
        series[2].data[index] = symptom.symptom_names_checkboxes?.includes('Fatigue')?symptom.fatigue_value:undefined;
        series[3].data[index] = symptom.symptom_names_checkboxes?.includes('Kurzatmigkeit')?symptom.kurzatmigkeit_value:undefined;
        series[4].data[index] = symptom.symptom_names_checkboxes?.includes('Brustschmerzen')?symptom.brustschmerzen_value:undefined;
        series[5].data[index] = symptom.symptom_names_checkboxes?.includes('Kopfschmerzen')?symptom.kopfschmerzen_value:undefined;
        series[6].data[index] = symptom.symptom_names_checkboxes?.includes('Geschmacksverlust')?symptom.geschmacksverlust_value:undefined;
        series[7].data[index] = symptom.symptom_names_checkboxes?.includes('Neurologische')?symptom.neurologische_stoerung_value:undefined;
        series[8].data[index] = symptom.symptom_names_checkboxes?.includes('Muskelschmerzen')?symptom.muskelschmerzen_value:undefined;
        series[9].data[index] = symptom.symptom_names_checkboxes?.includes('Hautausschlag')?symptom.hautausschlag_value:undefined;
        series[10].data[index] = symptom.symptom_names_checkboxes?.includes('Missempfindungen')?symptom.missempfindungen_value:undefined;
        series[11].data[index] = symptom.symptom_names_checkboxes?.includes('Schwindel')?symptom.schwindel_value:undefined;
        series[12].data[index] = symptom.symptom_names_checkboxes?.includes('Gedaechtniseinschraenkungen')?symptom.gedaechtniseinschraenkungen_value:undefined;
        series[13].data[index] = symptom.symptom_names_checkboxes?.includes('Leseeinschraenkungen')?symptom.leseeinschraenkungen_value:undefined;

      }
      
    }

    this.symptomeOptions.series = this.removeEmptySeries(series);
    this.symptomeChart.setOption(this.symptomeOptions);

  }

  async reload() {
    await this.reloadTagesForm();
    await this.reloadAktivitaeten();
    await this.reloadSymptome();
  }

  // clear values on destroy
  ngOnDestroy() {
    this.dailySteps = null;
    this.dailyStages = null;
    this.dailyDistance = null;
    this.dailyHeartRate = null;
    this.lineChart = null;
    this.routerSubscription?.unsubscribe();
    this.isAuthorized$.next(false);
  }

  async ngOnInit() {
    console.debug("dashboard ngOnInit");
    this.isAuthorized$.next(await this.healthDataService.isAuthorized());
    console.debug("dashboard tagesformChart");
    this.tagesformChart = echarts.init(this.tagesformRef.nativeElement);
    console.debug("dashboard symptomeChart");
    this.symptomeChart = echarts.init(this.symptomeRef.nativeElement);
    console.debug("dashboard aktivitaetenChart");
    this.aktivitaetenChart = echarts.init(this.aktivitaetenRef.nativeElement);
    console.debug("dashboard call reload()");
    this.reload();

    this.routerSubscription = this.router.events.subscribe((event) => {if (event instanceof NavigationEnd) {
      if (event.url.includes("dashboard")) {
        this.reload();
      }
    }});
  }

}

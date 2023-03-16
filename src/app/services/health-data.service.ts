import { Injectable } from "@angular/core";
import { Health, HealthData } from "@awesome-cordova-plugins/health/ngx";
import { DeviceDetectorService } from "ngx-device-detector";
import { BehaviorSubject } from "rxjs";
import { IHeartRate } from "../models/IHeartRate";
import { HealthDataVariables } from "./health-data-variables";

@Injectable({
  providedIn: "root"
})
export class HealthDataService {

  public deviceInfo = null;
  isAuthorized$ = new BehaviorSubject<boolean>(null);
  constructor(private health: Health,
    private deviceService: DeviceDetectorService) {
      this.deviceInfo = this.deviceService.getDeviceInfo();
      console.log("deviceInfo",  this.deviceInfo)
    }

  async isHealthAvailable(): Promise<boolean>{
    return this.deviceInfo.deviceType !== "desktop" && this.health.isAvailable();
  }

  askForInstallingGoogleFit(){
    this.health.promptInstallFit()
    .then(res => console.log(res))
    .catch(e => console.log(e));
  }

  returnPermissions(){
    const permissions = [{ read: ["steps", "distance", "heart_rate"] }];
    if(this.deviceInfo.os === "iOS"){
      permissions.push({ read: ["stairs"] });
    }
    else {
      permissions.push({ read: ["activity", "calories"] });
    }
    return permissions;
  }

  async requestAuthorization(): Promise<void> {
    await this.health.requestAuthorization(this.returnPermissions());
  }

  async isAuthorized(): Promise<boolean> {
    if(this.deviceInfo.os === "iOS")
    {
      await this.requestAuthorization();
      return true;
    } else if (this.deviceInfo.deviceType === "desktop"){
      return true;
    }
    return this.health.isAuthorized(this.returnPermissions());
  }

  queryPrepare(day: Date, _dataType: string, canQueryBeAggregated: boolean): Promise<HealthData[]>
  {
    const startOfDay: Date = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    startOfDay.setHours(0, 0, 0);
    const endOfDay: Date = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    endOfDay.setHours(endOfDay.getHours() + 23);
    endOfDay.setMinutes(endOfDay.getMinutes() + 59);
    endOfDay.setSeconds(endOfDay.getSeconds() + 59);

    if (this.deviceInfo.deviceType === "desktop"){
      return new Promise<HealthData[]>((resolve) => {
        console.log("queryPrepare empty promise");
        resolve([]);
        });
    }

    // only specific variables can use queryAggregated method according to https://github.com/dariosalvi78/cordova-plugin-health
    if(!canQueryBeAggregated){
      return this.health.query({
        startDate: startOfDay, // start of day e.g. 01.02.2022 0:00:00
        endDate: endOfDay, // start of next day e.g. 02.02.2022 0:00:00
        dataType: _dataType,
        limit: 2500
      });
    }
    else{
      return this.health.queryAggregated({
        startDate: startOfDay, // start of day e.g. 01.02.2022 0:00:00
        endDate: endOfDay, // start of next day e.g. 02.02.2022 0:00:00
        dataType: _dataType,
        bucket: "day"
      });
    }
  }

  async getStairsFromActivityData(day: Date): Promise<any[]> {
    return this.queryPrepare(day, "activity", false).then(res => res.filter(data => data.value === "stair_climbing"));
  }

  async getDaySteps(day: Date): Promise<number>{
    let countSteps = 0;

    await this.queryPrepare(day, HealthDataVariables.STEPS, true)
    .then(res => {
      res.forEach((response) => {
        countSteps += Number(response.value);
      });
    })
    .catch(e => console.log(e));

    return Math.floor(countSteps);
  }

  async getDayDistanceInMeters(day: Date): Promise<number>{
    let countDistance = 0;

    await this.queryPrepare(day, HealthDataVariables.DISTANCE, true)
    .then(res => {
      res.forEach((response) => {
        countDistance += Number(response.value);
      });
    })
    .catch(e => console.log(e));

    return Math.floor(countDistance);
  }

  async getDayFloors(day: Date): Promise<number>{
    let countStairs = 0;

    if(this.deviceInfo.os === "iOS"){
      await this.queryPrepare(day, HealthDataVariables.STAIRS, false)
      .then(res => {
        res.forEach((response) => {
          countStairs += Number(response.value);
        });
      })
      .catch(e => console.log(e));
    }
    else{
      await this.getStairsFromActivityData(day) .then(res => {
        res.forEach((response) => {
          countStairs += Math.floor(Number(response.distance+10)/16);
        });
      })
      .catch(e => console.log(e));
    }

    return Math.round(countStairs);
  }

  async getDayHeartRatesByHours(day: Date): Promise<IHeartRate[]> {
    const heartRates: IHeartRate[] = [];

    await this.queryPrepare(day, HealthDataVariables.HEART_RATE, false)
    .then(res => {
      for(let i = 0; i < 24; i++){
        let sumOfHeartRates = 0;
        let numberOfHeartRates = 0;
        res.filter(response => response.endDate.getHours() === i)
          .forEach(response => {
          numberOfHeartRates++;
          sumOfHeartRates += Number(response.value);
        });
        heartRates.push({
          hour: String(i) + ":00",
          heartRate: sumOfHeartRates !== 0? sumOfHeartRates/numberOfHeartRates: null
        });
      }
    })
    .catch(e => console.log("GetDayHeartRates Error: " + e));

    return heartRates;
  }

  async getAverageDayHeartRate(day: Date): Promise<number>{
    let periods = 0;
    let heartRates = 0;
    (await this.getDayHeartRatesByHours(day)).forEach(heartRate =>{
      if(heartRate.heartRate != null){
        periods++;
        heartRates += heartRate.heartRate;
      }
    });
    return periods !== 0? Math.round(heartRates/periods):0;
  }
}

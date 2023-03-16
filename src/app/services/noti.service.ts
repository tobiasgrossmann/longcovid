import { Injectable } from "@angular/core";
import { LocalNotifications, Schedule } from "@capacitor/local-notifications";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root"
})

export class NotiService {

  dailyNotificationId: number = 15;
  nextNotiInMillis : number = 24 * 60 * 60 * 1000; // 1 day
  //nextNotiInMillis : number = 1 * 60 * 1000; // 1 minute
  timeOFDay : number = 20; // 19

  constructor(private translateService: TranslateService) {}

  restartNotifications(): void {

    LocalNotifications.removeAllDeliveredNotifications().then (()=> {

      console.log('NotiService.startNotifications delivered notis removed');
    });

    LocalNotifications.cancel({notifications:[{id:this.dailyNotificationId}]}).then (()=> {

      console.log('NotiService.startNotifications existing notis cancelled');
    });

    var nextNoti = new Date(new Date().getTime() + this.nextNotiInMillis);
    nextNoti.setHours(this.timeOFDay, 0 ,0);

    const futureNoti: Schedule = {
      allowWhileIdle: true,
      at: nextNoti
    };

    console.log('NotiService.startNotifications nextNoti set to ', JSON.stringify(futureNoti));

    LocalNotifications.requestPermissions().then ((answer)=> {

      console.log('NotiService.startNotifications requestPermissions answer', JSON.stringify(answer));

      LocalNotifications.schedule({notifications: [{
        id: this.dailyNotificationId,
        title: this.translateService.instant('Long-Covid Tagebuch'),
        body :this.translateService.instant('Heute schon einen Eintrag erstellt?'),
        schedule: futureNoti
      }]
      });

      console.log('NotiService.startNotifications notification scheduled ', JSON.stringify(futureNoti));

     });

  }

 
}

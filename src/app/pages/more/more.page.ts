import { Component } from "@angular/core";
import { DeviceDetectorService } from "ngx-device-detector";
@Component({
  selector: "app-more",
  templateUrl: "./more.page.html",
  styleUrls: ["./more.page.scss"],
})
export class MorePage {
  public deviceInfo = null;

  constructor(
    private deviceService: DeviceDetectorService
    ) {
      this.deviceInfo = this.deviceService.getDeviceInfo();
    }
}

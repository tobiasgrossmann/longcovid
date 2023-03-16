import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HealthDataPageRoutingModule } from "./health-data-routing.module";

import { HealthDataPage } from "./health-data.page";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    HealthDataPageRoutingModule
  ],
  declarations: [HealthDataPage]
})
export class HealthDataPageModule {}

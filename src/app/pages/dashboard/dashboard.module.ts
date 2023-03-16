import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DashboardPageRoutingModule } from "./dashboard-routing.module";

import { DashboardPage } from "./dashboard.page";
import { TranslateModule } from "@ngx-translate/core";
import { NgxEchartsModule } from "ngx-echarts";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DashboardPageRoutingModule,
    NgxEchartsModule.forChild(),
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}

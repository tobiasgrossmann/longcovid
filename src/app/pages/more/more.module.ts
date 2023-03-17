import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MorePageRoutingModule } from "./more-routing.module";

import { MorePage } from "./more.page";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/shared/shared.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TranslateModule,
    MorePageRoutingModule
  ],
  declarations: [MorePage]
})
export class MorePageModule {}

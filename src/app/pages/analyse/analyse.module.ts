import {Inject, LOCALE_ID, NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import {IonicModule, LoadingController} from "@ionic/angular";

import { AnalysePageRoutingModule } from "./analyse-routing.module";

import { AnalysePage } from "./analyse.page";
import {TranslateModule} from "@ngx-translate/core";
import {CalendarModule} from "ion2-calendar";
import * as moment from "moment-timezone";
import {SharedModule} from "../../shared/shared/shared.module";
import {DateOnlyPipe} from "../../utils/util-filters/date-only.pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AnalysePageRoutingModule,
        TranslateModule,
        CalendarModule,
        SharedModule
    ],
  declarations: [AnalysePage],
  providers: [
      { provide: LOCALE_ID, useValue: "de" },
      DateOnlyPipe
  ]
})
export class AnalysePageModule {
    constructor(
        @Inject(LOCALE_ID) public locale: string
    ) {
        moment.locale(locale);
        // moment.locale("en");
        moment.tz.setDefault("Europe/Berlin");
    }
}

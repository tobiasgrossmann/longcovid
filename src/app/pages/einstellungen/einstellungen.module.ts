import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IonicModule} from "@ionic/angular";

import {EinstellungenPageRoutingModule} from "./einstellungen-routing.module";

import {EinstellungenPage} from "./einstellungen.page";
import {TranslateModule} from "@ngx-translate/core";
import {CountryPipe} from "../../utils/util-filters/country.pipe";
import { SharedModule } from "src/app/shared/shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        TranslateModule,
        EinstellungenPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [EinstellungenPage],
    providers: [CountryPipe]
})
export class EinstellungenPageModule {
}

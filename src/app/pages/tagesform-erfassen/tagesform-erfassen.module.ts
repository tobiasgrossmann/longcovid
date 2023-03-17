import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TagesformErfassenPageRoutingModule } from "./tagesform-erfassen-routing.module";

import { TagesformErfassenPage } from "./tagesform-erfassen.page";
import {TranslateModule} from "@ngx-translate/core";
import {TagesformPipe} from "../../utils/util-filters/tagesform-pipe.pipe";
import {ErschoepfungsartPipe } from "../../utils/util-filters/erschoepfungsart-pipe.pipe";
import {SharedModule} from "../../shared/shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TagesformErfassenPageRoutingModule,
        TranslateModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [TagesformErfassenPage],
    providers: [
        TagesformPipe,
        ErschoepfungsartPipe
    ]
})
export class TagesformErfassenPageModule {}

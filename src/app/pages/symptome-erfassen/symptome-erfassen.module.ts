import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IonicModule} from "@ionic/angular";

import {SymptomeErfassenPageRoutingModule} from "./symptome-erfassen-routing.module";

import {SymptomeErfassenPage} from "./symptome-erfassen.page";
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../../shared/shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SymptomeErfassenPageRoutingModule,
        ReactiveFormsModule,
        TranslateModule,
        SharedModule
    ],
    declarations: [SymptomeErfassenPage]
})
export class SymptomeErfassenPageModule {
}

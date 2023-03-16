import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IonicModule} from "@ionic/angular";

import {EssenErfassenPageRoutingModule} from "./essen-erfassen-routing.module";

import {EssenErfassenPage} from "./essen-erfassen.page";
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../../shared/shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        EssenErfassenPageRoutingModule,
        TranslateModule,
        SharedModule
    ],
    declarations: [EssenErfassenPage]
})
export class EssenErfassenPageModule {
}

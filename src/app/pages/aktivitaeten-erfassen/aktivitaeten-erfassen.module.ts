import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AktivitaetenErfassenPageRoutingModule } from "./aktivitaeten-erfassen-routing.module";

import { AktivitaetenErfassenPage } from "./aktivitaeten-erfassen.page";
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../../shared/shared/shared.module";
import {AktivitaetenPipe} from "../../utils/util-filters/aktivitaeten.pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AktivitaetenErfassenPageRoutingModule,
        TranslateModule,
        ReactiveFormsModule,
        SharedModule
    ],
  declarations: [AktivitaetenErfassenPage],
  providers: [
      AktivitaetenPipe
  ]
})
export class AktivitaetenErfassenPageModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { KnowledgePageRoutingModule } from "./knowledge-routing.module";

import { KnowledgePage } from "./knowledge.page";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/shared/shared.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TranslateModule,
    KnowledgePageRoutingModule
  ],
  declarations: [KnowledgePage]
})
export class KnowledgePageModule {}

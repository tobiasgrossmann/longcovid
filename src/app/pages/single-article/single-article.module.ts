import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { SingleArticlePage } from "./single-article.page";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "src/app/shared/shared/shared.module";
import { SingleArticlePageRoutingModule } from "./single-article-routing.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TranslateModule,
    SingleArticlePageRoutingModule
  ],
  declarations: [SingleArticlePage]
})
export class SingleArticlePageModule {}

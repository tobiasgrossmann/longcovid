import { Component, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DeviceDetectorService } from "ngx-device-detector";
import { IArticle } from "src/app/models/IArticle";
import { ArticleService } from "src/app/services/article.service";
@Component({
  selector: "app-knowledge",
  templateUrl: "./knowledge.page.html",
  styleUrls: ["./knowledge.page.scss"],
})
export class KnowledgePage implements OnInit, OnDestroy {
  articles: IArticle[];
  public deviceInfo = null;
  constructor(
    private deviceService: DeviceDetectorService,
    private translateService: TranslateService,
    private articleService: ArticleService,
  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  ngOnInit() {
    this.translateService.onLangChange.subscribe(() => {
      this.articleService.loadArticleList(this.translateService.currentLang);
      this.articles = this.articleService.getArticleListForknowledge();
    });

    const lang = this.translateService.currentLang;
    if(lang === "de" || lang === "fr" || lang === "en"){
      this.articleService.loadArticleList(lang);
      this.articles = this.articleService.getArticleListForknowledge();
    }
    else{
      throw new Error("Unknown language");
    }
  }

  ngOnDestroy() {
    this.translateService.onLangChange.unsubscribe();
  }
}

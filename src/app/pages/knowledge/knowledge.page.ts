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
    const lang = this.translateService.currentLang;
    this.articleService.loadArticleList(lang);
    this.articles = this.articleService.getArticleListForknowledge();
  }

  ngOnDestroy() {
  }
}

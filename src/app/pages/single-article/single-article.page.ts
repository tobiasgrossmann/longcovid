import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { DeviceDetectorService } from "ngx-device-detector";
import { IArticle } from "src/app/models/IArticle";
import { ArticleService } from "src/app/services/article.service";

@Component({
  selector: "app-single-article",
  templateUrl: "./single-article.page.html",
  styleUrls: ["./single-article.page.scss"],
})
export class SingleArticlePage implements OnInit {
  public deviceInfo = null;
  public readonly articleId: number;
  public buttonText: string;
  article: IArticle;
  constructor(
    private deviceService: DeviceDetectorService,
    private translateService: TranslateService,
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.articleId = this.activatedRoute.snapshot.params.articleId;
  }

  ngOnInit() {
    const lang = this.translateService.currentLang;
    if(lang === "de" || lang === "fr" || lang === "en"){
      this.articleService.loadArticleList(lang);
      this.article = this.articleService.getArticleByIndex(this.articleId);
    }
    else{
      throw new Error("Unknown language");
    }

    const currentCountry = localStorage.getItem("currentCountry");
    if(currentCountry === "CH"){
      this.buttonText =  this.article.buttonSwiss.toLocaleUpperCase();
    }
    else{
      this.buttonText =  this.article.buttonGerman.toLocaleUpperCase();
    }
  }


  openStoreLink(){
    const currentCountry = localStorage.getItem("currentCountry");
    let articleLink: string;
    if(currentCountry === "CH"){
      articleLink = this.article.linkSwiss;
    }
    else{
      articleLink = this.article.linkGerman;
    }
    if(!articleLink.match(/^https?:\/\//i)){
      window.open("https://" + articleLink, "_system", "location=yes");
    }
    else{
      window.open( articleLink, "_system", "location=yes");
    }
  }
}

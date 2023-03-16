import { Injectable } from "@angular/core";
import * as data from "../../assets/articles/articles.json";
import { IArticle } from "../models/IArticle";

@Injectable({
  providedIn: "root"
})

export class ArticleService {

  private articleList: IArticle[];

  constructor() {}

  loadArticleList(language: string): void {
    this.articleList = [];
    data[language].forEach(article => {
      this.articleList.push({
        title: article.title,
        articleText: article.article_text,
        image: article.image,
        linkGerman: article.link_german,
        buttonGerman: article.button_german,
        linkSwiss: article.link_swiss,
        buttonSwiss: article.button_swiss,
        source: article.source,
        source_link: article.source_link,
        date: article.date,
        source_2:article.source_2?article.source_2:"",
        source_2_link:article.source_2_link?article.source_2_link:"",
      });
    });
  }

  getArticleListForknowledge(): IArticle[] {
    return this.articleList.map(article => {
      let maxLength = 56;
      if(article.title.length > 30) {
        maxLength -= (article.title.length-30)*1.6;
      }
      if (article.articleText.length > maxLength) {
        let text = article.articleText.substring(0, maxLength);
        const lastSpace = text.lastIndexOf(" ");
        text = text.substring(0, lastSpace);
        if(text[text.length-1] === "." || text[text.length-1] === "!" || text[text.length-1] === "?" || text[text.length-1] === ",") {
          text = text.substring(0, text.length-1);
        }
        article.articleText = text + "...";
      }
      return article;
    });
  }

  getArticleByTitle(title: string): IArticle {
    return this.articleList.find(article => article.title === title);
  }

  getArticleByIndex(index: number): IArticle {
    return this.articleList[index];
  }
}

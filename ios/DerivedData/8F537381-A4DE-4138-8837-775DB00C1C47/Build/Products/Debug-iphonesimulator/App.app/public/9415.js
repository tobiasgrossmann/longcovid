"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9415],{9415:(C,d,r)=>{r.r(d),r.d(d,{SingleArticlePageModule:()=>x});var s=r(6895),g=r(4006),a=r(4881),l=r(8490),u=r(1511),c=r(2905),e=r(6738),m=r(3795),v=r(2722);function f(t,o){if(1&t&&(e.\u0275\u0275elementStart(0,"div"),e.\u0275\u0275element(1,"span"),e.\u0275\u0275elementStart(2,"div",6),e.\u0275\u0275text(3),e.\u0275\u0275pipe(4,"translate"),e.\u0275\u0275elementStart(5,"a",7),e.\u0275\u0275text(6),e.\u0275\u0275elementEnd()()()),2&t){const n=e.\u0275\u0275nextContext();e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate1("",e.\u0275\u0275pipeBind1(4,3,"article.source"),": "),e.\u0275\u0275advance(2),e.\u0275\u0275propertyInterpolate("href",n.article.source_2_link,e.\u0275\u0275sanitizeUrl),e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate(n.article.source_2)}}const h=[{path:"",component:(()=>{class t{constructor(n,i,p,S){this.deviceService=n,this.translateService=i,this.articleService=p,this.activatedRoute=S,this.deviceInfo=null,this.deviceInfo=this.deviceService.getDeviceInfo(),this.articleId=this.activatedRoute.snapshot.params.articleId}ngOnInit(){const n=this.translateService.currentLang;if("de"!==n&&"fr"!==n&&"en"!==n)throw new Error("Unknown language");this.articleService.loadArticleList(n),this.article=this.articleService.getArticleByIndex(this.articleId),this.buttonText="CH"===localStorage.getItem("currentCountry")?this.article.buttonSwiss.toLocaleUpperCase():this.article.buttonGerman.toLocaleUpperCase()}openStoreLink(){let i;i="CH"===localStorage.getItem("currentCountry")?this.article.linkSwiss:this.article.linkGerman,i.match(/^https?:\/\//i)?window.open(i,"_system","location=yes"):window.open("https://"+i,"_system","location=yes")}}return t.\u0275fac=function(n){return new(n||t)(e.\u0275\u0275directiveInject(m.x0),e.\u0275\u0275directiveInject(l.sK),e.\u0275\u0275directiveInject(v.n),e.\u0275\u0275directiveInject(c.gz))},t.\u0275cmp=e.\u0275\u0275defineComponent({type:t,selectors:[["app-single-article"]],decls:33,vars:18,consts:[["slot","start"],[1,"ion-flex-grow-1"],[1,"article-image__container"],[1,"vh-25","article-image",3,"alt","src"],[1,"article-title","w-100"],[1,"article-content"],[1,"article-source"],[3,"href"],[4,"ngIf"],[1,"article-date"],[1,"ion-no-border"],["color","primary","expand","block","fill","clear","size","default",1,"m-0","p-0","h-3","w-100","opacity-80",3,"click"],[1,"small","pt-button-text"]],template:function(n,i){1&n&&(e.\u0275\u0275elementStart(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),e.\u0275\u0275element(3,"ion-back-button"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(4,"ion-title"),e.\u0275\u0275text(5),e.\u0275\u0275pipe(6,"translate"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(7,"ion-content")(8,"ion-card",1)(9,"ion-card-header")(10,"div",2),e.\u0275\u0275element(11,"img",3),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(12,"ion-card-title",4),e.\u0275\u0275text(13),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(14,"ion-card-content")(15,"div",5),e.\u0275\u0275text(16),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(17,"span"),e.\u0275\u0275elementStart(18,"div",6),e.\u0275\u0275text(19),e.\u0275\u0275pipe(20,"translate"),e.\u0275\u0275elementStart(21,"a",7),e.\u0275\u0275text(22),e.\u0275\u0275elementEnd()(),e.\u0275\u0275template(23,f,7,5,"div",8),e.\u0275\u0275elementStart(24,"div",9),e.\u0275\u0275text(25),e.\u0275\u0275pipe(26,"translate"),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(27,"ion-footer",10)(28,"ion-row")(29,"ion-col")(30,"ion-button",11),e.\u0275\u0275listener("click",function(){return i.openStoreLink()}),e.\u0275\u0275elementStart(31,"ion-text",12),e.\u0275\u0275text(32),e.\u0275\u0275elementEnd()()()()()),2&n&&(e.\u0275\u0275advance(5),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(6,12,"article.article")),e.\u0275\u0275advance(6),e.\u0275\u0275propertyInterpolate("alt",i.article.title),e.\u0275\u0275propertyInterpolate("src",i.article.image,e.\u0275\u0275sanitizeUrl),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(i.article.title),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(i.article.articleText),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate1("",e.\u0275\u0275pipeBind1(20,14,"article.source"),": "),e.\u0275\u0275advance(2),e.\u0275\u0275propertyInterpolate("href",i.article.source_link,e.\u0275\u0275sanitizeUrl),e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate(i.article.source),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",i.article.source_2),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate2("",e.\u0275\u0275pipeBind1(26,16,"article.date"),": ",i.article.date,""),e.\u0275\u0275advance(7),e.\u0275\u0275textInterpolate(i.buttonText))},dependencies:[s.NgIf,a.IonBackButton,a.IonButton,a.IonButtons,a.IonCard,a.IonCardContent,a.IonCardHeader,a.IonCardTitle,a.IonCol,a.IonContent,a.IonFooter,a.IonHeader,a.IonRow,a.IonText,a.IonTitle,a.IonToolbar,a.IonBackButtonDelegate,l.X$],styles:[".article-image[_ngcontent-%COMP%]{display:block;margin-left:auto;margin-right:auto;object-fit:cover;width:55vw;height:55vw;border-radius:20px}.article-image__container[_ngcontent-%COMP%]{display:inline-block;border-radius:10px;width:100%}.article-title[_ngcontent-%COMP%]{color:#63c2de;font-size:28px;font-weight:700;padding:0 14px}.article-content[_ngcontent-%COMP%]{color:#000;font-size:18px;padding:14px}.article-source[_ngcontent-%COMP%]{color:#000;font-size:18px;padding:14px 14px 6px}.article-date[_ngcontent-%COMP%]{color:#000;font-size:16px;padding:6px 14px 14px}@media screen and (min-width: 400px){.article-image[_ngcontent-%COMP%]{width:40vw;height:40vw}.article-title[_ngcontent-%COMP%]{font-size:34px;padding:0 16px}.article-content[_ngcontent-%COMP%], .article-source[_ngcontent-%COMP%]{font-size:22px}}@media screen and (min-width: 600px){.article-title[_ngcontent-%COMP%]{font-size:46px}.article-content[_ngcontent-%COMP%], .article-source[_ngcontent-%COMP%]{font-size:28px}}"]}),t})()}];let I=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.\u0275\u0275defineNgModule({type:t}),t.\u0275inj=e.\u0275\u0275defineInjector({imports:[c.Bz.forChild(h),c.Bz]}),t})(),x=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.\u0275\u0275defineNgModule({type:t}),t.\u0275inj=e.\u0275\u0275defineInjector({imports:[s.CommonModule,g.FormsModule,a.IonicModule,u.m,l.aw,I]}),t})()}}]);
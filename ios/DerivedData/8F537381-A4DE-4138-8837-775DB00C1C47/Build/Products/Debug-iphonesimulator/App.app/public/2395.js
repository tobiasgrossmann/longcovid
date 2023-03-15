"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2395],{2395:(W,k,r)=>{r.r(k),r.d(k,{DashboardPageModule:()=>X});var L=r(6895),R=r(4006),u=r(4881),m=r(2905),C=r(5861),E=r(591),y=r(7386),t=r(6738),O=r(8490),j=r(3111),F=r(3795),T=r(535),_=r(8548);const Q=["tagesformChart"],B=["symptomeChart"],N=["aktivitaetenChart"],G=["lineCanvas"];function H(s,f){1&s&&(t.\u0275\u0275elementStart(0,"ion-title",9),t.\u0275\u0275text(1),t.\u0275\u0275pipe(2,"translate"),t.\u0275\u0275elementEnd()),2&s&&(t.\u0275\u0275advance(1),t.\u0275\u0275textInterpolate(t.\u0275\u0275pipeBind1(2,1,"dashboard")))}function Z(s,f){1&s&&(t.\u0275\u0275elementStart(0,"ion-title",10),t.\u0275\u0275text(1),t.\u0275\u0275pipe(2,"translate"),t.\u0275\u0275elementEnd()),2&s&&(t.\u0275\u0275advance(1),t.\u0275\u0275textInterpolate(t.\u0275\u0275pipeBind1(2,1,"dashboard")))}const K=[{path:"",component:(()=>{class s{constructor(e,n,o,a,d,h,l){this.translateService=e,this.changeDetectorRef=n,this.healthDataService=o,this.activatedRoute=a,this.deviceService=d,this.databaseCrudService=h,this.router=l,this.name="GooglefitService",this.isAuthorized$=new E.X(!1),this.dailyStepsGoal=1e4,this.deviceInfo=null,this.numberOfDays=7,this.slideOpts={initialSlide:1,speed:400},this.symptomeOptions={legend:{show:!0},xAxis:{type:"category",data:this.days()},yAxis:{type:"value",show:!1,min:5,max:1,inverse:!0},series:null,connectNulls:!0},this.aktivitaetenOptions={legend:{show:!0},xAxis:{type:"category",data:this.days()},yAxis:{type:"value",show:!1,min:5,max:1,inverse:!0},series:null,connectNulls:!0},this.tagesformOptions={legend:{show:!0},xAxis:{type:"category",data:this.days()},yAxis:{type:"value",show:!1,min:5,max:1,inverse:!0},series:null},this.deviceInfo=this.deviceService.getDeviceInfo(),console.debug(this.deviceInfo)}addDays(e,n){var o=new Date(e);return o.setDate(o.getDate()+n),o}dates(e){let n=[],o=new Date;o.setHours(0,0,0,0),o=this.addDays(o,-e);for(let a=1;a<=e;a++)n.push(this.addDays(o,a)),console.log("dashboard set dates",n[n.length-1].toLocaleDateString());return n}days(){return this.dates(this.numberOfDays).map(e=>this.translateService.instant("day"+e.getDay()))}ngAfterViewInit(){}createLine(e,n){return{data:[this.numberOfDays],type:"line",smooth:!0,color:n,connectNulls:!0,name:this.translateService.instant(e)}}onTagesFormChartInit(e,n){this.tagesformChart=n}reloadTagesForm(){var e=this;return(0,C.Z)(function*(){console.debug("reloadTagesForm");let n=e.dates(e.numberOfDays),o=yield e.databaseCrudService.getTagesformListAndIdDate(n[0],e.addDays(n[n.length-1],1)),a=[e.createLine("tagesform-erfassen-page.tagesform","green"),e.createLine("tagesform-erfassen-page.erschoepfungsart","blue"),e.createLine("tagesform-erfassen-page.schlaf","orange"),e.createLine("tagesform-erfassen-page.stimmung","purple")];for(const d of o.values){let h=new Date(d.date),l=n.findIndex(p=>p.toLocaleDateString()===h.toLocaleDateString());-1!==l&&(a[0].data[l]=d.tagesform_value,a[1].data[l]=d.erschoepfungsart_value,a[2].data[l]=d.schlaf_value,a[3].data[l]=d.stimmung_value)}e.tagesformOptions.series=e.removeEmptySeries(a),e.tagesformChart.setOption(e.tagesformOptions)})()}reloadAktivitaeten(){var e=this;return(0,C.Z)(function*(){let n=e.dates(e.numberOfDays),o=yield e.databaseCrudService.getAktivitaetenListAndIdDate(n[0],e.addDays(n[n.length-1],1)),a=[e.createLine("aktivitaet-erfassen-page.sport","green"),e.createLine("aktivitaet-erfassen-page.arbeit","blue"),e.createLine("aktivitaet-erfassen-page.hausarbeit","orange"),e.createLine("aktivitaet-erfassen-page.entspannung","purple")];for(const g of o.values){let x=new Date(g.date),v=n.findIndex(b=>b.toLocaleDateString()===x.toLocaleDateString());var d,h,l,p;-1!==v&&(a[0].data[v]=null!==(d=g.aktivitaeten_names_checkboxes)&&void 0!==d&&d.includes("Sport")?g.sport_value:null,a[1].data[v]=null!==(h=g.aktivitaeten_names_checkboxes)&&void 0!==h&&h.includes("Arbeit")?g.arbeit_value:null,a[2].data[v]=null!==(l=g.aktivitaeten_names_checkboxes)&&void 0!==l&&l.includes("Hausarbeit")?g.hausarbeit_value:null,a[3].data[v]=null!==(p=g.aktivitaeten_names_checkboxes)&&void 0!==p&&p.includes("Entspannung")?g.entspannung_value:null)}e.aktivitaetenOptions.series=e.removeEmptySeries(a),e.aktivitaetenChart.setOption(e.aktivitaetenOptions)})()}removeEmptySeries(e){return e.filter(n=>void 0!==n.data.find(a=>null!==a&&"null"!==a))}reloadSymptome(){var e=this;return(0,C.Z)(function*(){let n=e.dates(e.numberOfDays),o=yield e.databaseCrudService.getSymptomeListAndIdDate(n[0],e.addDays(n[n.length-1],1)),a=[e.createLine("symptome-erfassen-page.husten","green"),e.createLine("symptome-erfassen-page.fieber","blue"),e.createLine("symptome-erfassen-page.fatigue","orange"),e.createLine("symptome-erfassen-page.kurzatmigkeit","purple"),e.createLine("symptome-erfassen-page.brustschmerzen","pink"),e.createLine("symptome-erfassen-page.kopfschmerzen","red"),e.createLine("symptome-erfassen-page.geschmacksverlust","black"),e.createLine("symptome-erfassen-page.neurologische-st\xf6rung","cyan"),e.createLine("symptome-erfassen-page.muskelschmerzen","pink"),e.createLine("symptome-erfassen-page.hautausschlag","brown"),e.createLine("symptome-erfassen-page.missempfindungen","beige"),e.createLine("symptome-erfassen-page.schwindel","gray"),e.createLine("symptome-erfassen-page.gedaechtniseinschraenkungen","#abdbe3"),e.createLine("symptome-erfassen-page.leseeinschraenkungen","#063970")];for(const i of o.values){let J=new Date(i.date),c=n.findIndex(z=>{const A=z.toLocaleDateString()===J.toLocaleDateString();return A&&console.log("dashboard found date",z.toLocaleDateString(),JSON.stringify(i)),A});var d,h,l,p,g,x,v,b,P,M,D,w,S,I;-1!==c&&(a[0].data[c]=null!==(d=i.symptom_names_checkboxes)&&void 0!==d&&d.includes("Husten")?i.husten_value:void 0,a[1].data[c]=null!==(h=i.symptom_names_checkboxes)&&void 0!==h&&h.includes("Fieber")?i.fieber_value:void 0,a[2].data[c]=null!==(l=i.symptom_names_checkboxes)&&void 0!==l&&l.includes("Fatigue")?i.fatigue_value:void 0,a[3].data[c]=null!==(p=i.symptom_names_checkboxes)&&void 0!==p&&p.includes("Kurzatmigkeit")?i.kurzatmigkeit_value:void 0,a[4].data[c]=null!==(g=i.symptom_names_checkboxes)&&void 0!==g&&g.includes("Brustschmerzen")?i.brustschmerzen_value:void 0,a[5].data[c]=null!==(x=i.symptom_names_checkboxes)&&void 0!==x&&x.includes("Kopfschmerzen")?i.kopfschmerzen_value:void 0,a[6].data[c]=null!==(v=i.symptom_names_checkboxes)&&void 0!==v&&v.includes("Geschmacksverlust")?i.geschmacksverlust_value:void 0,a[7].data[c]=null!==(b=i.symptom_names_checkboxes)&&void 0!==b&&b.includes("Neurologische")?i.neurologische_stoerung_value:void 0,a[8].data[c]=null!==(P=i.symptom_names_checkboxes)&&void 0!==P&&P.includes("Muskelschmerzen")?i.muskelschmerzen_value:void 0,a[9].data[c]=null!==(M=i.symptom_names_checkboxes)&&void 0!==M&&M.includes("Hautausschlag")?i.hautausschlag_value:void 0,a[10].data[c]=null!==(D=i.symptom_names_checkboxes)&&void 0!==D&&D.includes("Missempfindungen")?i.missempfindungen_value:void 0,a[11].data[c]=null!==(w=i.symptom_names_checkboxes)&&void 0!==w&&w.includes("Schwindel")?i.schwindel_value:void 0,a[12].data[c]=null!==(S=i.symptom_names_checkboxes)&&void 0!==S&&S.includes("Gedaechtniseinschraenkungen")?i.gedaechtniseinschraenkungen_value:void 0,a[13].data[c]=null!==(I=i.symptom_names_checkboxes)&&void 0!==I&&I.includes("Leseeinschraenkungen")?i.leseeinschraenkungen_value:void 0)}e.symptomeOptions.series=e.removeEmptySeries(a),e.symptomeChart.setOption(e.symptomeOptions)})()}reload(){var e=this;return(0,C.Z)(function*(){yield e.reloadTagesForm(),yield e.reloadAktivitaeten(),yield e.reloadSymptome()})()}ngOnDestroy(){var e;this.dailySteps=null,this.dailyStages=null,this.dailyDistance=null,this.dailyHeartRate=null,this.lineChart=null,null===(e=this.routerSubscription)||void 0===e||e.unsubscribe(),this.isAuthorized$.next(!1)}ngOnInit(){var e=this;return(0,C.Z)(function*(){console.debug("dashboard ngOnInit"),e.isAuthorized$.next(yield e.healthDataService.isAuthorized()),console.debug("dashboard tagesformChart"),e.tagesformChart=y.init(e.tagesformRef.nativeElement),console.debug("dashboard symptomeChart"),e.symptomeChart=y.init(e.symptomeRef.nativeElement),console.debug("dashboard aktivitaetenChart"),e.aktivitaetenChart=y.init(e.aktivitaetenRef.nativeElement),console.debug("dashboard call reload()"),e.reload(),e.routerSubscription=e.router.events.subscribe(n=>{n instanceof m.m2&&n.url.includes("dashboard")&&e.reload()})})()}}return s.\u0275fac=function(e){return new(e||s)(t.\u0275\u0275directiveInject(O.sK),t.\u0275\u0275directiveInject(t.ChangeDetectorRef),t.\u0275\u0275directiveInject(j.G),t.\u0275\u0275directiveInject(m.gz),t.\u0275\u0275directiveInject(F.x0),t.\u0275\u0275directiveInject(T.y),t.\u0275\u0275directiveInject(m.F0))},s.\u0275cmp=t.\u0275\u0275defineComponent({type:s,selectors:[["app-dashboard"]],viewQuery:function(e,n){if(1&e&&(t.\u0275\u0275viewQuery(Q,5),t.\u0275\u0275viewQuery(B,5),t.\u0275\u0275viewQuery(N,5),t.\u0275\u0275viewQuery(G,5)),2&e){let o;t.\u0275\u0275queryRefresh(o=t.\u0275\u0275loadQuery())&&(n.tagesformRef=o.first),t.\u0275\u0275queryRefresh(o=t.\u0275\u0275loadQuery())&&(n.symptomeRef=o.first),t.\u0275\u0275queryRefresh(o=t.\u0275\u0275loadQuery())&&(n.aktivitaetenRef=o.first),t.\u0275\u0275queryRefresh(o=t.\u0275\u0275loadQuery())&&(n.lineCanvas=o.first)}},decls:40,vars:15,consts:[["id","ion-logo","slot","start","src","/assets/images/patient-strength_logo.png",1,"ml-2"],["slot","start","class","ion-padding-right-0",4,"ngIf"],["slot","start",4,"ngIf"],["pager","true",1,"charts",3,"options"],["size","12"],["echarts","",1,"demo-chart",3,"options"],["symptomeChart",""],["tagesformChart",""],["aktivitaetenChart",""],["slot","start",1,"ion-padding-right-0"],["slot","start"]],template:function(e,n){1&e&&(t.\u0275\u0275elementStart(0,"ion-header")(1,"ion-toolbar"),t.\u0275\u0275element(2,"ion-img",0),t.\u0275\u0275template(3,H,3,3,"ion-title",1),t.\u0275\u0275template(4,Z,3,3,"ion-title",2),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(5,"ion-content")(6,"ion-slides",3)(7,"ion-slide")(8,"ion-grid")(9,"ion-row")(10,"ion-title"),t.\u0275\u0275text(11),t.\u0275\u0275pipe(12,"translate"),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(13,"ion-row")(14,"ion-col",4)(15,"div"),t.\u0275\u0275element(16,"div",5,6),t.\u0275\u0275elementEnd()()()()(),t.\u0275\u0275elementStart(18,"ion-slide")(19,"ion-grid")(20,"ion-row")(21,"ion-title"),t.\u0275\u0275text(22),t.\u0275\u0275pipe(23,"translate"),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(24,"ion-row")(25,"ion-col",4)(26,"div"),t.\u0275\u0275element(27,"div",5,7),t.\u0275\u0275elementEnd()()()()(),t.\u0275\u0275elementStart(29,"ion-slide")(30,"ion-grid")(31,"ion-row")(32,"ion-title"),t.\u0275\u0275text(33),t.\u0275\u0275pipe(34,"translate"),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(35,"ion-row")(36,"ion-col",4)(37,"div"),t.\u0275\u0275element(38,"div",5,8),t.\u0275\u0275elementEnd()()()()()()()),2&e&&(t.\u0275\u0275advance(3),t.\u0275\u0275property("ngIf","Android"===n.deviceInfo.os),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf","iOS"===n.deviceInfo.os||"Windows"===n.deviceInfo.os),t.\u0275\u0275advance(2),t.\u0275\u0275property("options",n.slideOpts),t.\u0275\u0275advance(5),t.\u0275\u0275textInterpolate(t.\u0275\u0275pipeBind1(12,9,"symptome")),t.\u0275\u0275advance(5),t.\u0275\u0275property("options",n.symptomeOptions),t.\u0275\u0275advance(6),t.\u0275\u0275textInterpolate(t.\u0275\u0275pipeBind1(23,11,"tagesform")),t.\u0275\u0275advance(5),t.\u0275\u0275property("options",n.tagesformOptions),t.\u0275\u0275advance(6),t.\u0275\u0275textInterpolate(t.\u0275\u0275pipeBind1(34,13,"aktivitaet")),t.\u0275\u0275advance(5),t.\u0275\u0275property("options",n.aktivitaetenOptions))},dependencies:[L.NgIf,u.IonCol,u.IonContent,u.IonGrid,u.IonHeader,u.IonImg,u.IonRow,u.IonSlide,u.IonSlides,u.IonTitle,u.IonToolbar,_._w,O.X$],styles:["ion-slides[_ngcontent-%COMP%]{height:100%;background-color:#fff}.demo-chart[_ngcontent-%COMP%]{height:500px}.heart-rate[_ngcontent-%COMP%], .daily-goals[_ngcontent-%COMP%]{padding:0 10px 16px}.no-data[_ngcontent-%COMP%]{min-height:85vh}.no-data[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{display:flex;justify-content:space-between;flex-direction:row;width:90vw;margin:20px auto 0;letter-spacing:0!important;font-size:10px;box-shadow:0 0 10px #0000004d;border-radius:10px}.no-data[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%]{margin:0;padding:0;width:30px;height:30px}.no-data[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%}.no-data[_ngcontent-%COMP%]   .button-content[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:space-between;flex-direction:row;align-items:center}.no-data[_ngcontent-%COMP%]   .button-content[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:18px}.no-data[_ngcontent-%COMP%]   .button-content-left[_ngcontent-%COMP%]{width:100%;display:flex;align-items:center}.no-data[_ngcontent-%COMP%]   .button-content-left[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%]{margin-right:14px}.heart-rate[_ngcontent-%COMP%], .daily-goals[_ngcontent-%COMP%]{padding:15px}.heart-rate[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%], .daily-goals[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%]{width:40px;height:40px;margin:0}.heart-rate[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .daily-goals[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%}.heart-rate[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex}.heart-rate[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:auto 0;font-size:20px}.heart-rate[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%]{margin:0 15px 0 0;padding:0}.daily-goals[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:space-between}.daily-goals[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{width:100%}.daily-goals-item[_ngcontent-%COMP%]{width:48%;display:flex;flex-wrap:wrap;align-items:stretch;box-shadow:0 0 5px #696969;border-radius:10px;margin:10px 0}.daily-goals-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{width:62%;font-size:15px;margin:auto 0 auto 2px}.daily-goals-item[_ngcontent-%COMP%]   .daily-goals-bar[_ngcontent-%COMP%]{width:100%;padding:8px 0;border-radius:0 0 10px 10px}.daily-goals-item[_ngcontent-%COMP%]   .daily-goals-bar-text[_ngcontent-%COMP%]{color:#fff;width:100%;font-size:14px;text-align:center;margin:0}@media (min-width: 360px){.no-data[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{font-size:13px}.daily-goals-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:17px;margin:auto 0 auto 15px}}@media (min-width: 430px){.no-data[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{font-size:15px}.no-data[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%]{width:40px;height:40px}.daily-goals-item[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%]{margin:5px 0 5px 10px}.daily-goals-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:18px;margin:auto 0 auto 18px}}.heart-colors-legend[_ngcontent-%COMP%]{display:flex;margin:0 7px;justify-content:space-between}.heart-colors-legend-green[_ngcontent-%COMP%]{color:#779c6a}.heart-colors-legend-yellow[_ngcontent-%COMP%]{color:#e3aa39}.heart-colors-legend-red[_ngcontent-%COMP%]{color:#db5252}.heart-colors-legend[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{margin-right:8px}.heart-legend[_ngcontent-%COMP%]{margin-top:20px;color:gray}"]}),s})()}];let V=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=t.\u0275\u0275defineNgModule({type:s}),s.\u0275inj=t.\u0275\u0275defineInjector({imports:[m.Bz.forChild(K),m.Bz]}),s})(),X=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=t.\u0275\u0275defineNgModule({type:s}),s.\u0275inj=t.\u0275\u0275defineInjector({imports:[L.CommonModule,R.FormsModule,u.IonicModule,O.aw,V,_.Ns.forChild()]}),s})()}}]);
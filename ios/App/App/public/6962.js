"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6962],{6962:(f,m,i)=>{i.r(m),i.d(m,{MorePageModule:()=>l});var s=i(6895),p=i(4006),n=i(4881),r=i(2905),e=i(6738),u=i(3795),g=i(8490);function v(t,o){1&t&&(e.\u0275\u0275elementStart(0,"ion-title",12),e.\u0275\u0275text(1),e.\u0275\u0275pipe(2,"translate"),e.\u0275\u0275elementEnd()),2&t&&(e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(2,1,"more")))}function I(t,o){1&t&&(e.\u0275\u0275elementStart(0,"ion-title",13),e.\u0275\u0275text(1),e.\u0275\u0275pipe(2,"translate"),e.\u0275\u0275elementEnd()),2&t&&(e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(2,1,"more")))}function M(t,o){1&t&&e.\u0275\u0275element(0,"ion-icon",14)}function h(t,o){1&t&&e.\u0275\u0275element(0,"ion-icon",14)}function P(t,o){1&t&&e.\u0275\u0275element(0,"ion-icon",14)}class c{constructor(o){this.deviceService=o,this.deviceInfo=null,this.deviceInfo=this.deviceService.getDeviceInfo()}}c.\u0275fac=function(o){return new(o||c)(e.\u0275\u0275directiveInject(u.x0))},c.\u0275cmp=e.\u0275\u0275defineComponent({type:c,selectors:[["app-more"]],decls:28,vars:14,consts:[["id","ion-logo","slot","start","src","/assets/images/patient-strength_logo.png",1,"ml-2"],["class","ion-padding-right-0","mode","ios",4,"ngIf"],["mode","ios",4,"ngIf"],[1,"more-content"],["button","","routerLink","/knowledge"],["slot","start","size","large","name","book-outline",1,"icon-left"],[1,"nav-option"],["class","icon-right","slot","end","size","large","name","chevron-forward-outline",4,"ngIf"],["button","","routerLink","/einstellungen"],["slot","start","size","large","name","settings-sharp",1,"icon-left"],["button","","routerLink","/impressum"],["slot","start","size","large","name","information-circle-outline",1,"icon-left"],["mode","ios",1,"ion-padding-right-0"],["mode","ios"],["slot","end","size","large","name","chevron-forward-outline",1,"icon-right"]],template:function(o,d){1&o&&(e.\u0275\u0275elementStart(0,"ion-header")(1,"ion-toolbar"),e.\u0275\u0275element(2,"ion-img",0),e.\u0275\u0275template(3,v,3,3,"ion-title",1),e.\u0275\u0275template(4,I,3,3,"ion-title",2),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(5,"ion-content",3)(6,"ion-nav")(7,"ion-item",4),e.\u0275\u0275element(8,"ion-icon",5),e.\u0275\u0275elementStart(9,"ion-label")(10,"p",6),e.\u0275\u0275text(11),e.\u0275\u0275pipe(12,"translate"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275template(13,M,1,0,"ion-icon",7),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(14,"ion-item",8),e.\u0275\u0275element(15,"ion-icon",9),e.\u0275\u0275elementStart(16,"ion-label")(17,"p",6),e.\u0275\u0275text(18),e.\u0275\u0275pipe(19,"translate"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275template(20,h,1,0,"ion-icon",7),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(21,"ion-item",10),e.\u0275\u0275element(22,"ion-icon",11),e.\u0275\u0275elementStart(23,"ion-label")(24,"p",6),e.\u0275\u0275text(25),e.\u0275\u0275pipe(26,"translate"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275template(27,P,1,0,"ion-icon",7),e.\u0275\u0275elementEnd()()()),2&o&&(e.\u0275\u0275advance(3),e.\u0275\u0275property("ngIf","Android"===d.deviceInfo.os),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf","iOS"===d.deviceInfo.os),e.\u0275\u0275advance(7),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(12,8,"wissen")),e.\u0275\u0275advance(2),e.\u0275\u0275property("ngIf","iOS"!==d.deviceInfo.os),e.\u0275\u0275advance(5),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(19,10,"einstellungen.titel")),e.\u0275\u0275advance(2),e.\u0275\u0275property("ngIf","iOS"!==d.deviceInfo.os),e.\u0275\u0275advance(5),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(26,12,"impressum-page.info")),e.\u0275\u0275advance(2),e.\u0275\u0275property("ngIf","iOS"!==d.deviceInfo.os))},dependencies:[s.NgIf,n.IonContent,n.IonHeader,n.IonIcon,n.IonImg,n.IonItem,n.IonLabel,n.IonNav,n.IonTitle,n.IonToolbar,n.NavDelegate,n.RouterLinkDelegate,r.rH,g.X$],styles:[".more-content[_ngcontent-%COMP%]{background:transparent!important}.icon-left[_ngcontent-%COMP%]{color:#63c2de}.icon-right[_ngcontent-%COMP%]{color:#d0d0d0}ion-item[_ngcontent-%COMP%]{--min-height: 4.5rem}.nav-option[_ngcontent-%COMP%]{font-family:Nunito;font-weight:700;color:#333;font-size:1.2rem}"]});const S=[{path:"",component:c}];class a{}a.\u0275fac=function(o){return new(o||a)},a.\u0275mod=e.\u0275\u0275defineNgModule({type:a}),a.\u0275inj=e.\u0275\u0275defineInjector({imports:[r.Bz.forChild(S),r.Bz]});var y=i(1511);class l{}l.\u0275fac=function(o){return new(o||l)},l.\u0275mod=e.\u0275\u0275defineNgModule({type:l}),l.\u0275inj=e.\u0275\u0275defineInjector({imports:[s.CommonModule,p.FormsModule,n.IonicModule,y.m,g.aw,a]})},1511:(f,m,i)=>{i.d(m,{m:()=>n});var s=i(6895),p=i(6738);class n{}n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=p.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=p.\u0275\u0275defineInjector({imports:[s.CommonModule]})}}]);
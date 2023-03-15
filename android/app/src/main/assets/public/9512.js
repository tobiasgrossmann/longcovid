"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9512],{9512:(x,f,a)=>{a.r(f),a.d(f,{EssenErfassenPageModule:()=>p});var E=a(6895),i=a(4006),n=a(4881),m=a(2905),I=a(5861),e=a(6738),S=a(636),C=a(4323),B=a(535),V=a(1618),b=a(8490);function k(s,t){if(1&s&&(e.\u0275\u0275elementStart(0,"form",5)(1,"ion-card",6)(2,"ion-card-header"),e.\u0275\u0275element(3,"ion-img",7),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(4,"ion-card-content")(5,"ion-card-title",6),e.\u0275\u0275text(6),e.\u0275\u0275pipe(7,"translate"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(8,"ion-textarea",8),e.\u0275\u0275pipe(9,"translate"),e.\u0275\u0275elementStart(10,"ion-card-title",9),e.\u0275\u0275text(11),e.\u0275\u0275pipe(12,"translate"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(13,"ion-textarea",10),e.\u0275\u0275pipe(14,"translate"),e.\u0275\u0275elementStart(15,"ion-card-title",9),e.\u0275\u0275text(16),e.\u0275\u0275pipe(17,"translate"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(18,"ion-textarea",11),e.\u0275\u0275pipe(19,"translate"),e.\u0275\u0275elementStart(20,"ion-card-title",9),e.\u0275\u0275text(21),e.\u0275\u0275pipe(22,"translate"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(23,"ion-textarea",12),e.\u0275\u0275pipe(24,"translate"),e.\u0275\u0275elementEnd()()()),2&s){const o=e.\u0275\u0275nextContext();e.\u0275\u0275property("formGroup",o.form),e.\u0275\u0275advance(6),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(7,9,"vormittag")),e.\u0275\u0275advance(2),e.\u0275\u0275propertyInterpolate("placeholder",e.\u0275\u0275pipeBind1(9,11,"essen-erfassen-page.textarea-placeholder")),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(12,13,"mittag")),e.\u0275\u0275advance(2),e.\u0275\u0275propertyInterpolate("placeholder",e.\u0275\u0275pipeBind1(14,15,"essen-erfassen-page.textarea-placeholder")),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(17,17,"abend")),e.\u0275\u0275advance(2),e.\u0275\u0275propertyInterpolate("placeholder",e.\u0275\u0275pipeBind1(19,19,"essen-erfassen-page.textarea-placeholder")),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(22,21,"medikamente")),e.\u0275\u0275advance(2),e.\u0275\u0275propertyInterpolate("placeholder",e.\u0275\u0275pipeBind1(24,23,"essen-erfassen-page.medikamente-placeholder"))}}function M(s,t){if(1&s){const o=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"ion-button",13),e.\u0275\u0275listener("click",function(){e.\u0275\u0275restoreView(o);const r=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(r.onSubmit())}),e.\u0275\u0275elementStart(1,"ion-text",14),e.\u0275\u0275text(2),e.\u0275\u0275pipe(3,"translate"),e.\u0275\u0275elementEnd()()}2&s&&(e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(3,1,"essen-erfassen-page.essen-speichern")))}class u{constructor(t,o,l,r,d,v,h,g){this.fb=t,this.sqliteService=o,this.detailService=l,this.databaseCrudService=r,this.activatedRoute=d,this.router=v,this.toastService=h,this.translateService=g,this.essen=[],this.vormittagEssen="",this.mittagEssen="",this.abendEssen="",this.medikamenteValue="",this.tagId=this.activatedRoute.snapshot.params.tagId}ngOnInit(){this.form=this.fb.group({vormittag:[""],mittag:[""],abend:[""],medikamente:[""]})}ngAfterViewInit(){var t=this;return(0,I.Z)(function*(){yield t.loadEssen()})()}loadEssen(){this.databaseCrudService.getEssenListbyTagId(this.tagId).then(t=>{var o,l,r,d,v,h,g,y;return t&&Array.isArray(t.values)&&null!==(o=t.values[0])&&void 0!==o&&o.vormittag&&(this.vormittagEssen=null===(v=t.values[0])||void 0===v?void 0:v.vormittag,console.log(this.vormittagEssen),this.form.patchValue({vormittag:this.vormittagEssen})),t&&Array.isArray(t.values)&&null!==(l=t.values[0])&&void 0!==l&&l.mittag&&(this.mittagEssen=null===(h=t.values[0])||void 0===h?void 0:h.mittag,console.log(this.mittagEssen),this.form.patchValue({mittag:this.mittagEssen})),t&&Array.isArray(t.values)&&null!==(r=t.values[0])&&void 0!==r&&r.abend&&(this.abendEssen=null===(g=t.values[0])||void 0===g?void 0:g.abend,console.log(this.abendEssen),this.form.patchValue({abend:this.abendEssen})),t&&Array.isArray(t.values)&&null!==(d=t.values[0])&&void 0!==d&&d.medikamenteValue&&(this.medikamenteValue=null===(y=t.values[0])||void 0===y?void 0:y.medikamenteValue,console.log(this.medikamenteValue),this.form.patchValue({medikamente:this.medikamenteValue})),this.vormittagEssen&&this.mittagEssen&&this.abendEssen&&this.medikamenteValue}).catch(t=>{console.log(t),this.toastService.showErrorToast(this.translateService.instant("essen-erfassen-page.error"))})}updateEssen(){console.log(this.form.value.vormittag),console.log(this.form.value.mittag),console.log(this.form.value.abend),console.log(this.form.value.medikamente),this.databaseCrudService.updateEssenNames(this.tagId,this.form.value.vormittag,this.form.value.mittag,this.form.value.abend,this.form.value.medikamente).then(t=>{var o,l,r,d;t.values&&(this.vormittagEssen=null===(o=t.values[0])||void 0===o?void 0:o.vormittag,this.mittagEssen=null===(l=t.values[0])||void 0===l?void 0:l.mittag,this.abendEssen=null===(r=t.values[0])||void 0===r?void 0:r.abend,this.medikamenteValue=null===(d=t.values[0])||void 0===d?void 0:d.medikamenteValue,this.form.patchValue({vormittag:this.vormittagEssen,mittag:this.mittagEssen,abend:this.abendEssen,medikamente:this.medikamenteValue})),this.toastService.showSuccessToast(this.translateService.instant("essen-erfassen-page.success"))}).catch(t=>{console.log(t),this.toastService.showErrorToast(this.translateService.instant("essen-erfassen-page.error"))})}onSubmit(){var t=this;return(0,I.Z)(function*(){yield t.updateEssen(),yield t.loadEssen(),yield t.router.navigateByUrl("/tabs/tagebuch-timeline")})()}}u.\u0275fac=function(t){return new(t||u)(e.\u0275\u0275directiveInject(i.UntypedFormBuilder),e.\u0275\u0275directiveInject(S.Y),e.\u0275\u0275directiveInject(C.X),e.\u0275\u0275directiveInject(B.y),e.\u0275\u0275directiveInject(m.gz),e.\u0275\u0275directiveInject(m.F0),e.\u0275\u0275directiveInject(V.L),e.\u0275\u0275directiveInject(b.sK))},u.\u0275cmp=e.\u0275\u0275defineComponent({type:u,selectors:[["app-essen-erfassen"]],decls:13,vars:5,consts:[["slot","start"],[1,"vh-82"],[3,"formGroup",4,"ngIf"],[1,"ion-no-border"],["class","m-0 p-0 h-3 w-100 opacity-80","color","primary","expand","block","fill","clear","size","default",3,"click",4,"ngIf"],[3,"formGroup"],[1,"ion-flex-grow-1"],["src","assets/images/Lunch_break_Flatline.svg",1,"vh-25"],["formControlName","vormittag","id","vormittagEssen","required","","type","text",1,"w-100","ion-border","mb-2",3,"placeholder"],[1,"w-100"],["formControlName","mittag","id","mittagEssen","required","","type","text",1,"w-100","ion-border","mb-2",3,"placeholder"],["formControlName","abend","id","abendEssen","required","","type","text",1,"w-100","ion-border","mb-2",3,"placeholder"],["formControlName","medikamente","id","medikamente","required","","type","text",1,"w-100","ion-border","mb-2",3,"placeholder"],["color","primary","expand","block","fill","clear","size","default",1,"m-0","p-0","h-3","w-100","opacity-80",3,"click"],[1,"small","pt-button-text"]],template:function(t,o){1&t&&(e.\u0275\u0275elementStart(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),e.\u0275\u0275element(3,"ion-back-button"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(4,"ion-title"),e.\u0275\u0275text(5),e.\u0275\u0275pipe(6,"translate"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(7,"ion-content",1),e.\u0275\u0275template(8,k,25,25,"form",2),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(9,"ion-footer",3)(10,"ion-row")(11,"ion-col"),e.\u0275\u0275template(12,M,4,3,"ion-button",4),e.\u0275\u0275elementEnd()()()),2&t&&(e.\u0275\u0275advance(5),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(6,3,"essen-erfassen")),e.\u0275\u0275advance(3),e.\u0275\u0275property("ngIf",o.form),e.\u0275\u0275advance(4),e.\u0275\u0275property("ngIf",o.form))},dependencies:[E.NgIf,i.\u0275NgNoValidate,i.NgControlStatus,i.NgControlStatusGroup,i.RequiredValidator,i.FormGroupDirective,i.FormControlName,n.IonBackButton,n.IonButton,n.IonButtons,n.IonCard,n.IonCardContent,n.IonCardHeader,n.IonCardTitle,n.IonCol,n.IonContent,n.IonFooter,n.IonHeader,n.IonImg,n.IonRow,n.IonText,n.IonTextarea,n.IonTitle,n.IonToolbar,n.TextValueAccessor,n.IonBackButtonDelegate,b.X$]});const T=[{path:"",component:u}];class c{}c.\u0275fac=function(t){return new(t||c)},c.\u0275mod=e.\u0275\u0275defineNgModule({type:c}),c.\u0275inj=e.\u0275\u0275defineInjector({imports:[m.Bz.forChild(T),m.Bz]});var P=a(1511);class p{}p.\u0275fac=function(t){return new(t||p)},p.\u0275mod=e.\u0275\u0275defineNgModule({type:p}),p.\u0275inj=e.\u0275\u0275defineInjector({imports:[E.CommonModule,i.FormsModule,i.ReactiveFormsModule,n.IonicModule,c,b.aw,P.m]})},1511:(x,f,a)=>{a.d(f,{m:()=>n});var E=a(6895),i=a(6738);class n{}n.\u0275fac=function(I){return new(I||n)},n.\u0275mod=i.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=i.\u0275\u0275defineInjector({imports:[E.CommonModule]})}}]);
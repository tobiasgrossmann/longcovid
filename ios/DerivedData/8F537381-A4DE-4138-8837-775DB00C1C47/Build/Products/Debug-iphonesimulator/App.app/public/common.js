"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8592],{6408:(D,p,a)=>{a.d(p,{m:()=>m});const m=(0,a(7423).fo)("Share",{web:()=>a.e(7907).then(a.bind(a,7907)).then(i=>new i.ShareWeb)})},1320:(D,p,a)=>{a.d(p,{c:()=>l});var s=a(1308),m=a(7864),i=a(1898);const l=(t,r)=>{let c,e;const f=(u,d,h)=>{if(typeof document>"u")return;const _=document.elementFromPoint(u,d);_&&r(_)?_!==c&&(v(),n(_,h)):v()},n=(u,d)=>{c=u,e||(e=c);const h=c;(0,s.c)(()=>h.classList.add("ion-activated")),d()},v=(u=!1)=>{if(!c)return;const d=c;(0,s.c)(()=>d.classList.remove("ion-activated")),u&&e!==c&&c.click(),c=void 0};return(0,i.createGesture)({el:t,gestureName:"buttonActiveDrag",threshold:0,onStart:u=>f(u.currentX,u.currentY,m.a),onMove:u=>f(u.currentX,u.currentY,m.b),onEnd:()=>{v(!0),(0,m.h)(),e=void 0}})}},5062:(D,p,a)=>{a.d(p,{i:()=>s});const s=m=>m&&""!==m.dir?"rtl"===m.dir.toLowerCase():"rtl"===(null==document?void 0:document.dir.toLowerCase())},6602:(D,p,a)=>{a.r(p),a.d(p,{startFocusVisible:()=>l});const s="ion-focused",i=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],l=t=>{let r=[],c=!0;const e=t?t.shadowRoot:document,f=t||document.body,n=y=>{r.forEach(g=>g.classList.remove(s)),y.forEach(g=>g.classList.add(s)),r=y},v=()=>{c=!1,n([])},u=y=>{c=i.includes(y.key),c||n([])},d=y=>{if(c&&void 0!==y.composedPath){const g=y.composedPath().filter(w=>!!w.classList&&w.classList.contains("ion-focusable"));n(g)}},h=()=>{e.activeElement===f&&n([])};return e.addEventListener("keydown",u),e.addEventListener("focusin",d),e.addEventListener("focusout",h),e.addEventListener("touchstart",v),e.addEventListener("mousedown",v),{destroy:()=>{e.removeEventListener("keydown",u),e.removeEventListener("focusin",d),e.removeEventListener("focusout",h),e.removeEventListener("touchstart",v),e.removeEventListener("mousedown",v)},setFocus:n}}},7626:(D,p,a)=>{a.d(p,{C:()=>t,a:()=>i,d:()=>l});var s=a(5861),m=a(5730);const i=function(){var r=(0,s.Z)(function*(c,e,f,n,v,u){var d;if(c)return c.attachViewToDom(e,f,v,n);if(!(u||"string"==typeof f||f instanceof HTMLElement))throw new Error("framework delegate is missing");const h="string"==typeof f?null===(d=e.ownerDocument)||void 0===d?void 0:d.createElement(f):f;return n&&n.forEach(_=>h.classList.add(_)),v&&Object.assign(h,v),e.appendChild(h),yield new Promise(_=>(0,m.c)(h,_)),h});return function(e,f,n,v,u,d){return r.apply(this,arguments)}}(),l=(r,c)=>{if(c){if(r)return r.removeViewFromDom(c.parentElement,c);c.remove()}return Promise.resolve()},t=()=>{let r,c;return{attachViewToDom:function(){var n=(0,s.Z)(function*(v,u,d={},h=[]){var _,y;if(r=v,u){const w="string"==typeof u?null===(_=r.ownerDocument)||void 0===_?void 0:_.createElement(u):u;h.forEach(o=>w.classList.add(o)),Object.assign(w,d),r.appendChild(w),yield new Promise(o=>(0,m.c)(w,o))}else if(r.children.length>0&&!r.children[0].classList.contains("ion-delegate-host")){const o=null===(y=r.ownerDocument)||void 0===y?void 0:y.createElement("div");o.classList.add("ion-delegate-host"),h.forEach(E=>o.classList.add(E)),o.append(...r.children),r.appendChild(o)}const g=document.querySelector("ion-app")||document.body;return c=document.createComment("ionic teleport"),r.parentNode.insertBefore(c,r),g.appendChild(r),r});return function(u,d){return n.apply(this,arguments)}}(),removeViewFromDom:()=>(r&&c&&(c.parentNode.insertBefore(r,c),c.remove()),Promise.resolve())}}},7864:(D,p,a)=>{a.d(p,{a:()=>l,b:()=>t,c:()=>i,d:()=>c,h:()=>r});const s={getEngine(){var e;const f=window;return f.TapticEngine||(null===(e=f.Capacitor)||void 0===e?void 0:e.isPluginAvailable("Haptics"))&&f.Capacitor.Plugins.Haptics},available(){var e;const f=window;return!!this.getEngine()&&("web"!==(null===(e=f.Capacitor)||void 0===e?void 0:e.getPlatform())||typeof navigator<"u"&&void 0!==navigator.vibrate)},isCordova:()=>!!window.TapticEngine,isCapacitor:()=>!!window.Capacitor,impact(e){const f=this.getEngine();if(!f)return;const n=this.isCapacitor()?e.style.toUpperCase():e.style;f.impact({style:n})},notification(e){const f=this.getEngine();if(!f)return;const n=this.isCapacitor()?e.style.toUpperCase():e.style;f.notification({style:n})},selection(){this.impact({style:"light"})},selectionStart(){const e=this.getEngine();e&&(this.isCapacitor()?e.selectionStart():e.gestureSelectionStart())},selectionChanged(){const e=this.getEngine();e&&(this.isCapacitor()?e.selectionChanged():e.gestureSelectionChanged())},selectionEnd(){const e=this.getEngine();e&&(this.isCapacitor()?e.selectionEnd():e.gestureSelectionEnd())}},m=()=>s.available(),i=()=>{m()&&s.selection()},l=()=>{m()&&s.selectionStart()},t=()=>{m()&&s.selectionChanged()},r=()=>{m()&&s.selectionEnd()},c=e=>{m()&&s.impact(e)}},109:(D,p,a)=>{a.d(p,{a:()=>s,b:()=>u,c:()=>c,d:()=>d,e:()=>O,f:()=>r,g:()=>h,h:()=>i,i:()=>m,j:()=>o,k:()=>E,l:()=>e,m:()=>n,n:()=>_,o:()=>f,p:()=>t,q:()=>l,r:()=>w,s:()=>M,t:()=>v,u:()=>y,v:()=>g});const s="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-miterlimit='10' stroke-width='48' d='M244 400L100 256l144-144M120 256h292' class='ionicon-fill-none'/></svg>",m="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 268l144 144 144-144M256 392V100' class='ionicon-fill-none'/></svg>",i="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M368 64L144 256l224 192V64z'/></svg>",l="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 144l192 224 192-224H64z'/></svg>",t="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M448 368L256 144 64 368h384z'/></svg>",r="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M416 128L192 384l-96-96' class='ionicon-fill-none ionicon-stroke-width'/></svg>",c="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144' class='ionicon-fill-none'/></svg>",e="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' class='ionicon-fill-none'/></svg>",f="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",n="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",v="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'/></svg>",u="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z'/></svg>",d="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z'/></svg>",h="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='192' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>",_="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='48'/><circle cx='416' cy='256' r='48'/><circle cx='96' cy='256' r='48'/></svg>",y="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-miterlimit='10' d='M80 160h352M80 256h352M80 352h352' class='ionicon-fill-none ionicon-stroke-width'/></svg>",g="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z'/></svg>",w="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M400 256H112' class='ionicon-fill-none ionicon-stroke-width'/></svg>",o="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M96 256h320M96 176h320M96 336h320' class='ionicon-fill-none ionicon-stroke-width'/></svg>",E="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-linejoin='round' stroke-width='44' d='M118 304h276M118 208h276' class='ionicon-fill-none'/></svg>",M="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><path stroke-linecap='round' stroke-miterlimit='10' d='M338.29 338.29L448 448' class='ionicon-fill-none ionicon-stroke-width'/></svg>",O="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z'/></svg>"},8416:(D,p,a)=>{a.d(p,{I:()=>t,a:()=>n,b:()=>r,c:()=>d,d:()=>_,f:()=>v,g:()=>f,i:()=>e,p:()=>h,r:()=>y,s:()=>u});var s=a(5861),m=a(5730),i=a(1192);const t="ion-content",r=".ion-content-scroll-host",c=`${t}, ${r}`,e=g=>"ION-CONTENT"===g.tagName,f=function(){var g=(0,s.Z)(function*(w){return e(w)?(yield new Promise(o=>(0,m.c)(w,o)),w.getScrollElement()):w});return function(o){return g.apply(this,arguments)}}(),n=g=>g.querySelector(r)||g.querySelector(c),v=g=>g.closest(c),u=(g,w)=>e(g)?g.scrollToTop(w):Promise.resolve(g.scrollTo({top:0,left:0,behavior:w>0?"smooth":"auto"})),d=(g,w,o,E)=>e(g)?g.scrollByPoint(w,o,E):Promise.resolve(g.scrollBy({top:o,left:w,behavior:E>0?"smooth":"auto"})),h=g=>(0,i.a)(g,t),_=g=>{if(e(g)){const o=g.scrollY;return g.scrollY=!1,o}return g.style.setProperty("overflow","hidden"),!0},y=(g,w)=>{e(g)?g.scrollY=w:g.style.removeProperty("overflow")}},5234:(D,p,a)=>{a.r(p),a.d(p,{KEYBOARD_DID_CLOSE:()=>m,KEYBOARD_DID_OPEN:()=>s,copyVisualViewport:()=>w,keyboardDidClose:()=>h,keyboardDidOpen:()=>u,keyboardDidResize:()=>d,resetKeyboardAssist:()=>c,setKeyboardClose:()=>v,setKeyboardOpen:()=>n,startKeyboardAssist:()=>e,trackViewportChanges:()=>g});const s="ionKeyboardDidShow",m="ionKeyboardDidHide";let l={},t={},r=!1;const c=()=>{l={},t={},r=!1},e=o=>{f(o),o.visualViewport&&(t=w(o.visualViewport),o.visualViewport.onresize=()=>{g(o),u()||d(o)?n(o):h(o)&&v(o)})},f=o=>{o.addEventListener("keyboardDidShow",E=>n(o,E)),o.addEventListener("keyboardDidHide",()=>v(o))},n=(o,E)=>{_(o,E),r=!0},v=o=>{y(o),r=!1},u=()=>!r&&l.width===t.width&&(l.height-t.height)*t.scale>150,d=o=>r&&!h(o),h=o=>r&&t.height===o.innerHeight,_=(o,E)=>{const O=new CustomEvent(s,{detail:{keyboardHeight:E?E.keyboardHeight:o.innerHeight-t.height}});o.dispatchEvent(O)},y=o=>{const E=new CustomEvent(m);o.dispatchEvent(E)},g=o=>{l=Object.assign({},t),t=w(o.visualViewport)},w=o=>({width:Math.round(o.width),height:Math.round(o.height),offsetTop:o.offsetTop,offsetLeft:o.offsetLeft,pageTop:o.pageTop,pageLeft:o.pageLeft,scale:o.scale})},9852:(D,p,a)=>{a.d(p,{c:()=>m});var s=a(3457);const m=i=>{let l,t,r;const c=()=>{l=()=>{r=!0,i&&i(!0)},t=()=>{r=!1,i&&i(!1)},null==s.w||s.w.addEventListener("keyboardWillShow",l),null==s.w||s.w.addEventListener("keyboardWillHide",t)};return c(),{init:c,destroy:()=>{null==s.w||s.w.removeEventListener("keyboardWillShow",l),null==s.w||s.w.removeEventListener("keyboardWillHide",t),l=t=void 0},isKeyboardVisible:()=>r}}},7741:(D,p,a)=>{a.d(p,{S:()=>m});const m={bubbles:{dur:1e3,circles:9,fn:(i,l,t)=>{const r=i*l/t-i+"ms",c=2*Math.PI*l/t;return{r:5,style:{top:9*Math.sin(c)+"px",left:9*Math.cos(c)+"px","animation-delay":r}}}},circles:{dur:1e3,circles:8,fn:(i,l,t)=>{const r=l/t,c=i*r-i+"ms",e=2*Math.PI*r;return{r:5,style:{top:9*Math.sin(e)+"px",left:9*Math.cos(e)+"px","animation-delay":c}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(i,l)=>({r:6,style:{left:9-9*l+"px","animation-delay":-110*l+"ms"}})},lines:{dur:1e3,lines:8,fn:(i,l,t)=>({y1:14,y2:26,style:{transform:`rotate(${360/t*l+(l<t/2?180:-180)}deg)`,"animation-delay":i*l/t-i+"ms"}})},"lines-small":{dur:1e3,lines:8,fn:(i,l,t)=>({y1:12,y2:20,style:{transform:`rotate(${360/t*l+(l<t/2?180:-180)}deg)`,"animation-delay":i*l/t-i+"ms"}})},"lines-sharp":{dur:1e3,lines:12,fn:(i,l,t)=>({y1:17,y2:29,style:{transform:`rotate(${30*l+(l<6?180:-180)}deg)`,"animation-delay":i*l/t-i+"ms"}})},"lines-sharp-small":{dur:1e3,lines:12,fn:(i,l,t)=>({y1:12,y2:20,style:{transform:`rotate(${30*l+(l<6?180:-180)}deg)`,"animation-delay":i*l/t-i+"ms"}})}}},6659:(D,p,a)=>{a.r(p),a.d(p,{createSwipeBackGesture:()=>t});var s=a(5730),m=a(5062),i=a(1898);a(4349);const t=(r,c,e,f,n)=>{const v=r.ownerDocument.defaultView;let u=(0,m.i)(r);const h=o=>u?-o.deltaX:o.deltaX;return(0,i.createGesture)({el:r,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:o=>(u=(0,m.i)(r),(o=>{const{startX:M}=o;return u?M>=v.innerWidth-50:M<=50})(o)&&c()),onStart:e,onMove:o=>{const M=h(o)/v.innerWidth;f(M)},onEnd:o=>{const E=h(o),M=v.innerWidth,O=E/M,P=(o=>u?-o.velocityX:o.velocityX)(o),S=P>=0&&(P>.2||E>M/2),b=(S?1-O:O)*M;let k=0;if(b>5){const T=b/Math.abs(P);k=Math.min(T,540)}n(S,O<=0?.01:(0,s.l)(0,O,.9999),k)}})}},3111:(D,p,a)=>{a.d(p,{G:()=>c});var s=a(5861),m=a(591);let i=(()=>{class e{}return e.STEPS="steps",e.HEART_RATE="heart_rate",e.STAIRS="stairs",e.DISTANCE="distance",e})();var l=a(6738),t=a(3799),r=a(3795);let c=(()=>{class e{constructor(n,v){this.health=n,this.deviceService=v,this.deviceInfo=null,this.isAuthorized$=new m.X(null),this.deviceInfo=this.deviceService.getDeviceInfo(),console.log("deviceInfo",this.deviceInfo)}isHealthAvailable(){var n=this;return(0,s.Z)(function*(){return"desktop"!==n.deviceInfo.deviceType&&n.health.isAvailable()})()}askForInstallingGoogleFit(){this.health.promptInstallFit().then(n=>console.log(n)).catch(n=>console.log(n))}returnPermissions(){const n=[{read:["steps","distance","heart_rate"]}];return n.push("iOS"===this.deviceInfo.os?{read:["stairs"]}:{read:["activity","calories"]}),n}requestAuthorization(){var n=this;return(0,s.Z)(function*(){yield n.health.requestAuthorization(n.returnPermissions())})()}isAuthorized(){var n=this;return(0,s.Z)(function*(){return"iOS"===n.deviceInfo.os?(yield n.requestAuthorization(),!0):"desktop"===n.deviceInfo.deviceType||n.health.isAuthorized(n.returnPermissions())})()}queryPrepare(n,v,u){const d=new Date(n.getFullYear(),n.getMonth(),n.getDate());d.setHours(0,0,0);const h=new Date(n.getFullYear(),n.getMonth(),n.getDate());return h.setHours(h.getHours()+23),h.setMinutes(h.getMinutes()+59),h.setSeconds(h.getSeconds()+59),"desktop"===this.deviceInfo.deviceType?new Promise(_=>{console.log("queryPrepare empty promise"),_([])}):u?this.health.queryAggregated({startDate:d,endDate:h,dataType:v,bucket:"day"}):this.health.query({startDate:d,endDate:h,dataType:v,limit:2500})}getStairsFromActivityData(n){var v=this;return(0,s.Z)(function*(){return v.queryPrepare(n,"activity",!1).then(u=>u.filter(d=>"stair_climbing"===d.value))})()}getDaySteps(n){var v=this;return(0,s.Z)(function*(){let u=0;return yield v.queryPrepare(n,i.STEPS,!0).then(d=>{d.forEach(h=>{u+=Number(h.value)})}).catch(d=>console.log(d)),Math.floor(u)})()}getDayDistanceInMeters(n){var v=this;return(0,s.Z)(function*(){let u=0;return yield v.queryPrepare(n,i.DISTANCE,!0).then(d=>{d.forEach(h=>{u+=Number(h.value)})}).catch(d=>console.log(d)),Math.floor(u)})()}getDayFloors(n){var v=this;return(0,s.Z)(function*(){let u=0;return"iOS"===v.deviceInfo.os?yield v.queryPrepare(n,i.STAIRS,!1).then(d=>{d.forEach(h=>{u+=Number(h.value)})}).catch(d=>console.log(d)):yield v.getStairsFromActivityData(n).then(d=>{d.forEach(h=>{u+=Math.floor(Number(h.distance+10)/16)})}).catch(d=>console.log(d)),Math.round(u)})()}getDayHeartRatesByHours(n){var v=this;return(0,s.Z)(function*(){const u=[];return yield v.queryPrepare(n,i.HEART_RATE,!1).then(d=>{for(let h=0;h<24;h++){let _=0,y=0;d.filter(g=>g.endDate.getHours()===h).forEach(g=>{y++,_+=Number(g.value)}),u.push({hour:String(h)+":00",heartRate:0!==_?_/y:null})}}).catch(d=>console.log("GetDayHeartRates Error: "+d)),u})()}getAverageDayHeartRate(n){var v=this;return(0,s.Z)(function*(){let u=0,d=0;return(yield v.getDayHeartRatesByHours(n)).forEach(h=>{null!=h.heartRate&&(u++,d+=h.heartRate)}),0!==u?Math.round(d/u):0})()}}return e.\u0275fac=function(n){return new(n||e)(l.\u0275\u0275inject(t.S),l.\u0275\u0275inject(r.x0))},e.\u0275prov=l.\u0275\u0275defineInjectable({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},3738:(D,p,a)=>{a.d(p,{m:()=>t});var s=a(1158),i=a(6738),l=a(8490);let t=(()=>{class r{constructor(e){this.translateService=e}transform(e){if(e){const f=s(e),n=s(f).isSame(s(),"day"),v=this.translateService.instant("heute");if(f instanceof s&&!0===n)return`${f.format("L")} (${v})`;if(f instanceof s)return`${f.format("L")}`}return e}timeOnly(e){if(e){const f=s(e);if(f instanceof s)return`${f.format("LT")}`}}dateInWords(e){if(e){const f=s(e);if(f instanceof s)return`${f.format("MMMM DD, YYYY")}`}}}return r.\u0275fac=function(e){return new(e||r)(i.\u0275\u0275directiveInject(l.sK,16))},r.\u0275pipe=i.\u0275\u0275definePipe({name:"dateOnly",type:r,pure:!0}),r})()},4705:(D,p,a)=>{a.d(p,{V:()=>m});var s=a(6738);let m=(()=>{class i{constructor(){}transform(t){if(t&&"number"==typeof t)switch(t){case 1:return"sehr-psychisch";case 2:return"psychisch";case 3:return"beides";case 4:return"koerperlich";case 5:return"sehr-koerperlich";case null:case NaN:return;default:throw Error("Invalider case")}}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275pipe=s.\u0275\u0275definePipe({name:"erschoepfungsartPipe",type:i,pure:!0}),i})()},5339:(D,p,a)=>{a.d(p,{M:()=>m});var s=a(6738);let m=(()=>{class i{constructor(){}transform(t){if(t&&"number"==typeof t)switch(t){case 1:return"sehr-wenig";case 2:return"wenig";case 3:return"mittel";case 4:return"stark";case 5:return"sehr-stark";case 38:return 38;case 39:return 39;case 40:return 40;case 41:return 41;case null:case NaN:case void 0:return;default:throw Error("Invalider case: "+t)}}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275pipe=s.\u0275\u0275definePipe({name:"symptome",type:i,pure:!0}),i})()},998:(D,p,a)=>{a.d(p,{R:()=>m});var s=a(6738);let m=(()=>{class i{constructor(){}transform(t){if(t&&"number"==typeof t)switch(t){case 1:return"sehr-gut";case 2:return"gut";case 3:return"ok";case 4:return"schlecht";case 5:return"sehr-schlecht";case null:case NaN:return"nicht ausgef\xfcllt";default:throw Error("Tagesform Invalider case: "+t)}}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275pipe=s.\u0275\u0275definePipe({name:"tagesformPipe",type:i,pure:!0}),i})()}}]);
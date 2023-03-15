"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6364],{6364:(F,v,m)=>{m.r(v),m.d(v,{FilesystemWeb:()=>D});var c=m(5861),R=m(7423);function E(f){const p=f.split("/").filter(t=>"."!==t),r=[];return p.forEach(t=>{".."===t&&r.length>0&&".."!==r[r.length-1]?r.pop():r.push(t)}),r.join("/")}let D=(()=>{class f extends R.Uw{constructor(){super(...arguments),this.DB_VERSION=1,this.DB_NAME="Disc",this._writeCmds=["add","put","delete"]}initDb(){var r=this;return(0,c.Z)(function*(){if(void 0!==r._db)return r._db;if(!("indexedDB"in window))throw r.unavailable("This browser doesn't support IndexedDB");return new Promise((t,i)=>{const e=indexedDB.open(r.DB_NAME,r.DB_VERSION);e.onupgradeneeded=f.doUpgrade,e.onsuccess=()=>{r._db=e.result,t(e.result)},e.onerror=()=>i(e.error),e.onblocked=()=>{console.warn("db blocked")}})})()}static doUpgrade(r){const i=r.target.result;i.objectStoreNames.contains("FileStorage")&&i.deleteObjectStore("FileStorage"),i.createObjectStore("FileStorage",{keyPath:"path"}).createIndex("by_folder","folder")}dbRequest(r,t){var i=this;return(0,c.Z)(function*(){const e=-1!==i._writeCmds.indexOf(r)?"readwrite":"readonly";return i.initDb().then(n=>new Promise((s,d)=>{const u=n.transaction(["FileStorage"],e).objectStore("FileStorage")[r](...t);u.onsuccess=()=>s(u.result),u.onerror=()=>d(u.error)}))})()}dbIndexRequest(r,t,i){var e=this;return(0,c.Z)(function*(){const n=-1!==e._writeCmds.indexOf(t)?"readwrite":"readonly";return e.initDb().then(s=>new Promise((d,a)=>{const h=s.transaction(["FileStorage"],n).objectStore("FileStorage").index(r)[t](...i);h.onsuccess=()=>d(h.result),h.onerror=()=>a(h.error)}))})()}getPath(r,t){const i=void 0!==t?t.replace(/^[/]+|[/]+$/g,""):"";let e="";return void 0!==r&&(e+="/"+r),""!==t&&(e+="/"+i),e}clear(){var r=this;return(0,c.Z)(function*(){(yield r.initDb()).transaction(["FileStorage"],"readwrite").objectStore("FileStorage").clear()})()}readFile(r){var t=this;return(0,c.Z)(function*(){const i=t.getPath(r.directory,r.path),e=yield t.dbRequest("get",[i]);if(void 0===e)throw Error("File does not exist.");return{data:e.content?e.content:""}})()}writeFile(r){var t=this;return(0,c.Z)(function*(){const i=t.getPath(r.directory,r.path);let e=r.data;const n=r.encoding,s=r.recursive,d=yield t.dbRequest("get",[i]);if(d&&"directory"===d.type)throw Error("The supplied path is a directory.");const a=i.substr(0,i.lastIndexOf("/"));if(void 0===(yield t.dbRequest("get",[a]))){const h=a.indexOf("/",1);if(-1!==h){const g=a.substr(h);yield t.mkdir({path:g,directory:r.directory,recursive:s})}}if(!n&&(e=e.indexOf(",")>=0?e.split(",")[1]:e,!t.isBase64String(e)))throw Error("The supplied data is not valid base64 content.");const u=Date.now(),l={path:i,folder:a,type:"file",size:e.length,ctime:u,mtime:u,content:e};return yield t.dbRequest("put",[l]),{uri:l.path}})()}appendFile(r){var t=this;return(0,c.Z)(function*(){const i=t.getPath(r.directory,r.path);let e=r.data;const n=r.encoding,s=i.substr(0,i.lastIndexOf("/")),d=Date.now();let a=d;const o=yield t.dbRequest("get",[i]);if(o&&"directory"===o.type)throw Error("The supplied path is a directory.");if(void 0===(yield t.dbRequest("get",[s]))){const h=s.indexOf("/",1);if(-1!==h){const g=s.substr(h);yield t.mkdir({path:g,directory:r.directory,recursive:!0})}}if(!n&&!t.isBase64String(e))throw Error("The supplied data is not valid base64 content.");void 0!==o&&(e=void 0===o.content||n?o.content+e:btoa(atob(o.content)+atob(e)),a=o.ctime);const l={path:i,folder:s,type:"file",size:e.length,ctime:a,mtime:d,content:e};yield t.dbRequest("put",[l])})()}deleteFile(r){var t=this;return(0,c.Z)(function*(){const i=t.getPath(r.directory,r.path);if(void 0===(yield t.dbRequest("get",[i])))throw Error("File does not exist.");if(0!==(yield t.dbIndexRequest("by_folder","getAllKeys",[IDBKeyRange.only(i)])).length)throw Error("Folder is not empty.");yield t.dbRequest("delete",[i])})()}mkdir(r){var t=this;return(0,c.Z)(function*(){const i=t.getPath(r.directory,r.path),e=r.recursive,n=i.substr(0,i.lastIndexOf("/")),s=(i.match(/\//g)||[]).length,d=yield t.dbRequest("get",[n]),a=yield t.dbRequest("get",[i]);if(1===s)throw Error("Cannot create Root directory");if(void 0!==a)throw Error("Current directory does already exist.");if(!e&&2!==s&&void 0===d)throw Error("Parent directory must exist");if(e&&2!==s&&void 0===d){const l=n.substr(n.indexOf("/",1));yield t.mkdir({path:l,directory:r.directory,recursive:e})}const o=Date.now(),u={path:i,folder:n,type:"directory",size:0,ctime:o,mtime:o};yield t.dbRequest("put",[u])})()}rmdir(r){var t=this;return(0,c.Z)(function*(){const{path:i,directory:e,recursive:n}=r,s=t.getPath(e,i),d=yield t.dbRequest("get",[s]);if(void 0===d)throw Error("Folder does not exist.");if("directory"!==d.type)throw Error("Requested path is not a directory");const a=yield t.readdir({path:i,directory:e});if(0!==a.files.length&&!n)throw Error("Folder is not empty");for(const o of a.files){const u=`${i}/${o.name}`;"file"===(yield t.stat({path:u,directory:e})).type?yield t.deleteFile({path:u,directory:e}):yield t.rmdir({path:u,directory:e,recursive:n})}yield t.dbRequest("delete",[s])})()}readdir(r){var t=this;return(0,c.Z)(function*(){const i=t.getPath(r.directory,r.path),e=yield t.dbRequest("get",[i]);if(""!==r.path&&void 0===e)throw Error("Folder does not exist.");const n=yield t.dbIndexRequest("by_folder","getAllKeys",[IDBKeyRange.only(i)]);return{files:yield Promise.all(n.map(function(){var d=(0,c.Z)(function*(a){let o=yield t.dbRequest("get",[a]);return void 0===o&&(o=yield t.dbRequest("get",[a+"/"])),{name:a.substring(i.length+1),type:o.type,size:o.size,ctime:o.ctime,mtime:o.mtime,uri:o.path}});return function(a){return d.apply(this,arguments)}}()))}})()}getUri(r){var t=this;return(0,c.Z)(function*(){const i=t.getPath(r.directory,r.path);let e=yield t.dbRequest("get",[i]);return void 0===e&&(e=yield t.dbRequest("get",[i+"/"])),{uri:(null==e?void 0:e.path)||i}})()}stat(r){var t=this;return(0,c.Z)(function*(){const i=t.getPath(r.directory,r.path);let e=yield t.dbRequest("get",[i]);if(void 0===e&&(e=yield t.dbRequest("get",[i+"/"])),void 0===e)throw Error("Entry does not exist.");return{type:e.type,size:e.size,ctime:e.ctime,mtime:e.mtime,uri:e.path}})()}rename(r){var t=this;return(0,c.Z)(function*(){yield t._copy(r,!0)})()}copy(r){var t=this;return(0,c.Z)(function*(){return t._copy(r,!1)})()}requestPermissions(){return(0,c.Z)(function*(){return{publicStorage:"granted"}})()}checkPermissions(){return(0,c.Z)(function*(){return{publicStorage:"granted"}})()}_copy(r,t=!1){var i=this;return(0,c.Z)(function*(){let{toDirectory:e}=r;const{to:n,from:s,directory:d}=r;if(!n||!s)throw Error("Both to and from must be provided");e||(e=d);const a=i.getPath(d,s),o=i.getPath(e,n);if(a===o)return{uri:o};if(function q(f,p){f=E(f),p=E(p);const r=f.split("/"),t=p.split("/");return f!==p&&r.every((i,e)=>i===t[e])}(a,o))throw Error("To path cannot contain the from path");let u;try{u=yield i.stat({path:n,directory:e})}catch{const y=n.split("/");y.pop();const _=y.join("/");if(y.length>0&&"directory"!==(yield i.stat({path:_,directory:e})).type)throw new Error("Parent directory of the to path is a file")}if(u&&"directory"===u.type)throw new Error("Cannot overwrite a directory with a file");const l=yield i.stat({path:s,directory:d}),h=function(){var b=(0,c.Z)(function*(y,_,w){const x=i.getPath(e,y),P=yield i.dbRequest("get",[x]);P.ctime=_,P.mtime=w,yield i.dbRequest("put",[P])});return function(_,w,x){return b.apply(this,arguments)}}(),g=l.ctime?l.ctime:Date.now();switch(l.type){case"file":{const b=yield i.readFile({path:s,directory:d});t&&(yield i.deleteFile({path:s,directory:d}));const y=yield i.writeFile({path:n,directory:e,data:b.data});return t&&(yield h(n,g,l.mtime)),y}case"directory":{if(u)throw Error("Cannot move a directory over an existing object");try{yield i.mkdir({path:n,directory:e,recursive:!1}),t&&(yield h(n,g,l.mtime))}catch{}const b=(yield i.readdir({path:s,directory:d})).files;for(const y of b)yield i._copy({from:`${s}/${y}`,to:`${n}/${y}`,directory:d,toDirectory:e},t);t&&(yield i.rmdir({path:s,directory:d}))}}return{uri:o}})()}isBase64String(r){try{return btoa(atob(r))==r}catch{return!1}}}return f._debug=!0,f})()}}]);
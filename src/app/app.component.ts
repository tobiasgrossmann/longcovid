import {Component} from "@angular/core";
import {Platform} from "@ionic/angular";
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {SQLiteService} from "./services/sqlite.service";
import {DetailService} from "./services/detail.service";
import {TranslateService} from "@ngx-translate/core";
import packageJson from "../../package.json";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})
export class AppComponent {
    private initPlugin: boolean;
    public version: string = packageJson.version;
    public isWeb = false;

    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private sqlite: SQLiteService,
        private detail: DetailService,
        private translateService: TranslateService,
    ) {
        this.initializeApp();
        const defaultLanguage = localStorage.getItem("currentLanguage");
        this.translateService.setDefaultLang(defaultLanguage == null ? "de" : defaultLanguage);
        this.translateService.use(defaultLanguage == null ? "de" : defaultLanguage);
    }

    initializeApp() {
        this.platform.ready().then(async () => {
            console.log(this.version);
            this.statusBar.styleDefault();
            this.statusBar.backgroundColorByName("white");
            this.statusBar.overlaysWebView(false);
            this.detail.setExistingConnection(false);
            this.detail.setExportJson(false);
            this.sqlite.initializePlugin().then(ret => {
                this.initPlugin = ret;
                console.log(">>>> in App  this.initPlugin " + this.initPlugin);
            });
        });
    }
}

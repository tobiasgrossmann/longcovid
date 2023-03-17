import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, Inject, LOCALE_ID, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {Router, RouteReuseStrategy} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IonicModule, IonicRouteStrategy, LoadingController} from "@ionic/angular";
import {StatusBar} from "@ionic-native/status-bar/ngx";

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {SQLiteService} from "./services/sqlite.service";
import {DetailService} from "./services/detail.service";

import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

import * as moment from "moment-timezone";
import {LoadingService} from "./services/loading-service.service";
import {delay} from "rxjs/operators";
import {DeviceDetectorService} from "ngx-device-detector";
import {UniversalDeviceDetectorService} from "./services/universal-device-detector.service";


import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/de";
import localeDeExtra from "@angular/common/locales/extra/de";

import * as Sentry from "@sentry/angular";
import { Health } from "@awesome-cordova-plugins/health/ngx";

@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserModule,
        IonicModule.forRoot({
            swipeBackEnabled: true
        }),
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
    ],
    providers: [
        Health,
        StatusBar,
        SQLiteService,
        DetailService,
        {provide: LOCALE_ID, useValue: "de"},
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: DeviceDetectorService, useClass: UniversalDeviceDetectorService},
        {
            provide: ErrorHandler,
            useValue: Sentry.createErrorHandler({
                showDialog: false
            }),
        },
        {
            provide: Sentry.TraceService,
            deps: [Router],
        },
        {
            provide: APP_INITIALIZER,
            useFactory: () => () => {},
            deps: [Sentry.TraceService],
            multi: true,
        },
    ],
    exports: [
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
    constructor(
        @Inject(LOCALE_ID) public locale: string,
        private ionicPreloader: LoadingController,
        private loadingService: LoadingService
    ) {

        registerLocaleData(localeDe, "de", localeDeExtra);

        moment.locale(locale);
        // moment.locale("en");
        moment.tz.setDefault("Europe/Berlin");

        // mdbSpinningPreloader.stop();
        this.loadingService.loadingSub
            .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
            .subscribe((loading) => {
                if (loading) {
                    // this.mdbSpinningPreloader.start();
                } else {
                    // this.mdbSpinningPreloader.stop();
                }
            });
    }

}

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

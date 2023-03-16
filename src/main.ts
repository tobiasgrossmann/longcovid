import {enableProdMode} from "@angular/core";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

import {AppModule} from "./app/app.module";
import {environment} from "./environments/environment";
import { defineCustomElements as pwaElements} from "@ionic/pwa-elements/loader";
import { defineCustomElements as jeepSqlite} from "jeep-sqlite/loader";
import * as Sentry from "@sentry/angular";
import {BrowserTracing} from "@sentry/tracing";
import packageInfo from "../package.json";

if (environment.production) {
  enableProdMode();
}

Sentry.init({
  dsn: "https://f222331126034534aa3e39821536b065@o1165134.ingest.sentry.io/6254682",
  release: `long-covid-tagebuch-${packageInfo.version}`,
  integrations: [
    // Registers and configures the Tracing integration,
    // which automatically instruments your application to monitor its
    // performance, including custom Angular routing instrumentation
    new BrowserTracing({
      tracingOrigins: ["localhost"],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

pwaElements(window);
jeepSqlite(window);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

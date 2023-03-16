import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: "essen-erfassen/:tagId",
    loadChildren: () => import("./pages/essen-erfassen/essen-erfassen.module").then( m => m.EssenErfassenPageModule)
  },
  {
    path: "symptome-erfassen/:tagId",
    loadChildren: () => import("./pages/symptome-erfassen/symptome-erfassen.module").then( m => m.SymptomeErfassenPageModule)
  },
  {
    path: "tagesform-erfassen/:tagId",
    loadChildren: () => import("./pages/tagesform-erfassen/tagesform-erfassen.module").then( m => m.TagesformErfassenPageModule)
  },
  {
    path: "aktivitaeten-erfassen/:tagId",
    loadChildren: () => import("./pages/aktivitaeten-erfassen/aktivitaeten-erfassen.module").then( m => m.AktivitaetenErfassenPageModule)
  },
  {
    path: "health-data/:tag",
    loadChildren: () => import("./pages/health-data/health-data.module").then( m => m.HealthDataPageModule)
  },
  {
    path: "tabs",
    loadChildren: () => import("./shared/tabs/tabs.module").then(m => m.TabsPageModule)
  },
  {
    path: "impressum",
    loadChildren: () => import("./pages/impressum/impressum.module").then( m => m.ImpressumPageModule)
  },
  {
    path: "einstellungen",
    loadChildren: () => import("./pages/einstellungen/einstellungen.module").then( m => m.EinstellungenPageModule)
  },
  {
    path: "splash",
    loadChildren: () => import("./pages/splash/splash.module").then( m => m.SplashPageModule)
  },
  {
    path: "analyse",
    loadChildren: () => import("./pages/analyse/analyse.module").then( m => m.AnalysePageModule)
  },
  {
    path: "wissen/:articleId",
    loadChildren: () => import("./pages/single-article/single-article.module").then( m => m.SingleArticlePageModule)
  },
  {
    path: "",
    redirectTo: "splash",
    pathMatch: "full"
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

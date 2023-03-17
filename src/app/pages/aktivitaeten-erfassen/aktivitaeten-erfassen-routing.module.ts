import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AktivitaetenErfassenPage } from "./aktivitaeten-erfassen.page";

const routes: Routes = [
  {
    path: "",
    component: AktivitaetenErfassenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AktivitaetenErfassenPageRoutingModule {}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TagesformErfassenPage } from "./tagesform-erfassen.page";

const routes: Routes = [
  {
    path: "",
    component: TagesformErfassenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagesformErfassenPageRoutingModule {}

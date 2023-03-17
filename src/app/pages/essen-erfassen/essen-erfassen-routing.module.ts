import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {EssenErfassenPage} from "./essen-erfassen.page";

const routes: Routes = [
    {
        path: "",
        component: EssenErfassenPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EssenErfassenPageRoutingModule {
}

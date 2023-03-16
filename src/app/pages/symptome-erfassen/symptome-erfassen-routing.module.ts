import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {SymptomeErfassenPage} from "./symptome-erfassen.page";

const routes: Routes = [
    {
        path: "",
        component: SymptomeErfassenPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SymptomeErfassenPageRoutingModule {
}

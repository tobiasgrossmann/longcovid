import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {TagebuchTimelinePage} from "./tagebuch-timeline.page";

const routes: Routes = [
    {
        path: "",
        component: TagebuchTimelinePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TagebuchTimelinePageRoutingModule {
}

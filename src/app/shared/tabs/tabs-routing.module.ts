import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "",
        redirectTo: "tagebuch-timeline",
        pathMatch: "full"
      },
      {
        path: "tagebuch-timeline",
        loadChildren: () => import("../../pages/tagebuch-timeline/tagebuch-timeline.module").then( m => m.TagebuchTimelinePageModule),
        data: {
          name: "tagebuch-timeline"
        }
      },
      // {
      //   path: "wissen",
      //   loadChildren: () => import("../../pages/knowledge/knowledge.module").then(m => m.KnowledgePageModule),
      //   data: {
      //     name: "wissen"
      //   }
      // },
      {
        path: "dashboard",
        loadChildren: () => import("../../pages/dashboard/dashboard.module").then(m => m.DashboardPageModule),
        data: {
          name: "dashboard"
        }
      },
      {
        path: "more",
        loadChildren: () => import("../../pages/more/more.module").then(m => m.MorePageModule),
        data: {
          name: "more"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {TagebuchTimelinePageRoutingModule} from "./tagebuch-timeline-routing.module";
import {TagebuchTimelinePage} from "./tagebuch-timeline.page";
import {DateTimePipe} from "../../utils/util-filters/date-time.pipe";
import {DateOnlyPipe} from "../../utils/util-filters/date-only.pipe";
import {TranslateModule} from "@ngx-translate/core";
import {ErschoepfungsartPipe} from "../../utils/util-filters/erschoepfungsart-pipe.pipe";
import {TagesformPipe} from "../../utils/util-filters/tagesform-pipe.pipe";
import {SharedModule} from "../../shared/shared/shared.module";
import {SymptomePipe} from "../../utils/util-filters/symptome.pipe";
import {CommaBlankSeparatorPipe} from "../../utils/util-filters/comma-blank-separator.pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TagebuchTimelinePageRoutingModule,
        TranslateModule,
        SharedModule
    ],
    declarations: [TagebuchTimelinePage],
    providers: [
        DateTimePipe,
        DateOnlyPipe,
        TagesformPipe,
        ErschoepfungsartPipe,
        SymptomePipe,
        CommaBlankSeparatorPipe
    ]
})
export class TagebuchTimelinePageModule {
}

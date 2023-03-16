import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {DateTimePipe} from "../../utils/util-filters/date-time.pipe";
import {DateOnlyPipe} from "../../utils/util-filters/date-only.pipe";
import {TagesformPipe} from "../../utils/util-filters/tagesform-pipe.pipe";
import {ErschoepfungsartPipe} from "../../utils/util-filters/erschoepfungsart-pipe.pipe";
import {SymptomePipe} from "../../utils/util-filters/symptome.pipe";
import {CommaBlankSeparatorPipe} from "../../utils/util-filters/comma-blank-separator.pipe";
import {AktivitaetenPipe} from "../../utils/util-filters/aktivitaeten.pipe";
import { CountryPipe } from "src/app/utils/util-filters/country.pipe";



@NgModule({
  declarations: [
    DateTimePipe,
    DateOnlyPipe,
    TagesformPipe,
    ErschoepfungsartPipe,
    SymptomePipe,
    CommaBlankSeparatorPipe,
    AktivitaetenPipe,
    CountryPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateOnlyPipe,
    DateTimePipe,
    TagesformPipe,
    ErschoepfungsartPipe,
    SymptomePipe,
    CommaBlankSeparatorPipe,
    AktivitaetenPipe,
    CountryPipe
  ]
})
export class SharedModule { }

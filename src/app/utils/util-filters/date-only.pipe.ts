import {Pipe, PipeTransform} from "@angular/core";
import * as moment from "moment-timezone";
import {TranslateService} from "@ngx-translate/core";

@Pipe({
    name: "dateOnly"
})
export class DateOnlyPipe implements PipeTransform {

    constructor(private translateService: TranslateService) {
    }

    transform(date: any): any {
        if (date) {
            // try to convert to a moment date object 
            const momentDate = moment(date);
            const todayBoolean = moment(momentDate).isSame(moment(), "day");
            const todayString = this.translateService.instant("heute");
            if (momentDate instanceof moment && todayBoolean === true) {
                return `${momentDate.format("L")} (${todayString})`;  // DD.MM.YYYY (Heute)
            } else if (momentDate instanceof moment) {
                return `${momentDate.format("L")}`;  // DD.MM.YYYY
            }
        }
        return date;
    }

    timeOnly(date: any): any {
        if (date) {
            const momentDate = moment(date);
            if (momentDate instanceof moment) {
                return `${momentDate.format("LT")}`;
            }
        }
    }

    dateInWords(date: any): any {
        if (date) {
            const momentDate = moment(date);
            if (momentDate instanceof moment) {
                return `${momentDate.format("MMMM DD, YYYY")}`;
            }
        }
    }

}

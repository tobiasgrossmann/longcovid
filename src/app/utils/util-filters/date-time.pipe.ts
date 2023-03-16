import {Pipe, PipeTransform} from "@angular/core";
import * as moment from "moment-timezone";

@Pipe({
    name: "dateTime"
})
export class DateTimePipe implements PipeTransform {

    transform(date: any): any {
        if (date) {
            // try to convert to a moment date object
            const momentDate = moment(date);
            if (momentDate instanceof moment) {
                return `${momentDate.format("L")} ${momentDate.format("LT")}`;  // DD.MM.YYYY HH:mm
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

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagesformPipe'
})
export class TagesformPipe implements PipeTransform {

  constructor() {
  }

  transform(number: number): any {
        if (number && typeof number === 'number') {
          switch (number) {
            case 1:
              return "sehr-gut";
              break;
            case 2:
              return "gut";
              break;
            case 3:
              return "ok";
              break;
            case 4:
              return "schlecht";
              break;
            case 5:
              return "sehr-schlecht";
              break;
            case null:
              return "nicht ausgefüllt";
              break;
            case NaN:
              return "nicht ausgefüllt";
              break;
            default:
              throw Error('Tagesform Invalider case: ' + number);
          }
        }
    }


}

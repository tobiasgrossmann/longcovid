import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'symptome'
})
export class SymptomePipe implements PipeTransform {

  constructor() {
  }

  transform(number: number): any {
    if (number && typeof number === 'number') {
      switch (number) {
        case 1:
          return "sehr-wenig";
          break;
        case 2:
          return "wenig";
          break;
        case 3:
          return "mittel";
          break;
        case 4:
          return "stark";
          break;
        case 5:
          return "sehr-stark";
          break;
        case 38:
          return 38;
          break;
        case 39:
          return 39;
          break;
        case 40:
          return 40;
          break;
        case 41:
          return 41;
          break;
        case null:
          return;
          break;
        case NaN:
          return;
          break;
        case undefined:
          return;
          break;
        default:
          throw Error('Invalider case: ' + number);
      }
    }
  }

}

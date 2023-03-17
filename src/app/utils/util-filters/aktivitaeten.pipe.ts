import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aktivitaeten'
})
export class AktivitaetenPipe implements PipeTransform {

  transform(number: number): any {
    if (number && typeof number === 'number') {
      switch (number) {
        case 1:
          return "sehr wenig";
          break;
        case 2:
          return "wenig";
          break;
        case 3:
          return "mittel";
          break;
        case 4:
          return "viel";
          break;
        case 5:
          return "sehr-viel";
          break;
        case null:
          return;
          break;
        case NaN:
          return;
          break;
        default:
          throw Error('Invalider case: ' + number);
      }
    }
  }

}

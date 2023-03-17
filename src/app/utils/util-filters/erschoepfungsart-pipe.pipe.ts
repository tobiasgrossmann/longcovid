import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'erschoepfungsartPipe'
})
export class ErschoepfungsartPipe implements PipeTransform {

  constructor() {
  }

  transform(number: number): any {
    if (number && typeof number === 'number') {
      switch (number) {
        case 1:
          return "sehr-psychisch";
          break;
        case 2:
          return "psychisch";
          break;
        case 3:
          return "beides";
          break;
        case 4:
          return "koerperlich";
          break;
        case 5:
          return "sehr-koerperlich";
          break;
        case null:
          return;
          break;
        case NaN:
          return;
          break;
        default:
          throw Error('Invalider case');
      }
    }
  }

}

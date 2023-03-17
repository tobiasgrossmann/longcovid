import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaBlankSeparator'
})
export class CommaBlankSeparatorPipe implements PipeTransform {

  constructor() {
  }

  transform(string: any): any {
    if (string) {
     const stringArray = string.split(",");
     return stringArray.join(", ");
    }
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonParse'
})
export class JsonParsePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    try {
      return JSON.parse(value);
    } catch (err) {
      return value;
    }
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msToMin'
})
export class MsToMinPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let transformedVal = value / 60000;
    if (transformedVal < 1) {
      transformedVal *= 60;
      transformedVal = this.trimIfFraction(transformedVal);
      return `${transformedVal} sec`;
    } else if (transformedVal > 60) {
      transformedVal /= 60;
      transformedVal = this.trimIfFraction(transformedVal);
      return `${transformedVal} hrs`;
    } else {
      transformedVal = this.trimIfFraction(transformedVal);
      return `${transformedVal} min`;
    }
  }

  trimIfFraction(transformedVal) {
    return transformedVal.toString().indexOf('.') > -1 ? Number(transformedVal.toFixed(2)) : Number(transformedVal);
  }

}

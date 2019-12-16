import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {

  transform(milliseconds: any, args?: any): any {
    if (milliseconds) {
      const seconds = milliseconds / 1000;
      const wholeSeconds = Math.floor(seconds);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      let secondsLeft: number | string = wholeSeconds % 60;
      if (secondsLeft < 10) {
        secondsLeft = '0' + secondsLeft;
      }

      if (hours) {
        return `${hours}:${minutes - (hours * 60)}:${secondsLeft}`;
      } else {
        return `${minutes}:${secondsLeft}`;
      }
    } else {
      return 'loading...';
    }
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millisecondsToHours'
})
export class MillisecondsToHoursPipe implements PipeTransform {

  transform(value: number): any {
    if (!value) {
      return null;
    }

    // let seconds: any = value / 1000;
    // let hours = Math.floor(seconds / 3600);
    // seconds = seconds % 3600;
    // let minutes = Math.floor(seconds / 60);
    // seconds = seconds % 60;

    // return `${hours}:${minutes}`;
    let secValue = Math.floor(value / 1000)
    let days = Math.floor(secValue / 86400);

    let hours = Math.floor((secValue / 3600) - (days * 24));
    let minutes = Math.floor(secValue / 60 - (days * 24 * 60 + hours * 60));
    let seconds = Math.floor(secValue - (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60));
    return ((days > 0 ? days + 'д :' : '') + (hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? ('0' + minutes) : minutes) );
  }

}

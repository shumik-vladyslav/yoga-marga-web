import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeTransform'
})
export class TimeTransformPipe implements PipeTransform {

  transform(value: number) {
    if (value <= 60) {
      return `${value} seconds`;
    }



    const minRemaining = value / 60;

    const secRem = Math.floor(minRemaining);

    let difference = minRemaining - secRem;

    let sec = Math.round(difference*60);



    return `${secRem} minutes ${sec} secoundes`;





  }


}

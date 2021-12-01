import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeTransform'
})
export class TimeTransformPipe implements PipeTransform {

  transform(value: number) {
    // if (value < 60) {
    //   return `00:${value} `;
    // }
    // const minRemaining = value / 60;
    // let secRem = Math.floor(minRemaining);
    // let difference = minRemaining - secRem;
    // let sec = Math.round(difference*60);

    // return `${secRem} : ${sec} `;

    if(value === 0){
      return "00:00"
    }

    let hours = Math.floor((value / 3600) );
    let minutes = Math.floor(value / 60 - ( hours * 60));
    let seconds = Math.floor(value - (  hours * 60 * 60 + minutes * 60));
    return ( (hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds));

  }
}

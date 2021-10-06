import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  contructor(
    sw: SwUpdate,

  ) {
    interval(3600).subscribe(() => {
     sw.checkForUpdate();
    });

    sw.available.subscribe((event) => {
      sw
        .activateUpdate()
        .then(() => document.location.reload());
    });

   sw.activated.subscribe((ev) => {
      console.log('Previous version: ', ev.previous);
      console.log('Current version: ', ev.current);
    });


    
  }
  title = 'Yoga-marga';


}

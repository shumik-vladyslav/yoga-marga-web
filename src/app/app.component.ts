import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { AngularFireService } from './angular-fire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  contructor(
    AFService: AngularFireService,
    sw: SwUpdate,

  ) {
    console.log("this.UserData")

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

    this.UserData = AFService.getUserData();
    


  }

  title = 'Yoga Marga';

  UserData

}

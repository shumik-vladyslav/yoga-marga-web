import { Component, OnInit } from '@angular/core';
import { AngularFireService } from '../angular-fire.service';

@Component({
  selector: 'app-bm-page',
  templateUrl: './bm-page.component.html',
  styleUrls: ['./bm-page.component.scss']
})
export class BmPageComponent implements OnInit {
  practice ;

  playedIdx

  played

  constructor(private AFService: AngularFireService,
    ) {
      this.practice = this.AFService.ChoosedPractic;
     }

  ngOnInit(): void {
  }


  // onSelectTrack(i){
  //   this.playedIdx = 1
  // }

  onPause(){}

  async onSelectTrack(i) {
    // this.onPause();
    // this.playedIdx = i;
    // this.played = this.practice.bmtracks[i];
    // const url = await this.checkCache(this.played.url) 
    // this.played.audio = new Audio(url);
    // this.played.audio.addEventListener("ended",  () => {
    //   if (this.playedIdx + 1 >= this.practice.bmtracks.length) return;
    //   this.onForw();
    // }, false);  
    // await this.onPlay();
  }
}

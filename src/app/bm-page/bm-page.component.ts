import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AngularFireService } from '../angular-fire.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Location } from '@angular/common';
@Component({
  selector: 'app-bm-page',
  templateUrl: './bm-page.component.html',
  styleUrls: ['./bm-page.component.scss']
})
export class BmPageComponent implements OnInit, AfterViewInit, OnDestroy {
  currentPractice;

  audio

  playedIdx = 0

  played

  isPlay: boolean = true;

  bmId;

  allPractics;

  volume: boolean = true;

  constructor(
    private AFService: AngularFireService,
    private router: Router,
    private route: ActivatedRoute,
    private AFS: AngularFirestore,
    private _location: Location,
  ) {

    this.currentPractice = this.AFService.ChoosedPractic;

    this.bmId = this.route.snapshot.params['id'];

    this.AFService.GetPractices().subscribe(item => {

      this.allPractics = item

      console.log(item);
      console.log(this.allPractics);
      this.allPractics.forEach(element => {
        if (element.id == this.bmId) {
          console.log(element)
          this.currentPractice = element;

        }

      });

    })


  }

  ngOnInit(): void {





  }

  ngOnDestroy() {

  }

  ngAfterViewInit() {


  }



  onPlay(index, event) {
    if (this.playedIdx !== undefined && this.playedIdx !== index) {
      document.getElementsByTagName('audio')[this.playedIdx].pause();
    }
    this.playedIdx = index;

    let audio = document.getElementsByTagName('audio')[index];
    
    audio.classList.add("active");

    audio.addEventListener('ended', (event) => {
      console.log("конец")
      document.getElementsByTagName('audio')[index + 1].play()
    })

    if (document.getElementsByTagName('audio')[index].played) {
      this.isPlay = false;
    }
    if (document.getElementsByTagName('audio')[index].paused) {
      this.isPlay = true;
    }


  }
  onClick(index) {
    if (index == 0) {
      document.getElementsByTagName('audio')[index].play()
      document.getElementsByTagName('audio')[index].classList.toggle("active")
    }

    else {
      if (document.getElementsByTagName('audio')[index - 1].played) {

      }
      document.getElementsByTagName('audio')[index].play()
      document.getElementsByTagName('audio')[index].classList.toggle("active")

    }
    // document.getElementsByTagName('audio')[index].volume = 0;

  }

  onPause() {
    document.getElementsByTagName('audio')[this.playedIdx].pause()

    console.log(this.isPlay);

    this.isPlay = true;

  }

  Play() {
    console.log(this.playedIdx, "index");

    if (this.playedIdx == undefined || null) {
      this.playedIdx == 0
      document.getElementsByTagName('audio')[0].play();
    }

    else {
      document.getElementsByTagName('audio')[this.playedIdx].play();
      console.log("Starting Playing///");
      
    };

    console.log(this.isPlay)

   // this.isPlay = false;

  }

  next() {
    document.getElementsByTagName('audio')[this.playedIdx].pause();
    document.getElementsByTagName('audio')[this.playedIdx + 1].play();
  }

  before() {
    document.getElementsByTagName('audio')[this.playedIdx].pause();
    document.getElementsByTagName('audio')[this.playedIdx - 1].play();
  }
  close() {
    this._location.back();
  }

  volumeTumbler() {
    this.volume = !this.volume;
    if (this.volume == false) {
      document.getElementsByTagName('audio')[this.playedIdx].volume = 0;
    }
    else (
      document.getElementsByTagName('audio')[this.playedIdx].volume = 1
    )
  }

  // async onSelectTrack(i): Promise<void> {
  //   this.onPause();
  //   this.playedIdx = i;
  //   this.played = this.practice.bmtracks[i];
  //   const url = await this.checkCache(this.played.url) 
  //   this.played.audio = new Audio(url);
  //   this.played.audio.addEventListener("ended",  () => {
  //     if (this.playedIdx + 1 >= this.practice.bmtracks.length) return;
  //     this.onForw();
  //   }, false);  
  //   await this.onPlay();
  // }
}

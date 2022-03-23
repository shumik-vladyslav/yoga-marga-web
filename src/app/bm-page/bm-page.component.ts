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
  audio;
  playedTrackIndex = 0;
  played;
  isPlay: boolean = true;
  bmId;
  allPractics;
  volume: boolean = true;
  currentTrackUrl;
  indexPosition;
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
      console.log(this.allPractics);
      this.allPractics.forEach(element => {
        if (element.id == this.bmId) {
          console.log(element)
          this.currentPractice = element;
          this.currentTrackUrl = this.currentPractice.bmtracks[0].url;
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



  onPlay() {
    let audio = document.getElementsByTagName('audio')[0];
    audio.addEventListener('ended', (event) => {
      console.log("ending, next");
      this.next();
    })
    if (document.getElementsByTagName('audio')[0].played) {
      this.isPlay = false;
    }
    if (document.getElementsByTagName('audio')[0].paused) {
      this.isPlay = true;
    }
  }

  onTrackClick(index, track) {
    this.playedTrackIndex = index;
    this.currentTrackUrl = track.url;
    setTimeout(() => {
      document.getElementsByTagName('audio')[0].play()
    }, 1000)
  }
  pause() {
    document.getElementsByTagName('audio')[0].pause()
    this.isPlay = true;
  }
  play() {
    document.getElementsByTagName('audio')[0].play();
  }

  next() {
    this.playedTrackIndex++;
    console.log("next", this.playedTrackIndex);
    if (this.playedTrackIndex == this.currentPractice.bmtracks.length) {
      this.playedTrackIndex = 0;
      this.currentTrackUrl = this.currentPractice.bmtracks[this.playedTrackIndex].url;
      setTimeout(() => {
        document.getElementsByTagName('audio')[0].play();
      }, 1000);
      return
    }
    this.currentTrackUrl = this.currentPractice.bmtracks[this.playedTrackIndex].url;
    setTimeout(() => {
      document.getElementsByTagName('audio')[0].play();
    }, 1000);
  }

  previous() {
    console.log("next", this.playedTrackIndex);
    if (this.playedTrackIndex === 0) {
      this.playedTrackIndex = this.currentPractice.bmtracks.length;
    }
    this.playedTrackIndex--;
    this.currentTrackUrl = this.currentPractice.bmtracks[this.playedTrackIndex].url;
    setTimeout(() => {
      document.getElementsByTagName('audio')[0].play();
    }, 1000);
  }
  close() {
    this._location.back();
  }

  volumeTumbler() {
    this.volume = !this.volume;
    if (this.volume == false) {
      document.getElementsByTagName('audio')[0].volume = 0;
    }
    else (
      document.getElementsByTagName('audio')[0].volume = 1
    )
  }

  // async onSelectTrack(i): Promise<void> {
  //   this.pause();
  //   this.playedTrackIndex = i;
  //   this.played = this.practice.bmtracks[i];
  //   const url = await this.checkCache(this.played.url) 
  //   this.played.audio = new Audio(url);
  //   this.played.audio.addEventListener("ended",  () => {
  //     if (this.playedTrackIndex + 1 >= this.practice.bmtracks.length) return;
  //     this.onForw();
  //   }, false);  
  //   await this.onPlay();
  // }
}

import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AngularFireService } from '../angular-fire.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-bm-page',
  templateUrl: './bm-page.component.html',
  styleUrls: ['./bm-page.component.scss']
})
export class BmPageComponent implements OnInit, AfterViewInit, OnDestroy{
  practice ;

  audio

  playedIdx

  played

  constructor(private AFService: AngularFireService,
    ) {
      this.practice = this.AFService.ChoosedPractic;
      
     }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    
  }

  ngAfterViewInit() {
  
  }


  
  onPlay(index, event){
    console.log('Playing!',event, index);

    this.playedIdx = index;
    
    let audio = document.getElementsByTagName('audio') [index];
    audio.classList.add("active")
   console.log(audio)

   audio.addEventListener('ended', (event)=>{
     console.log("конец")
     document.getElementsByTagName('audio')[index+1].play()
   })

   
  }

  onPause(){
    if(document.getElementsByTagName('audio') [this.playedIdx].played){
      document.getElementsByTagName('audio') [this.playedIdx].pause()
    }
  }

  Play(){
    document.getElementsByTagName('audio') [this.playedIdx].play();
  }

  next(){
    document.getElementsByTagName('audio') [this.playedIdx].pause();
    document.getElementsByTagName('audio') [this.playedIdx+1].play();
  }

  before(){
    document.getElementsByTagName('audio') [this.playedIdx].pause();
    document.getElementsByTagName('audio') [this.playedIdx-1].play();
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

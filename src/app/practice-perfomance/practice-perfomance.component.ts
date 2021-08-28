import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireService } from '../angular-fire.service';
import { timer } from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'app-practice-perfomance',
  templateUrl: './practice-perfomance.component.html',
  styleUrls: ['./practice-perfomance.component.scss']
})
export class PracticePerfomanceComponent implements OnInit {

  CurrentPractic;

  currentExerciseId;

  allPractics;

  practiceId;

  practiceAudio: string;

  nowPlaying: boolean = false;

  timeLeft: number = 60;

  timeAll: number = 0;

  subscribeTimerLeft: any;

  subscribeTimerAll: any;

  onPractic: boolean;

  ifStarted: boolean = false;

  show = {
    img: '',
    imgMirror: false,
    title: '',
    description: '',
    practiceTimer: 0,
    exerciseTimer: null,
    audio: null
  }

  constructor(
    private AFService: AngularFireService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
  ) {
    this.practiceId = this.route.snapshot.params['id'];
    this.CurrentPractic = AFService.ChoosedPractic;



    this.AFService.GetPractices().subscribe(item => {

      this.allPractics = item;


     
    })









  }

  ngOnInit(): void {

    this.show.img = this.CurrentPractic?.img;
    this.show.title = this.CurrentPractic?.name;
    this.show.description = this.CurrentPractic?.shortDescription;

    //this.practiceAudio = this.CurrentPractic?.audio


    let load = setInterval(() => {
      this.allPractics.forEach(element => {
        if (element.id == this.practiceId) {
          console.log(element)
          this.CurrentPractic = element;

        }
        clearInterval(load)
      });
    }, 700);

    setTimeout(() => {
      this.show.img = this.CurrentPractic.img;
      this.show.title = this.CurrentPractic.name;
      this.show.description = this.CurrentPractic.shortDescription;

      this.practiceAudio = this.CurrentPractic?.audio
      console.log(this.practiceAudio)
    }, 1500);



  }


  // функции переключения асан

  startExercise() {
    //запускает часовой таймер

    this.hourTimer()

    this.nextAsanaAndTime()

    this.currentExerciseId = 0;
    this.show.img = this.CurrentPractic.exercises[this.currentExerciseId].image;
    this.show.title = this.CurrentPractic.exercises[this.currentExerciseId].name;
    this.show.description = this.CurrentPractic.exercises[this.currentExerciseId].description;
    this.show.audio = this.CurrentPractic.exercises[this.currentExerciseId].audio;

    this.startTimerAll();

    this.onPractic = true;

    this.ifStarted = true;

    if (document.getElementsByTagName('audio')[0].played) {
      this.nowPlaying = true;
    }

    if (document.getElementsByTagName('audio')[0].paused) {
      this.nowPlaying = false;
    }



  }

  nextExercise() {


    this.currentExerciseId++;
    this.show.img = this.CurrentPractic.exercises[this.currentExerciseId].image;
    this.show.title = this.CurrentPractic.exercises[this.currentExerciseId].name;
    this.show.description = this.CurrentPractic.exercises[this.currentExerciseId].description;
    this.show.audio = this.CurrentPractic.exercises[this.currentExerciseId].audio


  }

  nextExerciseTumb() {
    this.nextExercise()

    this.pauseTimerAll()

    this.intervalAll = setInterval(() => { this.timeAll++ }, 1000)

    this.timeLeft = 59;

    this.interval = setInterval(() => {

      this.timeLeft--;

      if (this.timeLeft == 0) {
        this.nextAsanaAndTime2()
      }
    }, 1000)

  }

  method() {

  }

  pauseExercise() {
    document.getElementsByTagName('audio')[0].pause();
    //для независимого плеера у приктик с аудио
    document.getElementsByTagName('audio')[1].pause();
    this.nowPlaying = true;

    this.pauseTimerAll()

    this.onPractic = false
  }

  playExercise() {
    this.startTimerAll();

    this.nextAsanaAndTime2();

    this.hourTimer()

    this.onPractic = true;
    document.getElementsByTagName('audio')[0].play();
    document.getElementsByTagName('audio')[1].play();
    this.nowPlaying = false;






  }

  openText() {
    window.open(this.CurrentPractic.text, '_system');
  }

  back(){
    this._location.back();
  }



  // для воспроизведение асаны после паузы с того же места
  nextAsanaAndTime2() {
    this.timeInterval = setInterval(() => {
      if (this.onPractic == true) {
        this.nextExercise()

        //лечение от залипания переключения на остановке паузы
        if (this.timeLeft !== 60) {
          clearInterval(this.timeInterval)
          this.nextAsanaAndTime()

        }

        if (this.timeLeft <= 0) {
          this.timeLeft = 60
        }
      }
    }, this.timeLeft * 1000)
  }


  // для переключения асан
  nextAsanaAndTime() {


    this.timeInterval = setInterval(() => {
      if (this.onPractic == true) {
        this.nextExercise()
      }
    }, this.time * 1000)
  }

  //переменные для таймера

  time: number = 60;

  interval;

  intervalAll;

  timeInterval

  play;






  startTimerAll() {
    this.intervalAll = setInterval(() => { this.timeAll++ }, 1000)

    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 59;
      }
    }, 1000)
  }


  pauseTimerAll() {
    clearInterval(this.timeInterval)
    clearInterval(this.intervalAll);
    clearInterval(this.interval);

    clearInterval(this.hourInt)
  }

  hourInt;
  hourTime = 3600;

  hourTimer() {
    this.hourInt = setInterval(() => {
      this.hourTime--
    }, 1000)
  }

  pauseHourTimer(){
    
  }

}





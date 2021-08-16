import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireService } from '../angular-fire.service';
import { timer } from 'rxjs';

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

  nowPlaying: boolean = false;

  timeLeft: number = 30;

  timeAll: number = 0;

  subscribeTimerLeft: any;

  subscribeTimerAll: any;

  onPractic: boolean;

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
  ) {
    this.practiceId = this.route.snapshot.params['id'];
    this.CurrentPractic = AFService.ChoosedPractic;


    this.AFService.GetPractices().subscribe(item => {

      this.allPractics = item;

      // console.log(item);
      // console.log(this.allPractics);

    })

    // this.startTimer()
   




  }

  ngOnInit(): void {

    this.show.img = this.CurrentPractic?.img;
    this.show.title = this.CurrentPractic?.name;
    this.show.description = this.CurrentPractic?.shortDescription;

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
    }, 1500);


 
  }


 

  startExercise() {
    this.currentExerciseId = 0;
    this.show.img = this.CurrentPractic.exercises[this.currentExerciseId].image;
    this.show.title = this.CurrentPractic.exercises[this.currentExerciseId].name;
    this.show.description = this.CurrentPractic.exercises[this.currentExerciseId].description;
    this.show.audio = this.CurrentPractic.exercises[this.currentExerciseId].audio;

     this.startTimerAll();

     this.onPractic  = true;

    this.startTimerLeft();

     setInterval(() => { if(this.onPractic  == true){this.nextExercise()}  }, this.timeLeft*1000);

    if (document.getElementsByTagName('audio')[0].played) {
      this.nowPlaying = false;
    }

    if (document.getElementsByTagName('audio')[0].paused) {
      this.nowPlaying = true;
    }
  }

  nextExercise() {
    this.currentExerciseId++;
    this.show.img = this.CurrentPractic.exercises[this.currentExerciseId].image;
    this.show.title = this.CurrentPractic.exercises[this.currentExerciseId].name;
    this.show.description = this.CurrentPractic.exercises[this.currentExerciseId].description;
    this.show.audio = this.CurrentPractic.exercises[this.currentExerciseId].audio

  }

  pauseExercise() {
    document.getElementsByTagName('audio')[0].pause();
    this.nowPlaying = true;

    this.pauseTimer();
    this.pauseTimerAll()

    this.onPractic  = false
  }
  playExercise() {
    document.getElementsByTagName('audio')[0].play();
    this.nowPlaying = false;
     this.startTimerAll();
    this.startTimerLeft()

    this.onPractic  = true;
  }

  openText() {
    window.open(this.CurrentPractic.text, '_system');
  }

  time: number = 0;
  interval;
  intervalAll;
  play

  // startTimer() {
  //   this.play = true;
  //   this.interval = setInterval(() => {
  //     this.time++;
  //   }, 1000)
  // }

  observableTimerAll() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      console.log(val, '+');
      this.subscribeTimerAll = this.timeAll + val;
    });
  }

 observableTimerLeft() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      console.log(val, '-');
      this.subscribeTimerLeft = this.timeLeft - val;
    });
  }

startTimerAll(){
  this.intervalAll = setInterval(()=>{this.timeAll++}, 1000)
}

  startTimerLeft() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 30;
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  pauseTimerAll(){
    clearInterval(this.intervalAll);
  }
}



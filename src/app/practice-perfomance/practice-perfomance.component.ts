import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireService } from '../angular-fire.service';


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

    this.startTimer()

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
    this.show.audio = this.CurrentPractic.exercises[this.currentExerciseId].audio

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
  }
  playExercise() {
    document.getElementsByTagName('audio')[0].play();
    this.nowPlaying = false;
  }

  openText() {
    window.open(this.CurrentPractic.text, '_system');
  }

  time: number = 0;
  interval;
  play

  startTimer() {
    this.play = true;
    this.interval = setInterval(() => {
      this.time++;
    }, 1000)
  }
}

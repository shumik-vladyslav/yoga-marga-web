import { COMPILER_OPTIONS, Component, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireService } from '../angular-fire.service';
import { Subject, timer } from 'rxjs';
import { Location, NgIf } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { PracticeSettings } from '../PracticesSetting.model';


//import { Track } from 'ngx-audio-player';

@Component({
  selector: 'app-practice-perfomance',
  templateUrl: './practice-perfomance.component.html',
  styleUrls: ['./practice-perfomance.component.scss']
})
export class PracticePerfomanceComponent implements OnInit, OnDestroy {


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

  volume: boolean = true;

  show = {
    img: '',
    imgMirror: false,
    title: '',
    description: '',
    practiceTimer: 0,
    exerciseTimer: null,
    audio: null
  }

  userId

  userDataAll

  settings = new PracticeSettings;

  localSettings;


  reminderFlag
  metronomeFlag


  hasAmountCounter: boolean = false;

  constructor(
    private AFService: AngularFireService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private AFAuth: AngularFireAuth,
    private AFS: AngularFirestore,
  ) {
    this.practiceId = this.route.snapshot.params['id'];
    this.CurrentPractic = AFService.ChoosedPractic;


    this.AFService.GetPractices().subscribe(item => {

      this.allPractics = item;

      console.log(item)

      // item.forEach(element => {
      //   if (element.id == this.practiceId) {
      //     this.CurrentPractic = element
      //     console.log(element)
      //   }
      // });
    })

    this.settings = PracticeSettings.createInstance();


  }

  ngOnInit(): void {
    console.log(document.getElementsByTagName('audio'))
    // this.show.img = this.CurrentPractic?.img;
    // this.show.title = this.CurrentPractic?.name;
    // this.show.description = this.CurrentPractic?.shortDescription;

    //this.practiceAudio = this.CurrentPractic?.audio


    let load = setInterval(() => {
      this.allPractics.forEach(element => {
        if (element.id == this.practiceId) {
          console.log(element)

          this.CurrentPractic = element;

          this.hasAmountCounter = this.CurrentPractic.hasAmountCounter;

        }
        clearInterval(load)
      });
    }, 700);

    setTimeout(() => {
      this.show.img = this.CurrentPractic.img;
      this.show.title = this.CurrentPractic.name;
      this.show.description = this.CurrentPractic.shortDescription;

      this.reminderFlag = this.localSettings.singleReminder
      if (this.reminderFlag == false) {
        this.reminderFlag = this.localSettings.multiReminder
      }
      this.metronomeFlag = this.CurrentPractic.hasMetronome

      this.practiceAudio = this.CurrentPractic?.audio
      console.log(this.practiceAudio)
      console.log(this.localSettings.intervals)
      if (this.localSettings.intervals[0] == null) {
        this.localSettings.intervals[0] = { "value": 4 }
      }
    }, 1500);

    //Для настроек практик

    this.AFAuth.authState.subscribe(user => {
      this.userId = user.email;

      console.log(this.userId);

      this.AFS.doc(`users/${this.userId}`).valueChanges().subscribe(res => {
        this.userDataAll = res;
        console.log(this.userDataAll);

        this.localSettings = this.userDataAll.practices[this.practiceId]
        console.log(this.localSettings)

        if (!this.userDataAll.practices) {
          this.userDataAll.practices = {}
        }

        if (!this.userDataAll.practices[this.practiceId]) {
          console.log("no")
          this.userDataAll.practices[this.practiceId] = this.settings
        }


      })

    })

  }


  volumeTumbler() {

    // this.volume= !this.volume

    if (this.volume === true) {
      this.volume = false;
      document.getElementsByTagName('audio')[0].volume = 0;
      document.getElementsByTagName('audio')[1].volume = 0;

    }
    else {
      this.volume = true;
      document.getElementsByTagName('audio')[0].volume = 1;
      document.getElementsByTagName('audio')[1].volume = 1;
    }
    // if(this.volume === false ){

    //  // 
    //   //
    // }

    //this.volume = !this.volume;
  }


  // функции переключения асан

  // первая-- запуск всей практики
  startExercise() {
    //флаг
    this.ifStarted = true;


    //запускает часовой таймер
    this.hourTimer();
    this.startTimerAll();

    //загружает настройки по умолчанию
    this.AFService.updateUser(this.userDataAll, this.userId)




    this.nextAsanaAndTime()

    //подключаем напоминалку
    //одиночная
    if (this.localSettings.singleReminder == true) {
      this.singleReminder(this.localSettings.reminderInterval)
    }
    //множественная
    if (this.localSettings.multiReminder == true) {
      this.multiReminder(this.localSettings.reminderInterval)
    }

    if (this.CurrentPractic.hasMetronome == true) {
      console.log("metronome!!!")
      this.metronome()

    }

    // для практик с упражнениями, переназначаем практики, ПЕРЕДЕЛАтЬ!!!
    this.currentExerciseId = 0;
    this.show.img = this.CurrentPractic.exercises[this.currentExerciseId].image;
    this.show.title = this.CurrentPractic.exercises[this.currentExerciseId].name;
    this.show.description = this.CurrentPractic.exercises[this.currentExerciseId].description;
    this.show.audio = this.CurrentPractic.exercises[this.currentExerciseId].audio;
    //

    this.onPractic = true;



    // if (document.getElementsByTagName('audio')[0].played) {
    //   this.nowPlaying = true;
    // }

    // if (document.getElementsByTagName('audio')[0].paused) {
    //   this.nowPlaying = false;
    // }

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

      if (this.timeLeft === 0) {
        this.nextAsanaAndTime2()
      }
      this.timeLeft--;


    }, 1000)



    if (this.nowPlaying = false) {
      this.nowPlaying = true
    }

  }

  //Напоминалка
  //одиночная
  singleReminder(time) {
    let singleReminder = setInterval(() => {

      document.getElementsByTagName('audio')[2].volume = 1
      document.getElementsByTagName('audio')[2].play()
      console.log("!!22!!!))((#3")


      console.log('Не отвлекайся!', document.getElementsByTagName('audio')[2]);

      clearInterval(singleReminder);
    }, time)
  }
  //множественная
  multiReminder(time) {
    let multiReminder = setInterval(() => {

      document.getElementsByTagName('audio')[2].volume = 1
      document.getElementsByTagName('audio')[2].play()
      console.log("!!22!!!))((#3")

      console.log("Не отвлекайся, Бди свою концентрацию!", document.getElementsByTagName('audio')[2]);
      //document.getElementsByTagName("audio")[2].play
    }, time)
  }

  //метроном
  metronomeInterval1
  metronomeInterval
  metronomeInterval2
  index = 0
  metronomeAudioTik
  metronomeAudioGong

  metronome() {
    this.metronomeAudioTik = new Audio();
    this.metronomeAudioTik.src = "../../assets/sound/tik.mp3";
    this.metronomeAudioTik.load()
    console.log(this.metronomeAudioTik.load())
    this.metronomeAudioTik.play()

    this.metronomeInterval1 = setInterval(() => {
      this.metronomeAudioTik.play()
    }, 500)
    this.metronom1()

  }

  metronom1() {
    this.metronomeInterval = setInterval(() => {
      this.metronomeAudioGong = new Audio();
      this.metronomeAudioGong.src = "../../assets/sound/gong.mp3";
      this.metronomeAudioGong.load();
      this.metronomeAudioGong.play();

      this.index++
      if (this.index >= this.localSettings.intervals.length) { this.index = 0 }
      console.log(this.index)
      this.metronom2()
      clearInterval(this.metronomeInterval)
    }, 1000 * this.localSettings.intervals[this.index].value)
  }

  metronom2() {
    this.metronomeInterval2 = setInterval(() => {
      this.metronomeAudioGong.play();
      this.index++;
      if (this.index >= this.localSettings.intervals.length) { this.index = 0 }
      console.log(this.index)
      this.metronom1()
      clearInterval(this.metronomeInterval2)
    }, 1000 * this.localSettings.intervals[this.index].value)
  }

  pauseMetronome() {
    clearInterval(this.metronomeInterval1)

    clearInterval(this.metronomeInterval)
  }

  pauseExercise() {
    // document.getElementsByTagName('audio')[0].pause();
    //для независимого плеера у приктик с аудио
    // document.getElementsByTagName('audio')[1].pause();
    this.nowPlaying = true;

    this.pauseTimerAll()

    this.pauseMetronome()

    this.onPractic = false
  }

  playExercise() {
    this.startTimerAll();
    this.metronome()
    this.nextAsanaAndTime2();

    this.hourTimer()

    this.onPractic = true;
    document.getElementsByTagName('audio')[0].play();
    document.getElementsByTagName('audio')[1].play();
    document.getElementsByTagName('audio')[2].currentTime = 0
    document.getElementsByTagName('audio')[2].play();
    this.nowPlaying = false;






  }

  openText() {
    window.open(this.CurrentPractic.text, '_system');
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

    clearInterval(this.metronomeInterval)
    clearInterval(this.metronomeInterval2)
    clearInterval(this.hourInt)
  }

  hourInt;
  hourTime = 3600;

  hourTimer() {
    this.hourInt = setInterval(() => {
      this.hourTime--
    }, 1000)
  }

  pauseHourTimer() {

  }




  openSettings() {
    this.router.navigate([this.practiceId, "settings"])
  }


  back() {
    this.userDataAll.practices[this.practiceId].spentTime = this.timeAll + this.userDataAll.practices[this.practiceId].spentTime;
    if (this.CurrentPractic.hasAmountCounter == true && this.ifStarted == true) {
      this.router.navigate(['amount-counter', this.practiceId])
    }
    else {
      this._location.back();
    }

  }



  ngOnDestroy() {
    this.AFService.updateUser(this.userDataAll, this.userId)
    clearInterval(this.metronomeInterval)
    clearInterval(this.metronomeInterval1)
    clearInterval(this.timeInterval)
    clearInterval(this.intervalAll);
    clearInterval(this.interval);

    clearInterval(this.metronomeInterval)
    clearInterval(this.metronomeInterval2)
    clearInterval(this.hourInt)

  }

}





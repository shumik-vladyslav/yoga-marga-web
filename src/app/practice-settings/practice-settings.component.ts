import { Component, OnDestroy, OnInit } from '@angular/core';
import { PracticeSettings } from '../PracticesSetting.model';
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { AngularFireService } from '../angular-fire.service';
import { AriaDescriber } from '@angular/cdk/a11y';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';




@Component({
  selector: 'app-practice-settings',
  templateUrl: './practice-settings.component.html',
  styleUrls: ['./practice-settings.component.scss']
})
export class PracticeSettingsComponent implements OnInit, OnDestroy {

  constructor(
    private _location: Location,
    private AFS: AngularFirestore,
    private AFAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private AFService: AngularFireService,
  ) {
    this.practiceId = this.route.snapshot.params['id'];
    console.log(this.practiceId)
  }

  userId;

  userDataAll: any = {};

  settings = new PracticeSettings;

  practiceId

  allPractices

  currPr

  remindType = true;

  checked1 = false;
  checked2 = false;

  metronomeFlag;

  hasAmountCounter: boolean = false;

  intervalsMetronome

  practicTimeInFormat = {
    timePractice: null,
    timereminder: null,
    timeExersice: null,
    spentTimeGoal: null,
    amountCounterGoal: null,
  }

  localSettings = new PracticeSettings


  ngOnInit(): void {

    this.AFS.collection(`practices`).valueChanges().subscribe(res => {
      this.allPractices = res;

      this.allPractices.forEach(element => {
        if (element.id == this.practiceId) {
          this.currPr = element
          console.log(this.currPr)
          this.metronomeFlag = this.currPr.hasMetronome
          this.hasAmountCounter = this.currPr.hasAmountCounter
        }
      });

    });


    this.settings = PracticeSettings.createInstance()

    this.getUserData()

  }

  click() {

  }

  async getUserData() {


    await this.AFAuth.authState.subscribe(user => {
      this.userId = user.email;

      console.log(this.userId);

      this.AFS.doc(`users/${this.userId}`).valueChanges().subscribe(res => {
        this.userDataAll = res;
        console.log(this.userDataAll);

        this.localSettings = this.userDataAll.practices[this.practiceId]
        console.log(this.localSettings)

        this.practicTimeInFormat.timePractice = this.localSettings.practiceDuration / 1000 / 60 / 60;
        this.practicTimeInFormat.timereminder = this.localSettings.reminderInterval / 1000 / 60;
        this.practicTimeInFormat.spentTimeGoal = this.localSettings.spentTimeGoal / 1000 / 60 / 60;
        this.practicTimeInFormat.amountCounterGoal = this.localSettings.amountCounterGoal


        if (!this.userDataAll.practices) {
          this.userDataAll.practices = {}
        }

        if (!this.userDataAll.practices[this.practiceId]) {
          console.log("no")
          this.userDataAll.practices[this.practiceId] = this.settings
        }


      })

      // setTimeout(() => {
      //   this.settings = this.userDataAll.practices[this.practiceId]
      //   console.log(this.settings)

      //     this.checked1 = this.settings.singleReminder;
      //     this.checked2=this.settings.multiReminder;
      // }, 2000);



    })





  }

  // getData = new Promise<void>((resolve, reject) => {
  //   this.AFAuth.authState.subscribe(user => {
  //     this.userId = user.email;

  //     console.log(this.userId);})
  //     return this.userId
  // }).then(res=>{
  //   this.AFS.doc(`users/${this.userId}`).valueChanges().subscribe(resp => {
  //     this.userDataAll = resp;
  //     console.log(this.userDataAll);

  //     if (!this.userDataAll.practices) {
  //       this.userDataAll.practices = {}
  //     }

  //     if (!this.userDataAll.practices[this.practiceId]) {
  //       console.log("no")
  //       this.userDataAll.practices[this.practiceId] = this.settings
  //     }
  //    this.localSettings =this.userDataAll.practices

  //   })


  // })


  checkSingle() {
    this.localSettings.multiReminder = false
  }

  checkMulti() {
    this.localSettings.singleReminder = false
  }

  submit() {
    this._location.back();
  }

  temp = [];

  updateUser() {


    console.log(this.userDataAll)
    this.AFS.doc(`users/${this.userId}`).update(this.userDataAll)




    // .catch(err => {
    //   console.log(err)
    // });
  }

  addMetronomTime() {
    this.localSettings.intervals.push({ "value": 1 })
  }

  deleteMetronomTime(i) {
    this.localSettings.intervals.splice(i, 1)
  }

  ngOnDestroy() {
    this.localSettings.reminderInterval = this.practicTimeInFormat.timereminder * 1000 * 60
    this.localSettings.spentTimeGoal = this.practicTimeInFormat.spentTimeGoal * 1000 * 60 * 60;
    this.localSettings.amountCounterGoal = this.practicTimeInFormat.amountCounterGoal;
    this.userDataAll.practices[this.practiceId] = this.localSettings
    this.AFService.updateUser(this.userDataAll, this.userId)
  }
}


import { Component, OnDestroy, OnInit } from '@angular/core';
import { PracticeSettings } from '../PracticesSetting.model';
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { AngularFireService } from '../angular-fire.service';




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

  Practices

  currPr

  allTimePr


  ngOnInit(): void {

    this.AFS.collection(`practices`).valueChanges().subscribe(res => {
      this.Practices = res

    });


    this.settings = PracticeSettings.createInstance()

    this.getUserData()

    // let load = setInterval(() => {
    //   this.Practices.forEach(element => {
    //     if (element.id == this.practiceId) {
    //       console.log(element)
    //       this.currPr = element;
    //     }
    //     clearInterval(load)
    //   });
    // }, 700);


  }



  async getUserData() {


    await this.AFAuth.authState.subscribe(user => {
      this.userId = user.email;

      console.log(this.userId);

      this.AFS.doc(`users/${this.userId}`).valueChanges().subscribe(res => {
        this.userDataAll = res;
        console.log(this.userDataAll);

        if (!this.userDataAll.practices) {
          this.userDataAll.practices = {}
        }

        if (!this.userDataAll.practices[this.practiceId]) {
          console.log("no")
          this.userDataAll.practices[this.practiceId] = this.settings
        }


        // this.updateUser(this.userDataAll)

      })

      setTimeout(() => {
        this.settings = this.userDataAll.practices[this.practiceId]
        console.log(this.settings)
        this.allTimePr = this.settings.practiceDuration /1000 / 60/ 60
      }, 1000);

    })



  }



  submit() {
    this._location.back();
  }

  temp = []
  updateUser() {

    this.AFS.doc(`users/${this.userId}`).update(this.userDataAll).catch(err => {
      console.log(err)
    });
  }

  ngOnDestroy() {
    this.updateUser()
  }
}


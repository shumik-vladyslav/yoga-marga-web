import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireService } from '../angular-fire.service';
import { PracticeSettings } from '../PracticesSetting.model';

@Component({
  selector: 'app-amount-counter',
  templateUrl: './amount-counter.component.html',
  styleUrls: ['./amount-counter.component.scss']
})
export class AmountCounterComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private AFAuth: AngularFireAuth,
    private AFS: AngularFirestore,
    private AFService: AngularFireService,

  ) {
    this.practiceId = this.route.snapshot.params['id'];

    this.AFService.GetPractices().subscribe(item => {

      this.allPractics = item;

      console.log(item)

      this.allPractics.forEach(element => {
        if (element.id == this.practiceId) {
          console.log(element)
          this.CurrentPractic = element;

        }

      });
    })

    this.getUserData()
  }

  practiceId;

  allPractics;

  CurrentPractic;

  userId;

  userDataAll;

  localSettings;

  amountCounter

  ngOnInit(): void {
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
      })
    })


  }
  
  back(){
    this.router.navigate([`practices-search`])
  }
  ngOnDestroy() {
    this.localSettings.amountCounter = this.localSettings.amountCounter + this.amountCounter;
    this.userDataAll.practices[this.practiceId] = this.localSettings;
    this.AFService.updateUser(this.userDataAll, this.userId);
  }

}

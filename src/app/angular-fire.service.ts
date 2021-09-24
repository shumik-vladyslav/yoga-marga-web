import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AngularFireService {

  practics: any;

  ChoosedPractic;

  user;

  userData

  userId;

  choosedTypeOfPractic: string;

  constructor(
    private AFS: AngularFirestore,
    private AFAuth: AngularFireAuth,
    private db: AngularFireDatabase,
  ) {
    this.practics = this.AFS.collection(`practices`).valueChanges();
    this.user = AFAuth.user.subscribe();




    // this.AFAuth.authState.subscribe(user => {
    //   if (user) this.userId = user.uid
    // })


    this.AFAuth.authState.subscribe(user => {
      if (user) this.userId = user.email
    })



    // AFS.doc(`users/${this.userId}`).valueChanges().subscribe(res => {
    //   this.userData = res;
    // })
  }




  GetPractices() {
    return this.AFS.collection(`practices`).valueChanges();
  }

  sendFeedback(msg) {
    console.log(JSON.stringify({
      timestamp: Date.now(),
      user: this.userId,
      msg: msg
    }));

    return this.AFS.collection(`feedbacks`).add({
      timestamp: Date.now(),
      user: this.userId,
      msg: msg
    })
  }


  updateUser(settings, id) {
   
    this.AFS.doc(`users/${id}`).update(settings).catch(err => {
      console.log(err)
    });
  }

}

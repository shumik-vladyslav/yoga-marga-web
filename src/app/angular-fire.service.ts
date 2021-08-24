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

  practics:any

  ChoosedPractic

  user

 constructor(
    private AFS: AngularFirestore,
    private AFAuth: AngularFireAuth,
  ) {
  this.practics = this.AFS.collection(`practices`).valueChanges()
    this.user = AFAuth.user.subscribe()
    
 }

  

  GetPractices() {
    return this.practics
  }

 
}

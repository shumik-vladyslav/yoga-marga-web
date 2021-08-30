import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireService } from '../angular-fire.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  constructor(private AFS: AngularFirestore, private AFService: AngularFireService, private AFAuth: AngularFireAuth) {
    //  AFS.collection(``)
    //this.user = AFAuth.user.subscribe();
    this.userData = AFS.doc(`users/2016vad@gmail.com`).snapshotChanges()

    
    setTimeout(() => {
      console.log(this.userData.email)
    }, 1000);
  }


  userData

  user

  ngOnInit(): void {
  }


  onToggleMenu() {

    let i = document.getElementById("menu");
    i.classList.toggle("activeMenu")

    let t = document.getElementById("bg");
    t.classList.toggle("wrapper__bg")
  }


}

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


   // this.user = AFAuth.user.subscribe();

     this.AFAuth.authState.subscribe(user => {
      this.userId = user.email
      //.log(this.userId)
    })

    setTimeout(() => {
      this.getUserData()
      

    }, 800);
    

    setTimeout(() => {

      //console.log(this.user)
      //console.log(this.userId)

      //console.log(this.userDataAll);

      this.userData.name = this.userDataAll.full_name
      this.userData.spiritalName = this.userDataAll.spiritual_name
      this.userData.status = this.userDataAll.status


    }, 1400);

  }


  userDataAll

  user

  userId

  userData = {
    name: "",
    spiritalName: "",
    status: "",
    gender: "",
    phone: ""
  }

  userEmail = this.AFService.userId;

  ngOnInit(): void {
  }


  onToggleMenu() {

    let i = document.getElementById("menu");
    i.classList.toggle("activeMenu")

    let t = document.getElementById("bg");
    t.classList.toggle("wrapper__bg")
  }

 async getUserData(){

  this.AFS.doc(`users/${this.userId}`).valueChanges().subscribe(res => {
    this.userDataAll = res;
    //console.log(this.userDataAll)
  })

  }


}

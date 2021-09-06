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



    setTimeout(() => {
      // this.getUserData()






    }, 1000);


    setTimeout(() => {

      //console.log(this.user)
      //console.log(this.userId)

      //console.log(this.userDataAll);




    }, 2400);

    //this.getUserData()

  }


  userDataAll

  user

  userId

  status

  userData = {
    name: "",
    spiritalName: "",
    status: "",
    gender: "",
    phone: ""
  }

  userEmail = this.AFService.userId;

  ngOnInit(): void {

    this.getUserData()
  }


  onToggleMenu() {

    let i = document.getElementById("menu");
    i.classList.toggle("activeMenu")

    let t = document.getElementById("bg");
    t.classList.toggle("wrapper__bg")
  }

  async getUserData() {


    await this.AFAuth.authState.subscribe(user => {
      this.userId = user.email;

      console.log(this.userId);

      this.AFS.doc(`users/${this.userId}`).valueChanges().subscribe(res => {
        this.userDataAll = res;
        console.log(this.userDataAll);

      })
    })




    // await this.getData()


  }


  changeUserData(){
    if(this.userDataAll !== null || undefined){
      this.AFS.doc(`users/${this.userId}`).update(this.userDataAll)
    }

    console.log(this.status)
  }


}
 //   return new Promise(()=>{
//       this.AFAuth.authState.subscribe(user => {
//       this.userId = user.email
//       console.log(this.userId)
//     })
//     }).then(res => {
//     console.log(res)
//     this.AFS.doc(`users/${this.userId}`).valueChanges().subscribe(ret => {

//       this.userDataAll = ret;
//       console.log(ret)
//     })



//   }).then(res => {
//     this.userData.name = this.userDataAll.full_name
//     this.userData.spiritalName = this.userDataAll.spiritual_name
//     this.userData.status = this.userDataAll.status
//     console.log(this.userData.status)
//   })



//   }


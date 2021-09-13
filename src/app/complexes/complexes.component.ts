import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complexes',
  templateUrl: './complexes.component.html',
  styleUrls: ['./complexes.component.scss']
})
export class ComplexesComponent implements OnInit {

  constructor(
    private AFS: AngularFirestore,
    private router: Router,
    private AFAuth: AngularFireAuth,
  ) {

    this.AFS.doc(`shared-complexes/data`).valueChanges().subscribe(res => {
      this.DataAll = res;
      console.log(this.DataAll.array[0]);

    })


  }


  DataAll;

  userId

  userDataAll

  ngOnInit(): void {

  }

  onToggleMenu() {

    let i = document.getElementById("menu");
    i.classList.toggle("activeMenu")

    let t = document.getElementById("bg");
    t.classList.toggle("wrapper__bg")
  }

  openComplex_listPage() {
    this.router.navigate(['complex-list', this.DataAll.array[0].name])
  }


  async getUserData() {


    await this.AFAuth.authState.subscribe(user => {
      this.userId = user.email;

      console.log(this.userId);

      this.AFS.doc(`users/${this.userId}`).valueChanges().subscribe(res => {
        this.userDataAll = res;
        console.log(this.userDataAll);


        this.AFS.collection(`users/${this.userId}/complexes`  ).valueChanges().subscribe(res =>{
          console.log(res)
        })
      })



    })



  }


}

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireService } from '../angular-fire.service';

@Component({
  selector: 'app-add-complex-practices',
  templateUrl: './add-complex-practices.component.html',
  styleUrls: ['./add-complex-practices.component.scss']
})
export class AddComplexPracticesComponent implements OnInit {

  constructor(
    private AFService: AngularFireService,
    private router: Router,
    private route: ActivatedRoute,
    private AFAuth: AngularFireAuth,
    private AFS: AngularFirestore
  ) {
    this.complexName = route.snapshot.params['name'];
    this.AFService.GetPractices().subscribe(res => {
      this.allPractices = res;
      console.log(this.allPractices)
    })

  }

  allPractices: any = [];

  complexName;

  choocedPractices: any = [];

  userId;

  userDataAll;

  myComplex: any = {
    name: "",
    active: true,
    ico: "https://firebasestorage.googleapis.com/v0/b/yoga-marga.appspot.com/o/complex.svg?alt=media&token=9060348b-7d72-4425-8812-406d96dc6e4c",
    isComplex: true,
    practices: []
  }

  ngOnInit(): void {
    this.getUserData()


  }


  selectPractice(index, practice) {

    // let t = document.getElementById("practice-item" + index);
    // t.classList.toggle("selected");

    this.choocedPractices.forEach(element => {

      if (element == practice) {
        this.choocedPractices.splice(index, 1)
      }

    });
    this.choocedPractices.push(practice)
    console.log(this.choocedPractices)

    this.allPractices.forEach(practic => {
      if (practic == practice) {
        this.allPractices.splice(index, 1)
      }
    });



  }

  uploadPractice(p, i) {
    this.choocedPractices.splice(p, 1);
    this.allPractices.push(p)
  }

  next() {
    if (this.choocedPractices.length > 0) {
      let arr = []
      this.choocedPractices.forEach(element => {
        arr.push(element.id)
      });

      this.myComplex.name = this.complexName;
      this.myComplex.practices = arr;
      console.log(this.myComplex)
      if(this.userDataAll.complexes == null || undefined){
        this.userDataAll.complexes = []
        console.log(this.userDataAll)
      }
      this.userDataAll.complexes.push(this.myComplex)
      console.log(this.userDataAll)

      this.AFService.updateUser(this.userDataAll, this.userId);

      this.router.navigate(["complexes"])
    }
  }

  previously() {
    this.router.navigate(["add-complex-name"])
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



  }
}

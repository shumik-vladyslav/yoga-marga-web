import { Component, OnInit } from '@angular/core';
import { AngularFireService } from '../angular-fire.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-practics-search',
  templateUrl: './practics-search.component.html',
  styleUrls: ['./practics-search.component.scss']
})
export class PracticsSearchComponent implements OnInit {

  constructor(
    private AFS: AngularFirestore,
    private db: AngularFireDatabase,
    private AFservice: AngularFireService,
    private router: Router,
    private AFAuth: AngularFireAuth,

  ) { }
  practices;

  filteredPractices;

  searchModel;

  item$;


  results

  ngOnInit(): void {



    this.getUserData()

  }



  // для приоритета првктик
  // methodeg(){
  //   const uspr = this.practices;

  //   const glpr = Object.values(this.practices).filter(
  //     (p: any) => p.active !== false
  //   );

  //   this.practices = glpr.map((gp: any) => ({ ...uspr[gp.id], ...gp }));
  //   this.practices = this.practices.sort((a, b) => {
  //     const ap = a.priority ? a.priority : 0;
  //     const bp = b.priority ? b.priority : 0;
  //     return bp - ap;
  //   });
  //   let com = UserProvider.getComplexes();

  //   if (com) {
  //     this.practices = [...com, ...this.practices];
  //   } else {
  //     this.practices = [...this.practices];
  //   }

  //   this.filtered = [...this.practices];
  // }

  onSearchChange(value) {

    console.log(value);
    if (!value) {
      return this.filteredPractices = this.practices;
    }
    this.filteredPractices = this.practices.filter(
      (p) => p.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );

    //imageView.kf.setImage(with: url)
  }

  // onSearchChange(value) {


  //   let self = this;
  //   self.results = self.AFS.collection(`practices`, ref => ref
  //     .orderBy("practices")
  //     .startAt(value.toLowerCase())
  //     .endAt(value.toLowerCase()+"\uf8ff")
  //     .limit(10))
  //     .valueChanges();
  //     console.log(self.results)
  // }

  openPractice(p) {
    this.AFservice.ChoosedPractic = p;
    console.log(this.AFservice.ChoosedPractic);
    if (p.isBm) {
      this.router.navigate(['bm', p.id])
    }
    else {
      this.router.navigate(['practic', p.id]);
    }

  }

  onToggleMenu() {

    let i = document.getElementById("menu");
    i.classList.toggle("activeMenu")

    let t = document.getElementById("bg");
    t.classList.toggle("wrapper__bg")
  }

  practiceGoalLine() {
    let arr = []
    this.filteredPractices.forEach(element => {

      for (const iterator in this.userStartedPractices) {
        let num: number;
        if (this.userStartedPractices[iterator].spentTimeGoal > 0) {
          num = ((this.userStartedPractices[iterator].spentTime / this.userStartedPractices[iterator].spentTimeGoal) * 100)
        }
        else if (this.userStartedPractices[iterator].amountCounterGoal > 0) {
          num = ((this.userStartedPractices[iterator].amountCounter / this.userStartedPractices[iterator].amountCounterGoal) * 100)
        }

        //  console.log(iterator, this.userStartedPractices[iterator], num)
        if (iterator == element.id && num > 0) {
          element.goalNum = Math.round(num)
          console.log(element)
        }
      }

      arr.push(element)

    });

    console.log(arr)
    this.filteredPractices = arr

  }
  userId;

  userDataAll;
  userStartedPractices

  async getUserData() {


    await this.AFAuth.authState.subscribe(user => {
      this.userId = user.email;

      console.log(this.userId);
      this.AFS.doc(`users/${this.userId}`).valueChanges().subscribe(res => {
        this.userDataAll = res;
        console.log(this.userDataAll);
        this.userStartedPractices = this.userDataAll.practices
        console.log(this.userStartedPractices)


        this.AFservice.GetPractices().subscribe(item => {
          console.log(item)
          this.practices = item;
          this.filteredPractices = this.practices;
          this.practiceGoalLine()
          console.log("yygyftft")
        })




      })
    })


  }
}

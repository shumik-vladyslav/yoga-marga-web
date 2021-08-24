import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireService } from '../angular-fire.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  constructor(
    private AFService: AngularFireService,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private AFservice: AngularFireService,
    private router: Router,) {
    this.AFService.GetPractices().subscribe(item => {

      this.allPractics = item;



    })

    const subs = this.afs.collection('practices').valueChanges().subscribe(
      practices => {
        const ps = this.allPractics;
        const res = [];
        for (const key in ps) {
          if (ps.hasOwnProperty(key)) {
            const p = ps[key];
            res.push(p);
            //console.log(p)
          }
        }
        this.practices = res;
        this.groupPracticesBy();
      },
      err => console.log(err)
    )
  }


  groupPracticesBy(groupingBy = 'type') {
    if (!this.practices || this.practices.length == 0) return;

    this.groupingPractices = this.groupBy(this.practices, groupingBy);

    console.log(this.groupingPractices)

    for (let index = 0; index < this.groupingPractices.length; index++) {
      const element = this.groupingPractices[index];

      let exp = []

      this.groupedGroupingPractices.push(exp)

      console.log(element[0])


      for (let index = 0; index < 1; index++) {

        const element2 = element[0];

        exp.push(element2);

        console.log(exp)

      }

      for (let index = 0; index < 1; index++) {

        const element2 = element[1];

        const sliced = element2.slice(0, 3)
       

        exp.push(sliced);

        console.log(exp)

      }



    }

    console.log(this.namePractices)
    console.log(this.groupedGroupingPractices)
  }


  groupBy(xs, key) {
    const resObj = xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      //  console.log(rv)
      return rv;
    }, {});

    const resArr = [];
    for (const key in resObj) {
      if (resObj.hasOwnProperty(key)) {
        const val = resObj[key];
        resArr.push([key, val]);
      }
    }
    // console.log(resArr)
    return resArr;
  };

  allPractics;

  practices;

  groupingPractices;

  namePractices = [];

  groupedGroupingPractices = [];



  ngOnInit(): void {


  }



  onToggleMenu() {
    let i = document.getElementById("menu");
    i.classList.toggle("activeMenu")

    let t = document.getElementById("bg");
    t.classList.toggle("wrapper__bg")
  }

  switchGrouping(groupingBy = 'type') {
    console.log('switch type', groupingBy);
    this.groupPracticesBy(groupingBy);
    console.log('groupingPractices', this.groupingPractices);
    
  }

  openPractice(practice){
    this.AFservice.ChoosedPractic = practice;
    console.log(this.AFservice.ChoosedPractic);
    if(practice.isBm){
      this.router.navigate(['bm', practice.id])
    }
    else{
      this.router.navigate(['practic', practice.id]);
    }
    
  }

  morePractices(){
    this.router.navigate(["Practic-list"])
  }



}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireService } from '../angular-fire.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  constructor(private AFService: AngularFireService,
    private afs: AngularFirestore,) {
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
  }


  groupBy(xs, key) {
    const resObj = xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
     // console.log(rv)
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

  groupingPractices



  ngOnInit(): void {
   

  }



  onToggleMenu() {
    let i = document.getElementById("menu");
    i.classList.toggle("activeMenu")

    let t = document.getElementById("bg");
    t.classList.toggle("wrapper__bg")
  }



}

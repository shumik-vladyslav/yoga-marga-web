import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { AngularFireService } from '../angular-fire.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-complex-list',
  templateUrl: './complex-list.component.html',
  styleUrls: ['./complex-list.component.scss']
})
export class ComplexListComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private AFS: AngularFirestore,
    private AFservice: AngularFireService,
    private _location: Location,
  ) {
    this.complexName = route.snapshot.params["name"];
    console.log(this.complexName)

    this.AFS.doc(`shared-complexes/data`).valueChanges().subscribe(res => {
      this.DataAll = res;
      // console.log(this.DataAll.array);

      this.DataAll.array.forEach(element => {

        if (element.name == this.complexName) {
          this.Data = element;
          //  console.log(this.Data)
          this.practicesList = this.Data.practices;
          console.log(this.practicesList)
          return
        }





      });

    })


    this.AFS.collection(`practices`).valueChanges().subscribe(res => {
      this.practicsAll = res;
      console.log(this.practicsAll)
    });





    setTimeout(() => {
      this.practicesList.forEach(element => {
        console.log(element)

        this.practicsAll.forEach(element2 => {
          if(element2.id == element){
            this.filteredPractices.push(element2)
            console.log(this.filteredPractices)
          }
        });
      });
    }, 1500);
  }

  complexName;

  DataAll;

  Data;

  practicesList;

  practicsAll

  filteredPractices: any = [];

  ngOnInit(): void {
  }


  openPractice(p){
    this.AFservice.ChoosedPractic = p;
    console.log(this.AFservice.ChoosedPractic);
    if(p.isBm){
      this.router.navigate(['bm', p.id])
    }
    else{
      this.router.navigate(['practic', p.id]);
    }
    
  }

  back(){
    this._location.back();
  }

}

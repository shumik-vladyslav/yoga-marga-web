import { Component, OnInit } from '@angular/core';
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
  ) {

    this.AFS.doc(`shared-complexes/data`).valueChanges().subscribe(res => {
      this.DataAll = res;
      console.log(this.DataAll.array[0]);

    })
   }


   DataAll;

  ngOnInit(): void {
  }

  onToggleMenu(){

    let i = document.getElementById("menu");
    i.classList.toggle("activeMenu")
 
    let t  = document.getElementById("bg");
    t.classList.toggle("wrapper__bg")
   }

  openComplex_listPage(){
    this.router.navigate(['complex-list', this.DataAll.array[0].name])
  }


}

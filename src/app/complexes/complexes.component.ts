import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complexes',
  templateUrl: './complexes.component.html',
  styleUrls: ['./complexes.component.scss']
})
export class ComplexesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onToggleMenu(){

    let i = document.getElementById("menu");
    i.classList.toggle("activeMenu")
 
    let t  = document.getElementById("bg");
    t.classList.toggle("wrapper__bg")
   }

}

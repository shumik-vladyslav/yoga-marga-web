import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

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

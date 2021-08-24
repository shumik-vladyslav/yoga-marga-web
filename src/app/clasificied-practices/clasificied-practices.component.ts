import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-clasificied-practices',
  templateUrl: './clasificied-practices.component.html',
  styleUrls: ['./clasificied-practices.component.scss']
})
export class ClasificiedPracticesComponent implements OnInit {

  constructor(
    private _location: Location,
  ) { }

  ngOnInit(): void {
  }




  onToggleMenu() {
    let i = document.getElementById("menu");
    i.classList.toggle("activeMenu")

    let t = document.getElementById("bg");
    t.classList.toggle("wrapper__bg")
  }

  back(){
    this._location.back();
  }

}

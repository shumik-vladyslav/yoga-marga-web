import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

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

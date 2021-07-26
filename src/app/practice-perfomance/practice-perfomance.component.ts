import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireService } from '../angular-fire.service';


@Component({
  selector: 'app-practice-perfomance',
  templateUrl: './practice-perfomance.component.html',
  styleUrls: ['./practice-perfomance.component.scss']
})
export class PracticePerfomanceComponent implements OnInit {

  practic

  show = {
    img: '',
    imgMirror: false,
    title: '',
    description: '',
    practiceTimer: 0,
    exerciseTimer: null,
    audio: null
  }

  constructor(
   private AFService: AngularFireService,
   private router: Router,
    ) {
      this.practic = AFService.ChoosedPractic;
      this.show.img = this.practic.img;
      this.show.title = this.practic.name;
      this.show.description = this.practic.shortDescription;
     }

  ngOnInit(): void {
  }

}

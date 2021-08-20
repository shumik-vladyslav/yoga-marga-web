import { Component, OnInit } from '@angular/core';
import { AngularFireService } from '../angular-fire.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  constructor(private AFService: AngularFireService) {
    this.AFService.GetPractices().subscribe(item => {

      this.allPractics = item;



    })

    setTimeout(() => {
      console.log(this.allPractics)
    }, 2000);
  }

  allPractics;



  ngOnInit(): void {
  }



  onToggleMenu() {
    let i = document.getElementById("menu");
    i.classList.toggle("activeMenu")

    let t = document.getElementById("bg");
    t.classList.toggle("wrapper__bg")
  }

}

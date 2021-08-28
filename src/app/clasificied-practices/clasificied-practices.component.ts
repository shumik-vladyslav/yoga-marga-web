import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireService } from '../angular-fire.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clasificied-practices',
  templateUrl: './clasificied-practices.component.html',
  styleUrls: ['./clasificied-practices.component.scss']
})
export class ClasificiedPracticesComponent implements OnInit, AfterContentInit, AfterViewInit {

  constructor(
    private _location: Location,
    private AFService: AngularFireService,
    private AFS: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.practicType = this.route.snapshot.params['type'];

    const subs = this.AFS.collection('practices').valueChanges().subscribe(
      practices => {
        for (let i = 0; i < practices.length; i++) {

          let p: any = practices[i];


          if (p.type == this.practicType) {
            this.practic.push(p)

          }



        }

        if (this.practic.length === 0) {
          for (let i = 0; i < practices.length; i++) {

            let p: any = practices[i];


            if (p.yantra == this.practicType) {
              this.practic.push(p)

            }



          }
        }
      },
      err => console.log(err)
    )

    console.log(this.practic)

    // setTimeout(() => {

    // }, 2000);
    // console.log()
  }

  practicType: string;

  practic = [];


  ngOnInit(): void {

  }

  ngAfterContentInit() {

  }
  ngAfterViewInit() {
    //  console.log(this.practic)
  }

  openPractice(p) {
    this.AFService.ChoosedPractic = p;
    console.log(this.AFService.ChoosedPractic);
    if (p.isBm) {
      this.router.navigate(['bm', p.id])
    }
    else {
      this.router.navigate(['practic', p.id]);
    }

  }


  onToggleMenu() {
    let i = document.getElementById("menu");
    i.classList.toggle("activeMenu")

    let t = document.getElementById("bg");
    t.classList.toggle("wrapper__bg")
  }

  back() {
    this._location.back();
  }

}

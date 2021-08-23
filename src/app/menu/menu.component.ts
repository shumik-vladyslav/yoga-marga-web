import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router,
    public firebaseAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }


  onToggleMenu() {

    let i = document.getElementById("menu");
    i.classList.toggle("activeMenu")

    let t = document.getElementById("bg");
    t.classList.toggle("wrapper__bg")
  }

  onToggleMenu2() {
    let i = document.getElementById("menu");
    i.classList.toggle("activeMenu")

    let t = document.getElementById("bg");
    t.classList.toggle("wrapper__bg")

    this.router.navigate(["practices-search"])
  }

  onCatalogChange() {
    this.router.navigate(['practices-catalog'])
  }

  logout() {
    this.firebaseAuth.signOut()
    this.router.navigate(['login'])
  }

  PersonalInfo(){
    this.router.navigate(["about_yourself"])
  }

  Complexes(){
    this.router.navigate(["complexes"])
  }

}

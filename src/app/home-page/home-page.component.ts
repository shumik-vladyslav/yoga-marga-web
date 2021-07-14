import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
 logout(){
  this.afAuth.signOut()
  this.router.navigate(["login"])

 }
}

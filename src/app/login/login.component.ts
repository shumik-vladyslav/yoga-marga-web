import { Component, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) { }

  @ViewChild('form') form: NgForm 

  errorMsg: string;



  ngOnInit(): void {

  }
  
 async onSignin(email, password){
  await this.afAuth.signInWithEmailAndPassword(email, password).then((res)=>{
    this.router.navigate(['home'])
  })
  .catch(error => this.errorMsg = error.message)
  

  }
  
}

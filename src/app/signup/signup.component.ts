import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private router: Router,
    private AfAuth: AngularFireAuth,
    private AFStore: AngularFirestore
  ) { }

  Status="Status";
  
  ErrorMsg

  @ViewChild('form') form: NgForm 

  ngOnInit(): void {
  }

  async SignUp(email, password, spiritualName, name, status){
    await this.AfAuth.createUserWithEmailAndPassword(email, password).then( auth=>{
      this.AFStore.doc(`users/${auth.user.email}`)
      .set({
        spiritual_name: spiritualName,
        full_name: name,
        status: status,
        id: auth.user.uid,
        email: auth.user.email,
        active: false
      })
      .then(res =>{console.log("user extra data saved"); this.router.navigate(['/home'])} 
      )
      .catch(err => {
        console.log("user saving extra data error", err);
      });
    }).catch(err => {
      console.log(err);
      console.log('Ошибка сервера', 'Возможно такая почта уже зарегистрирована, или отсутствует подключение к сети');
      this.ErrorMsg = err
    })



}
}
import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { SwUpdate } from '@angular/service-worker';
import {IVService} from "../iv.service"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [IVService]
})
export class LoginComponent implements OnInit {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private AFAuth: AngularFireAuth,
    private swUpdate: SwUpdate,
    private IVService: IVService

  ) { }

  test: any;

  @ViewChild('form') form: NgForm

  errorMsg: string;

  myForm: FormGroup;

  customeValidation;

  userId

  ngOnInit(): void {
    this.myForm = new FormGroup({

      Email: new FormControl("", [Validators.required, Validators.email]),
      Password: new FormControl("", [Validators.required, Validators.pattern(".{6,}")])

    });
    this.getUserData()
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm("New version available. Load New Version?")) {
          window.location.reload();
        }
      });
    }
  }

  async onSignin() {
    if (this.myForm.invalid) {
      this.customeValidation = false;
      return this.openDialog();
    }
    else {


    this.IVService.api("auth", {email: this.myForm.value.Email, password: this.myForm.value.Password}).subscribe((response: any) => {
      if(!response.success) return this.openDialogErr();
      const authState = {
        email: response.user.EMAIL,
        active: true,
        name: response.user.NAME,
        lastname: response.user.LAST_NAME,
        gender: "",
        id: response.user.ID,
        phone: "",
        spiritual_name: response.user.UF_DUH_NAME,
        status: "Пользователь",
        course: response.user.COURSE
      };
      localStorage.setItem("auth", JSON.stringify(authState)); 
      this.router.navigate(['practices-search']);
    }); 


     /*await this.afAuth.signInWithEmailAndPassword(this.myForm.value.Email, this.myForm.value.Password,).then((res) => {
        console.log(res)
        this.router.navigate(['practices-search'])
        
      })
        .catch(error => {
          this.errorMsg = error.message;
          this.openDialogErr();

        })*/



    }

  }



  openDialog(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      data: {cause: "Ошибка", Errore: "Проверьте правильность полей, пароль не должен быть меньше 6 символов ", }


    });




    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  openDialogErr(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      data: { ErrMsg: "Пароль не верный или такого пользователя не существует" }


    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });

  }

  async getUserData() {

    const auth = localStorage.getItem("auth");
    if(auth) {
      this.userId = JSON.parse(auth).id;
      this.router.navigate(['practices-search'])
    }
    /*
    await this.AFAuth.authState.subscribe(user => {
      console.log(user); 
      this.userId = user.email;
      console.log(this.userId);
      if(this.userId !== null||undefined){
        this.router.navigate(['practices-search'])
      }
    })*/


  }
}
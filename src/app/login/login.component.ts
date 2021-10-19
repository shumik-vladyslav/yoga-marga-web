import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { SwUpdate } from '@angular/service-worker';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private AFAuth: AngularFireAuth,
    private swUpdate: SwUpdate

  ) { }

  @ViewChild('form') form: NgForm

  errorMsg: string;

  myForm: FormGroup;

  customeValidation;

  userId

  ngOnInit(): void {
    this.myForm = new FormGroup({

      Email: new FormControl("", [Validators.required, Validators.email]),
      Password: new FormControl("", [Validators.required, Validators.pattern(".{8,}")])

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
      await this.afAuth.signInWithEmailAndPassword(this.myForm.value.Email, this.myForm.value.Password,).then((res) => {
        console.log(res)
        this.router.navigate(['practices-search'])
        
      })
        .catch(error => {
          this.errorMsg = error.message;
          this.openDialogErr();

        })
    }

  }



  openDialog(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      data: {cause: "Ошибка", Errore: "Проверьте правильность полей, пароль не должен быть меньше 8 символов ", }


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


    await this.AFAuth.authState.subscribe(user => {
      this.userId = user.email;

      console.log(this.userId);
      if(this.userId !== null||undefined){
        this.router.navigate(['practices-search'])
      }

     
    })


  }
}
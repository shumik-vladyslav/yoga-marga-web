import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors, FormGroupDirective } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  groups$
  constructor(
    private router: Router,
    private AfAuth: AngularFireAuth,
    private AFStore: AngularFirestore,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.groups$ = AFStore
      .collection(`groups`)
      .valueChanges();
  }

  Status = "Status";

  ErrorMsg: string;

  myForm: FormGroup;

  customeValidation: boolean;

  Error: string;

  data = {
    spiritualName: "",
    fullName: "",
    Status: "",
    Email: "",
    Password: "",
    RepeatPassword: "",
    gender: ""
  };

  @ViewChild('form') form: NgForm;

  ngOnInit(): void {
    this.myForm = new FormGroup
      ({
        spiritualName: new FormControl(""),
        fullName: new FormControl("", Validators.required),
        Status: new FormControl("", Validators.required),
        Email: new FormControl("", [Validators.required, Validators.email]),
        // Password : ['', [ Validators.required, Validators.pattern("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}")]],
        Password: new FormControl("", [Validators.required, Validators.pattern(".{8,}"), Validators.minLength(6)]),
        RepeatPassword: new FormControl("", [Validators.required]),
      })


  }



  // async SignUp(){
  //   await this.AfAuth.createUserWithEmailAndPassword(email, password).then( auth=>{
  //     this.AFStore.doc(`users/${auth.user.email}`)
  //     .set({
  //       spiritual_name: spiritualName,
  //       full_name: name,
  //       status: status,
  //       id: auth.user.uid,
  //       email: auth.user.email,
  //       active: false
  //     })
  //     .then(res =>{console.log("user extra data saved"); this.router.navigate(['/home'])} 
  //     )
  //     .catch(err => {
  //       console.log("user saving extra data error", err);
  //     });
  //   }).catch(err => {
  //     console.log(err);
  //     console.log('Ошибка сервера', 'Возможно такая почта уже зарегистрирована, или отсутствует подключение к сети');
  //     this.ErrorMsg = err
  //   })

  // }

  signUp() {
    console.log(this.myForm);
    if (this.myForm.valid && this.myForm.controls.Password.value == this.myForm.controls.RepeatPassword.value) {

      this.AfAuth
        .createUserWithEmailAndPassword(
          this.myForm.value.Email,
          this.data.Password
        )
        .then(auth => {
          this.router.navigate(["practices-search"]);
          console.log(JSON.stringify(auth.user));
          if (auth.user) {
            if (this.myForm.value.Status == 'Неофит') {

            }

            this.AFStore
              .doc(`users/${auth.user.email}`)
              .set({
                spiritual_name: this.myForm.value.spiritualName,
                full_name: this.myForm.value.fullName,
                status: this.myForm.value.Status,
                id: auth.user.uid,
                email: auth.user.email,
                active: this.myForm.value.Status == 'Неофит'
              })
              .then(res => console.log("user extra data saved"))
              .catch(err => {
                this.Error = 'Проверьте подключение к сети';
                console.log("user saving extra data error", err);
                this.openDialog()
              });
          }
        })
        .catch(err => {
          console.log(err);
          this.Error = 'Возможно такая почта уже зарегистрирована, или отсутствует подключение к сети';
          this.openDialog()

        })
    } else {
      this.Error = 'Проверьте правильность полей';
      this.customeValidation = false;
      this.openDialog()
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      data: { cause: 'Ошибка', Errore: this.Error, ErrMsg: this.ErrorMsg }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  MatchPassword() {


  }



  MustMatch(password: string, repearPassword: string) {
    return (formGroup: FormGroup) => {



      if (password != repearPassword) {

      }
      else {

      }

    }
  }
}
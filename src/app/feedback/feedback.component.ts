import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {FormControl,FormGroup} from '@angular/forms';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AngularFireService } from '../angular-fire.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  constructor(
    private AFService: AngularFireService,
    private AFAuth: AngularFireAuth,
    public dialog: MatDialog,
    private router: Router,
  ) { 
    
  }

  msgText;

  Error

  ErrorMsg



  ngOnInit(): void {
  
  }

  onToggleMenu(){

    let i = document.getElementById("menu");
    i.classList.toggle("activeMenu")
 
    let t  = document.getElementById("bg");
    t.classList.toggle("wrapper__bg")
   }

   openDialog(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      data: {cause: 'Успешно' ,Errore: this.Error, ErrMsg: this.ErrorMsg}
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }


   sendMsg(){
    if(this.msgText && this.msgText !=='')
    this.AFService.sendFeedback(this.msgText).then(
      res => this.openDialog()
    ).then(res =>{
      this.router.navigate(["practices-search"])
    })
    
   }

}

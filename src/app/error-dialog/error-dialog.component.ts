import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

     }

  ngOnInit(): void {
  }


  Close(){
    
  }
}

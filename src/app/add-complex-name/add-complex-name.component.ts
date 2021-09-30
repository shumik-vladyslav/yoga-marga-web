import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-complex-name',
  templateUrl: './add-complex-name.component.html',
  styleUrls: ['./add-complex-name.component.scss']
})
export class AddComplexNameComponent implements OnInit {

  constructor(private router: Router) { }

  complexName: string;

  ngOnInit(): void {

  }

  next() {
    if (this.complexName !== "" || null || undefined) {
      this.router.navigate(["add-complex-practice", this.complexName])
    }

  }

}

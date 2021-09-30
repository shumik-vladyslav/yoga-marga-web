import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireService } from '../angular-fire.service';

@Component({
  selector: 'app-add-complex-practices',
  templateUrl: './add-complex-practices.component.html',
  styleUrls: ['./add-complex-practices.component.scss']
})
export class AddComplexPracticesComponent implements OnInit {

  constructor(
    private AFService: AngularFireService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.complexName = route.snapshot.params['name'];
    this.AFService.GetPractices().subscribe(res => {
      this.allPractices = res;
      console.log(this.allPractices)
    })

  }

  allPractices: any = [];

  complexName;

  choocedPractices: any = [];

  ngOnInit(): void {
  }


  selectPractice(index, practice) {
   
    // let t = document.getElementById("practice-item" + index);
    // t.classList.toggle("selected");

    this.choocedPractices.forEach(element => {

      if (element == practice) {
        this.choocedPractices.splice(index, 1)
      }

    });
    this.choocedPractices.push(practice)
    console.log(this.choocedPractices)

    this.allPractices.forEach(practic => {
      if(practic == practice){
        this.allPractices.splice(index, 1)
      }
    });
    


  }

  uploadPractice(p, i){
    this.choocedPractices.splice(p, 1);
    this.allPractices.push(p)
  }

  next(){
    
  }
}

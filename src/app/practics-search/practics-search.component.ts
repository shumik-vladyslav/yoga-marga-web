import { Component, OnInit } from '@angular/core';
import { AngularFireService } from '../angular-fire.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-practics-search',
  templateUrl: './practics-search.component.html',
  styleUrls: ['./practics-search.component.scss']
})
export class PracticsSearchComponent implements OnInit {

  constructor(
    private AFS: AngularFirestore,
    private db: AngularFireDatabase,
    private AFservice: AngularFireService,
    private router: Router,
  ) {}

  title;

  notes;

  location;

  startDate;

  startTime;

  endDate;

  endTime;

  practices;

  filteredPractices;

  searchModel;
  
  ngOnInit(): void {
     
    
    
    this.AFservice.GetPractices().subscribe(item =>{
      console.log(item)
      this.practices = item
    })

   setTimeout(() => {
     this.filteredPractices = this.practices
   }, 1000); 
  }


  

  onSearchChange(value) {
    console.log(value);
    if (!value) {
      return this.filteredPractices = this.practices;
    }
    this.filteredPractices = this.practices.filter(
      p => p.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  openPractice(p){
    this.AFservice.ChoosedPractic = p;
    console.log(this.AFservice.ChoosedPractic);
    if(p.isBm){
      this.router.navigate(['bm'])
    }
    else{
      this.router.navigate(['practic']);
    }
    
  }
}

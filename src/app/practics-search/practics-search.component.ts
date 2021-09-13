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

  item$;


  results
  
  ngOnInit(): void {
     
    // this.practices = this.AFS.collection(`practices`).valueChanges()
    // console.log(this.practices)

    // this.practices.subscribe(item=>{ this.item$ = item})
    // console.log(this.item$)
    this.AFservice.GetPractices().subscribe(item =>{
      console.log(item)
      this.practices = item;
      this.filteredPractices = this.practices;
    })

  //  setTimeout(() => {
  //    this.filteredPractices = this.practices;
  //    console.log(this.filteredPractices)
  //  }, 1000); 
  }



// для приоритета првктик
  // methodeg(){
  //   const uspr = this.practices;

  //   const glpr = Object.values(this.practices).filter(
  //     (p: any) => p.active !== false
  //   );

  //   this.practices = glpr.map((gp: any) => ({ ...uspr[gp.id], ...gp }));
  //   this.practices = this.practices.sort((a, b) => {
  //     const ap = a.priority ? a.priority : 0;
  //     const bp = b.priority ? b.priority : 0;
  //     return bp - ap;
  //   });
  //   let com = UserProvider.getComplexes();

  //   if (com) {
  //     this.practices = [...com, ...this.practices];
  //   } else {
  //     this.practices = [...this.practices];
  //   }

  //   this.filtered = [...this.practices];
  // }

  onSearchChange(value) {
    
    console.log(value);
    if (!value) {
      return this.filteredPractices = this.practices;
    }
    this.filteredPractices = this.practices.filter(
     (p)  => p.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  // onSearchChange(value) {

    
  //   let self = this;
  //   self.results = self.AFS.collection(`practices`, ref => ref
  //     .orderBy("practices")
  //     .startAt(value.toLowerCase())
  //     .endAt(value.toLowerCase()+"\uf8ff")
  //     .limit(10))
  //     .valueChanges();
  //     console.log(self.results)
  // }

  openPractice(p){
    this.AFservice.ChoosedPractic = p;
    console.log(this.AFservice.ChoosedPractic);
    if(p.isBm){
      this.router.navigate(['bm', p.id])
    }
    else{
      this.router.navigate(['practic', p.id]);
    }
    
  }

  onToggleMenu(){

   let i = document.getElementById("menu");
   i.classList.toggle("activeMenu")

   let t  = document.getElementById("bg");
   t.classList.toggle("wrapper__bg")
  }
}

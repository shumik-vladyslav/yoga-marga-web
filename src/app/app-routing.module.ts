import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignupComponent } from './signup/signup.component';
import { PracticsSearchComponent } from './practics-search/practics-search.component';
import { PracticePerfomanceComponent } from './practice-perfomance/practice-perfomance.component';
import { BmPageComponent } from './bm-page/bm-page.component';
import { CatalogComponent } from './catalog/catalog.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ComplexesComponent } from './complexes/complexes.component';
import { ClasificiedPracticesComponent } from './clasificied-practices/clasificied-practices.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'signup', component: SignupComponent },
  {path: 'practices-search', component: PracticsSearchComponent},
  {path: 'practic/:id', component: PracticePerfomanceComponent},
  {path: 'bm/:id', component: BmPageComponent},
  {path: 'practices-catalog', component: CatalogComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'about_yourself', component: PersonalInfoComponent},
  {path: 'complexes', component: ComplexesComponent},
  {path: 'Practic-list/:type', component: ClasificiedPracticesComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

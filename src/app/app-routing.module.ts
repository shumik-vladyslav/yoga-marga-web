import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignupComponent } from './signup/signup.component';
import { PracticsSearchComponent } from './practics-search/practics-search.component';
import { PracticePerfomanceComponent } from './practice-perfomance/practice-perfomance.component';
import { BmPageComponent } from './bm-page/bm-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'signup', component: SignupComponent },
  {path: 'practices-search', component: PracticsSearchComponent},
  {path: 'practic', component: PracticePerfomanceComponent},
  {path: 'bm/:id', component: BmPageComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

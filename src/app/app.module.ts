import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire';
import { HomePageComponent } from './home-page/home-page.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { PracticsSearchComponent } from './practics-search/practics-search.component';
import { MyComplexComponent } from './my-complex/my-complex.component';
import { PracticePerfomanceComponent } from './practice-perfomance/practice-perfomance.component';
import { BmPageComponent } from './bm-page/bm-page.component';
import { TimeTransformPipe } from './time-transform.pipe';
import { MenuComponent } from './menu/menu.component';
import { CatalogComponent } from './catalog/catalog.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ComplexesComponent } from './complexes/complexes.component';
import { ClasificiedPracticesComponent } from './clasificied-practices/clasificied-practices.component';
import { ComplexListComponent } from './complex-list/complex-list.component';
import { PracticeSettingsComponent } from './practice-settings/practice-settings.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { ProgressChartDirective } from './progress-chart.directive';
import { AmountCounterComponent } from './amount-counter/amount-counter.component';
import { MillisecondsToHoursPipe } from './milliseconds-to-hours.pipe';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AddComplexNameComponent } from './add-complex-name/add-complex-name.component';
import { AddComplexPracticesComponent } from './add-complex-practices/add-complex-practices.component';

export const config = {
  firebase: {
    apiKey: "AIzaSyB_GbsCOx3bVOQ8ewbi0wmET7rV5yh-nq0",
    authDomain: "yoga-marga.firebaseapp.com",
    databaseURL: "https://yoga-marga.firebaseio.com",
    projectId: "yoga-marga",
    storageBucket: "yoga-marga.appspot.com",
    messagingSenderId: "286651682132"
  }
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    SignupComponent,
    // ,MatDialogModule
    ErrorDialogComponent,
    PracticsSearchComponent,
    MyComplexComponent,
    PracticePerfomanceComponent,
    BmPageComponent,
    TimeTransformPipe,
    MenuComponent,
    CatalogComponent,
    FeedbackComponent,
    PersonalInfoComponent,
    ComplexesComponent,
    ClasificiedPracticesComponent,
    ComplexListComponent,
    PracticeSettingsComponent,
    ProgressChartDirective,
    AmountCounterComponent,
    MillisecondsToHoursPipe,
    AddComplexNameComponent,
    AddComplexPracticesComponent
  ],
  imports: [
    BrowserModule,

    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,

    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

    AngularFireModule.initializeApp(config.firebase),

    AngularFirestoreModule.enablePersistence(),
    
    BrowserAnimationsModule,

    NgxAudioPlayerModule,



  ],
  entryComponents: [
    ErrorDialogComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

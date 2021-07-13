import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire';
import { HomePageComponent } from './home-page/home-page.component';
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
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    FormsModule,
    AngularFireModule.initializeApp(config.firebase)
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

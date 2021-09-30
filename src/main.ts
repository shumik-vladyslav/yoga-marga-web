import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));



// self.addEventListener('install',  (event) => {
//   event.timeStamp(
//     caches.open(cacheName).then(function (cache) {
//       return cache.addAll(
//         [
//           '/css/bootstrap.css',
//           '/css/main.css',
//           '/js/bootstrap.min.js',
//           '/js/jquery.min.js',
//           '/offline.html'
//         ]
//       );
//     })
//   );
// });

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CachingServiceService {

  constructor() { }


  //self.addEventListener('install', )


  self.addEventListener('notificationclick', (event) => {
    console.log('notification clicked!')
  });

  importScripts('./ngsw-worker.js');
self.addEventListener('notificationclick', (event) => {
  console.log('notification clicked!')
});
}
function importScripts(arg0: string) {
  throw new Error('Function not implemented.');
}


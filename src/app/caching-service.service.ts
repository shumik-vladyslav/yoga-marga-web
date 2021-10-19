import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { tap } from 'rxjs/operators';
import { Url } from 'url';
interface ChachedImages {
  url: string;
  blob: Blob
}

@Injectable({
  providedIn: 'root'
})
export class CachingServiceService {

 }

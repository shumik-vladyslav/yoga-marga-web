import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import axios from "axios"
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IVService {
  constructor(
    private http: HttpClient
  ) {}
  api(method, params) {
    return this.http.post("https://institute-vasishtha.com/api/index.php", {method, ...params});
  }
}
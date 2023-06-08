import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

interface Config {
 url: string;
 usr: string;
 pwd: string;
}

export class OpHttpService {
  config$: Observable<Config>;

  constructor(private http: HttpClient) { }

  this.$config = getConfig() {
    return this.http.get<Config>("http://localhost:8080/getConfig").map(data => _.values(data))
  }
}

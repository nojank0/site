import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class OpHttpService {

  configURL = "http://localhost:8080/getConfig"

  constructor(private http: HttpClient) { }

  getConfig() {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    this.http.get<Config>(this.configURL, options)
    .subscribe(config => {
        console.log(config.url + config.usr)
      }
    )
  }
  
  // this.$config = getConfig() {
  //   return this.http.get<Config>("http://localhost:8080/getConfig").map(data => _.values(data))
  // }
}

export interface Config {
 url: string;
 usr: string;
 pwd: string;
}

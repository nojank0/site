import { Injectable, OnInit, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class OpHttpService {

  baseURL = ""
  boundConfig = <Config>{}

  constructor(private http: HttpClient) {
   if (isDevMode()) {
    this.baseURL = "http://localhost:8080/ctl"
   } else {
    this.baseURL = "https://nojank.com/ctl"
   }
  }

  getConfig() {
    let options = {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    this.http.get<Config>(this.baseURL + "/getConfig", options)
    .subscribe(
      config => {
        this.boundConfig = config
      },
      error => {
        this.boundConfig = {ssn: error.message, env: "Error 530", url: this.baseURL, usr: "", pwd: ""}
      }
    )
  }
}

// Companion: code/ctl/src/main/kotlin/com/nojank/model/RedisConfig
export interface Config {
 ssn: String;
 env: String;
 url: string;
 usr: string;
 pwd: string;
}

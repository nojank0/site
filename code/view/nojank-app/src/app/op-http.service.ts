import { Injectable, OnInit, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class OpHttpService {

  configURL = ""
  boundConfig = <Config>{}

  constructor(private http: HttpClient) {
   if (isDevMode()) {
    this.configURL = "http://localhost:8080/ctl/getConfig"
   } else {
    this.configURL = "https://nojank.com/ctl/getConfig"
   }
  }

  getConfig() {
    let options = {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    this.http.get<Config>(this.configURL, options)
    .subscribe(
      config => {
        this.boundConfig = config
      },
      error => {
        this.boundConfig = {ssn: error.message, env: "Error 530", url: this.configURL, usr: "", pwd: ""}
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

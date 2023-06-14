import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class OpHttpService {

  configURL = "http://localhost:8080/getConfig"
  boundConfig = <Config>{}

  constructor(private http: HttpClient) { }

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
        this.boundConfig = {ssn: error.message, url: "", usr: "", pwd: ""}
      }
    )
  }
}

// Companion: code/ctl/src/main/kotlin/com/nojank/model/RedisConfig
export interface Config {
 ssn: String;
 url: string;
 usr: string;
 pwd: string;
}

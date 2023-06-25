import { Injectable, OnInit, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class OpHttpService {

  baseURL = ""
  boundSessionConfig = <SessionConfig>{}


  errorMessage = ""
  sessionCount = ""

  constructor(private http: HttpClient) {
   if (isDevMode()) {
    this.baseURL = "http://localhost:8080/ct"
   } else {
    this.baseURL = "https://nojank.com/ct"
   }
  }

  getSessionConfig() {
    console.log('getting session config.')
    let options = {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    this.http.get<SessionConfig>(this.baseURL + "/getSessionConfig", options)
    .subscribe(
      sessionConfig => {
        this.boundSessionConfig = sessionConfig
      },
      error => {
        this.boundSessionConfig = {ssn: "Controller server is down, please try refreshing this page later.", ipa: "", env: "", url: "", usr: "", pwd: ""}
      }
    )
    // TODO: This seems separate?
    this.http.get<string>(this.baseURL + "/getSessionCount", options)
    .subscribe(
     sessionCount => {
      this.sessionCount = sessionCount
     }
    )

    this.http.get<string>(this.baseURL + "/ip", options)
    .subscribe(
     ipa => {
      this.boundSessionConfig.ipa = ipa
     }
    )
  }

  putSessionConfig() {
    this.http.put<any>(this.baseURL + "/putSessionConfig", this.boundSessionConfig)
    .subscribe(
      data => {
      },
      error => {
        this.errorMessage = error.message;
      }
    )
  }

 getSessionCount(): String {
  return "foo"
 }

 submitSessionConfigForm(redisUrl: string, redisUsr: string, redisPwd: string) {
  this.boundSessionConfig.url = redisUrl
  this.boundSessionConfig.usr = redisUsr
  this.boundSessionConfig.pwd = redisPwd
  this.putSessionConfig()
 }
}

// Companion: code/ctl/src/main/kotlin/com/nojank/model/SessionConfig
export interface SessionConfig {
 ssn: String;
 ipa: String;
 env: String;
 url: String;
 usr: String;
 pwd: String;
}

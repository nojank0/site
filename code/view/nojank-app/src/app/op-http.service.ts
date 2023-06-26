import { Injectable, OnInit, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class OpHttpService {

  baseURL = ""
  ctPath = "/ct"
  ipPath = ""
  boundSessionConfig = <SessionConfig>{}


  errorMessage = ""
  sessionCount = ""

  constructor(private http: HttpClient) {
   if (isDevMode()) {
    this.baseURL = "http://localhost:8080"
    this.ipPath = "/ct/ip"
   } else {
    this.baseURL = "https://nojank.com"
    this.ipPath = "/ip"
   }
  }

  getSessionConfig() {
    console.log('getting session config.')
    let options = {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    this.http.get<SessionConfig>(this.baseURL + this.ctPath + "/getSessionConfig", options)
    .subscribe(
      sessionConfig => {
        this.boundSessionConfig.ssn = sessionConfig.ssn
        this.boundSessionConfig.env = sessionConfig.env
        this.boundSessionConfig.url = sessionConfig.url
        this.boundSessionConfig.usr = sessionConfig.usr
        this.boundSessionConfig.pwd = sessionConfig.pwd
      },
      error => {
        this.boundSessionConfig = {ssn: "Controller server is down, please try refreshing this page later.", ipa: "", env: "", url: "", usr: "", pwd: ""}
      }
    )

    this.http.get<Ip>(this.baseURL + this.ipPath, options)
    .subscribe(
     ip => {
      this.boundSessionConfig.ipa = ip.ip
      console.log("yyy ip is " + this.boundSessionConfig.ipa)
     }
    )
    console.log('Finished getting session config.')
  }

  putSessionConfig() {
    this.http.put<any>(this.baseURL + this.ctPath + "/putSessionConfig", this.boundSessionConfig)
    .subscribe(
      data => {
      },
      error => {
        this.errorMessage = error.message;
      }
    )
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
 ssn: String
 ipa: String
 env: String
 url: String
 usr: String
 pwd: String
}

export interface Ip {
 ip: String
}

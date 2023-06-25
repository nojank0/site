import { Injectable, OnInit, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class OpHttpService {

  baseURL = ""
  boundConfig = <RedisConfig>{}
  errorMessage = ""
  sessionCount = ""

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
    this.http.get<RedisConfig>(this.baseURL + "/getRedisConfig", options)
    .subscribe(
      config => {
        this.boundConfig = config
      },
      error => {
        this.boundConfig = {ssn: "Controller server is down, please try refreshing this page later.", env: "", url: "", usr: "", pwd: ""}
      }
    )
    this.http.get<string>(this.baseURL + "/getSessionCount", options)
    .subscribe(
     sessionCount => {
      this.sessionCount = sessionCount
     }
    )
  }

  putConfig() {
    this.http.put<any>(this.baseURL + "/putRedisConfig", this.boundConfig)
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

 submitRedisForm(redisUrl: string, redisUsr: string, redisPwd: string) {
  this.boundConfig.url = redisUrl
  this.boundConfig.usr = redisUsr
  this.boundConfig.pwd = redisPwd
  this.putConfig()
 }


}

// Companion: code/ctl/src/main/kotlin/com/nojank/model/RedisConfig
export interface RedisConfig {
 ssn: String;
 env: String;
 url: String;
 usr: String;
 pwd: String;
}

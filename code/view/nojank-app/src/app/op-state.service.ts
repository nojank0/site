import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OpStateService {
 isCtlPrinterTheme = false
 isCtlOverrideRedis = false
 public redisUrl = ''
 public redisUsr = ''
 public redisPwd = ''
}

import { Injectable } from '@angular/core';
import { Inject }  from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { NjOptionsComponent } from './nj-options/nj-options.component';
import { OpStateService } from './op-state.service';

@Injectable({
  providedIn: 'root'
})


export class OpRedisService {
 DEFAULT_IN_USE = 'Default redis cache in use'
 OVERRIDE_CONFIG = 'Redis cache override specified, but not configured yet.  Default redis cache still in use'
 USE_YOUR_OWN = 'Use your own Redis cache.'
 USE_DEFAULT = 'Use default Redis cache.'
 opStateService: OpStateService
 redisCacheChoiceLabel: string = this.USE_YOUR_OWN
 redisCacheInUseLabel: string = this.DEFAULT_IN_USE


 constructor(@Inject(DOCUMENT) private doc: Document,
 @Inject(OpStateService) opStateService: OpStateService) {
  this.opStateService = opStateService
 }

 submitRedisForm(redisUrl: string, redisUsr: string, redisPwd: string) {
  this.opStateService.redisUrl = redisUrl
  this.opStateService.redisUsr = redisUsr
  this.opStateService.redisPwd = redisPwd
 }

 reportChangeCtlOverrideRedis(value: boolean) {
  this.opStateService.isCtlOverrideRedis = value
  if (value) {
   this.redisCacheInUseLabel = this.OVERRIDE_CONFIG
   this.redisCacheChoiceLabel = this.USE_DEFAULT
  } else {
   this.redisCacheInUseLabel = this.DEFAULT_IN_USE
   this.redisCacheChoiceLabel = this.USE_YOUR_OWN
  }
 }
}

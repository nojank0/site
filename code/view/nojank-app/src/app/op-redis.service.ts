import {Injectable} from '@angular/core';
import {Inject} from '@angular/core'
import {DOCUMENT} from '@angular/common'
import {NjOptionsComponent} from './nj-options/nj-options.component';
import {OpStateService} from './op-state.service';
import {OpHttpService} from './op-http.service';

@Injectable({
  providedIn: 'root'
})


export class OpRedisService {
  DEFAULT_IN_USE = 'Default redis cache in use'
  OVERRIDE_CONFIG = 'Redis cache override specified, but not configured yet.  Default redis cache still in use'
  USE_YOUR_OWN = 'Use your own Redis cache.'
  USE_DEFAULT = 'Use default Redis cache.'
  opStateService: OpStateService
  opHttpService: OpHttpService
  redisCacheChoiceLabel: string = this.USE_YOUR_OWN
  redisCacheInUseLabel: string = this.DEFAULT_IN_USE
  currentRedisCache: string = "Loading from prefs..."


  constructor(@Inject(DOCUMENT) private doc: Document,
              @Inject(OpStateService) opStateService: OpStateService,
              @Inject(OpHttpService) opHttpService: OpHttpService,) {
    this.opStateService = opStateService
    this.opHttpService = opHttpService
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

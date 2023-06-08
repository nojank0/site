import { Component } from '@angular/core'
import { Inject }  from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ChangeDetectorRef } from '@angular/core';
import { OpThemeService } from '../op-theme.service';
import { OpRedisService } from '../op-redis.service';
import { OpStateService } from '../op-state.service';

// Make this into a service later.
//import { HttpClient } from '@angular/common/http';

import * as njg from '../globals';

@Component({
 selector: 'app-nj-config',
 templateUrl: './nj-options.component.html'
})

export class NjOptionsComponent {
 nj_current_page = 'options'
 opStateService: OpStateService
 opThemeService: OpThemeService
 opRedisService: OpRedisService

 configForm = new FormGroup({
  redisUrl: new FormControl(''),
  redisUsr: new FormControl(''),
  redisPwd: new FormControl('')
 });

 constructor(@Inject(DOCUMENT) private doc: Document,
  @Inject(OpStateService) opStateService: OpStateService,
  @Inject(OpThemeService) opThemeService: OpThemeService,
  @Inject(OpRedisService) opRedisService: OpRedisService,
  private ref: ChangeDetectorRef ) {
   this.opStateService = opStateService
   this.opThemeService = opThemeService
   this.opRedisService = opRedisService
   opThemeService.updateTheme(document)
   this.ref.markForCheck();
 }

 onChangeCtlTheme(value: boolean) {
  this.opThemeService.reportChangeCtlTheme(this.doc, value)
 }

 onChangeCtlOverrideRedis(value: boolean) {
  this.opRedisService.reportChangeCtlOverrideRedis(value)
 }

 submitConfigForm() {
  //HttpClient.get<RedisConfig>(njg.backEnd)
  //console.log(this.configForm.value.redisUrl)
 }
}

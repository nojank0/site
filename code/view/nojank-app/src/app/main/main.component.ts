import { Component, Input, ViewChild, AfterViewInit} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NjNavComponent } from '../nj-nav/nj-nav.component';
import { OpThemeService } from '../op-theme.service';
import * as njg from '../globals';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements AfterViewInit {
 @ViewChild(NjNavComponent) njnc!: NjNavComponent

 nj_current_page = 'home';
 njtitle = njg.title
 countDownsOutput = 'Loading countdown data...'

 constructor(@Inject(DOCUMENT) document: Document, 
  @Inject(OpThemeService) private opThemeService: OpThemeService,
  private domSanitizer: DomSanitizer) {
  opThemeService.updateTheme(document)
 }

 ngAfterViewInit() {
  this.updateCountdown()
 }

 getCountdowns(): SafeHtml {
  return this.domSanitizer.bypassSecurityTrustHtml(this.countDownsOutput)
 }

 private yyyyMMddhh2date(nr: string): Date {
  var targetYear = nr.substring(0,4)
  var targetMonth = nr.substring(4,6)
  var targetDay = nr.substring(6,8)
  var targetMinute = nr.substring(8,10)
  return new Date(
          parseInt(targetYear),
          parseInt(targetMonth) - 1,
          parseInt(targetDay),
          parseInt(targetMinute))
 }

private updateCountdown() {
 setInterval(() => {
  this.countDownsOutput = ''
  if (this.njnc == null) {
  } else {
   for (var i = 0; i < njg.countDowns.length; i++ ) {
    this.countDownsOutput += njg.countDowns[i][0]
    this.countDownsOutput += this.calculateCountdown(this.njnc.myDate, this.yyyyMMddhh2date(njg.countDowns[i][1]))
    this.countDownsOutput += ', until '
    if (njg.countDowns[i][3].length > 0) {
     this.countDownsOutput += '<a class="mdc-button mat-mdc-button mat-primary mat-mdc-button-base" ng-reflect-color="primary" aria-disabled="false" mat-button-is-fab="false" href="'
      + njg.countDowns[i][3] + '">' + njg.countDowns[i][2] + '</a>'
    } else {
     this.countDownsOutput += njg.countDowns[i][2]
    }
    this.countDownsOutput += '<br/>'
   }
  }
 }, 1000);
}

 private calculateCountdown(now: Date, releaseDate: Date): string {
  var timeRemaining = releaseDate.getTime() - now.getTime();
  var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  return '' + days.toLocaleString() + ' ' + this.appendSifNeeded(days, 'day') + ', '
  + hours + ' ' + this.appendSifNeeded(hours, 'hour') + ', '
  + minutes + ' ' + this.appendSifNeeded(minutes, 'minute') + ', and '
  + seconds + ' ' + this.appendSifNeeded(seconds, 'second');
 }

 private appendSifNeeded(value: number, label: string): string {
  if (value == 1) {
   return label
  }
  return label + 's'
 }
}

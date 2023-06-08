import { Component, Input } from '@angular/core';
import { Inject }  from '@angular/core';

@Component({
  selector: 'app-nj-nav',
  templateUrl: './nj-nav.component.html',
  styleUrls: ['./nj-nav.component.scss']
})

export class NjNavComponent {

 public myDate: Date = new Date();
 @Input() nj_current_page = ''

 ngOnInit(): void {
  this.utcTime();
 }

 figureOutBtnColor(linkName: string): string {
  if (linkName == this.nj_current_page) {
    return "accent"
  } else {
    return "primary"
  }
 }

 utcTime(): void {
  setInterval(() => {
   this.myDate = new Date();
  }, 1000);
 }
}


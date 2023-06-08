import { Component } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NjNavComponent } from '../nj-nav/nj-nav.component';
import { OpThemeService } from '../op-theme.service';
import * as njg from '../globals';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent {
  nj_current_page = 'about';
  njtitle = njg.title

 constructor(@Inject(DOCUMENT) private doc: Document, @Inject(OpThemeService) private opThemeService: OpThemeService) {
  opThemeService.updateTheme(doc)
 }
}


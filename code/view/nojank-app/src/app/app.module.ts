import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NjNavComponent } from './nj-nav/nj-nav.component';
import { NjOptionsComponent } from './nj-options/nj-options.component';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
   AppComponent,
   AboutComponent,
   MainComponent,
   NjNavComponent,
   NjOptionsComponent
  ],
  imports: [
   CommonModule,
   ReactiveFormsModule,
   MatSlideToggleModule,
   MatTabsModule,
   MatButtonModule,
   MatInputModule,
   MatFormFieldModule,
   BrowserModule,
   HttpClientModule,
   RouterModule.forRoot([
        {path: '', component: MainComponent},
        {path: 'options', component: NjOptionsComponent},
        {path: 'about', component: AboutComponent}
      ]),
   BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

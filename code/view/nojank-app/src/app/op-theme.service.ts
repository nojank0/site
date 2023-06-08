import { Injectable } from '@angular/core';
import { Inject }  from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { OpStateService } from './op-state.service';

@Injectable({
  providedIn: 'root'
})

export class OpThemeService {
 opStateService: OpStateService

 prtVwLabel: string = 'Print'

 constructor(@Inject(DOCUMENT) private doc: Document,
 @Inject(OpStateService) opStateService: OpStateService) {
  this.opStateService = opStateService
 }

 setPrinterTheme(doc: Document, value: boolean) {
  this.opStateService.isCtlPrinterTheme = value
  this.updateTheme(doc)
 }

 updateTheme(doc: Document) {
  if (this.opStateService.isCtlPrinterTheme) {
   doc.documentElement.classList.remove('screenMode')
   doc.documentElement.classList.add('printMode')
  } else {
   doc.documentElement.classList.remove('printMode')
   doc.documentElement.classList.add('screenMode')
  }
 }

 updateLabels() {
  if (this.opStateService.isCtlPrinterTheme) {
   this.prtVwLabel = 'Browse'
  } else {
   this.prtVwLabel = 'Print'
  }
 }

 reportChangeCtlTheme(doc: Document, value: boolean) {
  this.setPrinterTheme(doc, value)
  this.updateLabels()
 }
}

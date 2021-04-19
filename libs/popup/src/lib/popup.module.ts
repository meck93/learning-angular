import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupComponent } from './popup/popup.component';
import { PopupService } from './popup/popup.service';

// TODO: ask @fueg how and what to export/declare
// also, see app.module.ts
@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, CommonModule],
  providers: [
    PopupService,
    { provide: PopupComponent, useValue: PopupComponent },
  ],
  exports: [PopupComponent],
  declarations: [PopupComponent],
})
export class PopupModule {}

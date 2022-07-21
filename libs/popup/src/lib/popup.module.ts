import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupComponent } from './popup/popup.component';
import { PopupService } from './popup/popup.service';

// TODO: ask @fueg how and what to export/declare
// also, see app.module.ts
@NgModule({
  imports: [BrowserAnimationsModule, CommonModule],
  providers: [PopupService],
  exports: [PopupComponent],
  declarations: [PopupComponent],
})
export class PopupModule {}

// google if this is allowed inside module.ts
export { PopupComponent, PopupService };

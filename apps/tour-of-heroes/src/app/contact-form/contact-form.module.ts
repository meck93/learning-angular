import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactFormRoutingModule } from './contact-form-routing.module';
import { ContactFormComponent } from './contact-form.component';

@NgModule({
  declarations: [ContactFormComponent],
  imports: [CommonModule, ContactFormRoutingModule, FormsModule],
})
export class ContactFormModule {}

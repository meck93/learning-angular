import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterFormComponent } from './newsletter-form.component';
import { NewsletterFormRoutingModule } from './newsletter-form-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewsletterFormComponent],
  imports: [CommonModule, NewsletterFormRoutingModule, ReactiveFormsModule],
})
export class NewsletterFormModule {}

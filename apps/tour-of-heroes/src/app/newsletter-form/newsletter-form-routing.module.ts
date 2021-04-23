import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsletterFormComponent } from '../newsletter-form/newsletter-form.component';

const routes: Routes = [
  { path: 'newsletter', component: NewsletterFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsletterFormRoutingModule {}

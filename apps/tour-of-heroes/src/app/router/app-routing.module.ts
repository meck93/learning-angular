import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeroDetailComponent } from '../heroes/hero-detail/hero-detail.component';
import { HeroesComponent } from '../heroes/heroes.component';
import { NewsletterFormComponent } from '../newsletter-form/newsletter-form.component';
import { RouteGuard } from './route-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'contact', component: ContactFormComponent },
  { path: 'newsletter', component: NewsletterFormComponent },
  {
    path: 'heroes',
    component: HeroesComponent,
  },
  {
    path: 'heroes/:id',
    canActivate: [RouteGuard],
    component: HeroDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

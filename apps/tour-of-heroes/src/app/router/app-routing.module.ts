import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeroDetailComponent } from '../heroes/hero-detail/hero-detail.component';
import { HeroesComponent } from '../heroes/heroes.component';
import { RouteGuard } from './route-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'heroes',
    component: HeroesComponent,
  },
  {
    path: 'heroes/:id',
    canActivate: [RouteGuard],
    component: HeroDetailComponent,
  },
  {
    path: 'newsletter',
    loadChildren: () =>
      import('../newsletter-form/newsletter-form.module').then(
        (m) => m.NewsletterFormModule
      ),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('../contact-form/contact-form.module').then(
        (m) => m.ContactFormModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

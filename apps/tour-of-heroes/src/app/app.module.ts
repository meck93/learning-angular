import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiModule } from '@nx-app/ui';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { HeroSearchComponent } from './heroes/hero-search/hero-search.component';
import { HeroesComponent } from './heroes/heroes.component';
import { InMemoryDataService } from './inMemoryServer/in-memory-data.service';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { NewsletterFormModule } from './newsletter-form/newsletter-form.module';
import { AppRoutingModule } from './router/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    LoginComponent,
    ContactFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    UiModule,
    HttpClientModule,
    NewsletterFormModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

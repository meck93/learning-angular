import { Component } from '@angular/core';

@Component({
  selector: 'nx-app-root',
  template: `
    <div class="layout">
      <div class="flex pb-2">
        <h1>Welcome to {{ title }}!</h1>
        <div class="nav-bar">
          <nav>
            <a routerLink="/dashboard">Dashboard</a>
            <a routerLink="/heroes">Heroes</a>
          </nav>
          <nx-app-login></nx-app-login>
        </div>
      </div>
      <router-outlet></router-outlet>
      <nx-app-messages></nx-app-messages>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Tour of Heroes';
}

import { Component } from '@angular/core';

@Component({
  selector: 'nx-app-root',
  template: `
    <div class="layout">
      <h1>Welcome to {{ title }}!</h1>
      <nav>
        <a routerLink="/dashboard">Dashboard</a>
        <a routerLink="/heroes">Heroes</a>
      </nav>
      <router-outlet></router-outlet>
      <nx-app-messages></nx-app-messages>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Tour of Heroes';
}

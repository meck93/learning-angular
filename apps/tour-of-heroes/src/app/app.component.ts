import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { PopupComponent, PopupService } from '@nx-app/popup';

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
      <input #input value="Message" />
      <button (click)="showAsComponent(input.value)">Show as component</button>
      <button (click)="showAsElement(input.value)">Show as element</button>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Tour of Heroes';
  private elementName = 'popup-element';

  constructor(injector: Injector, private popup: PopupService) {
    // Convert `PopupComponent` to a custom element.
    const PopupElement = createCustomElement(PopupComponent, { injector });
    // Register the custom element with the browser.
    customElements.define(this.elementName, PopupElement);
  }

  showAsComponent(input: string) {
    this.popup.showAsComponent(input);
  }

  showAsElement(input: string) {
    this.popup.showAsElement(input);
  }
}

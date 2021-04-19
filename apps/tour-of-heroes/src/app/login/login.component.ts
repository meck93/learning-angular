import { Component } from '@angular/core';
import { AuthService } from '../inMemoryServer/auth.service';

@Component({
  selector: 'nx-app-login',
  template: `
    <div>
      <button (click)="onClick()">{{ buttonName }}</button>
    </div>
  `,
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  buttonName = 'Login';

  constructor(private authService: AuthService) {}

  async onClick() {
    const authenticated = await this.authService.isAuthenticated();
    if (authenticated) {
      this.onLogout();
    } else {
      this.onLogin();
    }
  }

  private onLogin() {
    this.authService.login();
    this.buttonName = 'Logout';
  }

  private onLogout() {
    this.authService.logout();
    this.buttonName = 'Login';
  }
}

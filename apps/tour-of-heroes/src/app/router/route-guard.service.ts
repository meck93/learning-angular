import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../inMemoryServer/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService
      .isAuthenticated()
      .then((authenticated: boolean) => authenticated)
      .catch(() => false);
  }

  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService
      .isAuthenticated()
      .then((authenticated: boolean) => authenticated)
      .catch(() => false);
  }
}

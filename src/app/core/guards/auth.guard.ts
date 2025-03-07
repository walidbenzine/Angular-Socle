import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RolesEnum } from '../../shared/enums/roles.enum';
import { RolesService } from '../services/roles.service';
import { RoutesEnum } from '../../shared/enums/routes.enum';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  
  private authService = inject(AuthService);
  private rolesService = inject(RolesService);
  private routerService = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const roles: RolesEnum[] = route.data['roles'];

    if (roles) {
      return roles.some(r => this.rolesService.isRole(r)) || this.routeToPage(RoutesEnum.HOME);
    }

    return this.checkAuth(route.data['shouldBeAuth']);
  }

  private checkAuth(shouldBeAuth: boolean = true): boolean {
    if (shouldBeAuth) {
        return this.authService.isAuthenticated() || this.routeToPage(RoutesEnum.LOGIN);
    } else {
        return !this.authService.isAuthenticated() || this.routeToPage(RoutesEnum.HOME);
    }
  }

  private routeToPage(page: RoutesEnum): boolean {
    this.routerService.navigate([page]);
    return false;
  }
}
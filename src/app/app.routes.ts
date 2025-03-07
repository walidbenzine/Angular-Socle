import { Routes } from '@angular/router';
import { RoutesEnum } from './shared/enums/routes.enum';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeResolver } from './core/resolvers/home.resolver';

export const routes: Routes = [
  {
    path: '**',
    redirectTo: RoutesEnum.LOGIN,
    pathMatch: 'full'
  },
  {
    path: RoutesEnum.LOGIN,
    canActivate: [AuthGuard],
    data: { shouldBeAuth: false },
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: RoutesEnum.REGISTER,
    canActivate: [AuthGuard],
    data: { shouldBeAuth: false },
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: RoutesEnum.FORGOT_PASSWORD,
    canActivate: [AuthGuard],
    data: {shouldBeAuth: false},
    loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
  },
  {
    path: `${RoutesEnum.RESET_PASSWORD}/:token`,
    canActivate: [AuthGuard],
    data: {shouldBeAuth: false},
    loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
  },
  {
    path: RoutesEnum.HOME,
    resolve: [HomeResolver],
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
];

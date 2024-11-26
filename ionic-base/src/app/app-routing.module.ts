import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
 { path: '', redirectTo: 'login', pathMatch: 'full' },
 {
  path: 'login',
  loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
  title: 'Login',
 },
 {
  path: 'register',
  loadChildren: () => import('./pages/register/register.module').then((m) => m.RegisterPageModule),
  title: 'Register',
 },
 {
  path: 'home',
  loadChildren: () => import('./pages/home/home.module').then((m) => m.HomePageModule),
  canActivate: [authGuard],
  title: 'Home',
 },
 {
  path: 'pickup-call',
  loadChildren: () => import('./pages/pickup-call/pickup-call.module').then((m) => m.PickupCallPageModule),
  canActivate: [authGuard],
  title: 'Detail',
 },
 {
  path: 'pickup-calls',
  loadChildren: () => import('./pages/pickup-calls/pickup-calls.module').then((m) => m.PickupCallsPageModule),
  canActivate: [authGuard],
  title: 'Pickup calls',
 },
 {
  path: 'forgot-password',
  loadChildren: () => import('./pages/forgot-password/forgot-password.module').then((m) => m.ForgotPasswordPageModule),
  title: 'Forgot password',
 },
 {
  path: 'reset-password/:token',
  loadChildren: () => import('./pages/reset-password/reset-password.module').then((m) => m.ResetPasswordPageModule),
  title: 'Reset password',
 },
];

@NgModule({
 imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
 exports: [RouterModule],
})
export class AppRoutingModule {}

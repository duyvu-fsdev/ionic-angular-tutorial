import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AppState } from 'src/app/NgRx/store/AppState';
import { AuthState, reqPwReset, reqPwResetFail, reqPwResetSuccess } from 'src/app/NgRx/store/auth/auth.slice';
import { hide, show } from 'src/app/NgRx/store/loading/loading.slice';
import { AuthService } from 'src/app/services/auth.service';

@Component({
 selector: 'app-forgot-password',
 templateUrl: './forgot-password.page.html',
 styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
 form: FormGroup;

 authStateSubscription!: Subscription;

 constructor(
  private toastController: ToastController,
  private store: Store<AppState>,
  private router: Router,
  private formBuilder: FormBuilder,
  private authService: AuthService,
 ) {
  this.form = this.formBuilder.group({
   email: ['duyvu.fullstackdev@gmail.com', [Validators.required, Validators.email]],
  });
 }

 ngOnInit() {
  this.authStateSubscription = this.store
   .select('auth')
   .pipe(map((state) => state))
   .subscribe((authState) => this.authStateTracking(authState));
 }

 authStateTracking(authState: AuthState) {
  if (authState.isRequestingPwReset) this.store.dispatch(show());
  else this.store.dispatch(hide());
  if (authState.isRequestingPwReset) this.onIsRequestingPwReset();
  if (authState.isRequestedPwReset) this.onIsRequestedPwReset(authState);
  if (authState.errorReqPwReset) this.onIsReqPwResetFail(authState);
 }

 onIsRequestingPwReset() {
  this.authService.forgotPassword(this.form.value).subscribe(
   (res) => this.store.dispatch(reqPwResetSuccess({ messReqPwReset: res.message })),
   (e) => this.store.dispatch(reqPwResetFail({ errorReqPwReset: e.error.errors })),
  );
 }

 onIsRequestedPwReset(authState: AuthState) {
  this.presentToast(authState.messReqPwReset || 'success', 'success');
 }

 onIsReqPwResetFail(authState: AuthState) {
  this.presentToast(authState.errorReqPwReset.errorMessages, 'danger');
 }

 async presentToast(
  message: string,
  color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark',
 ) {
  const toast = await this.toastController.create({
   message,
   duration: 1500,
   position: 'bottom',
   color,
  });
  await toast.present();
 }

 forgotPassword() {
  if (this.form.valid) this.store.dispatch(reqPwReset());
 }

 goToPage(page: string) {
  this.router.navigate([page]);
 }

 get e() {
  return this.form.get('email');
 }

 ngOnDestroy(): void {
  this.authStateSubscription.unsubscribe();
 }
}

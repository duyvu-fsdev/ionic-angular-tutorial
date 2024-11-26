import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { LoginInfor, User } from 'src/app/models/user';
import { AppState } from 'src/app/NgRx/store/AppState';
import { AuthState, resetPw, resetPwFail, resetPwSuccess } from 'src/app/NgRx/store/auth/auth.slice';
import { hide, show } from 'src/app/NgRx/store/loading/loading.slice';
import { AuthService } from 'src/app/services/auth.service';

@Component({
 selector: 'app-reset-password',
 templateUrl: './reset-password.page.html',
 styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
 form: FormGroup;
 authStateSubscription!: Subscription;
 loginInfor!: LoginInfor;
 currentUser!: User;

 constructor(
  private toastController: ToastController,
  private store: Store<AppState>,
  private router: Router,
  private formBuilder: FormBuilder,
  private authService: AuthService,
  private activedRoute: ActivatedRoute,
 ) {
  this.form = this.formBuilder.group(
   {
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
   },
   { validator: this.confirmPasswordMatch },
  );
 }
 confirmPasswordMatch(group: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = group.get('password');
  const confirmPasswordControl = group.get('confirmPassword');
  if (passwordControl?.valid && confirmPasswordControl?.valid) {
   const password = passwordControl.value;
   const confirmPassword = confirmPasswordControl.value;
   if (password !== confirmPassword) {
    return { passwordMismatch: true };
   }
  }
  return null;
 }

 ngOnInit() {
  this.authStateSubscription = this.store
   .select('auth')
   .pipe(map((state) => state))
   .subscribe((authState) => this.authStateTracking(authState));
 }

 authStateTracking(authState: AuthState) {
  if (authState.isResettingPw) this.store.dispatch(show());
  else this.store.dispatch(hide());
  if (authState.isResettingPw) this.onIsResettingPw();
  if (authState.isResetPw) this.onIsRisResetPw(authState);
  if (authState.errorResetPw) this.onIsResetPwFail(authState);
 }

 onIsResettingPw() {
  this.authService.resetPassword(this.form.value, this.activedRoute.snapshot.paramMap.get('token') as string).subscribe(
   (res) => this.store.dispatch(resetPwSuccess({ messResetPw: res.message })),
   (e) => this.store.dispatch(resetPwFail({ errorResetPw: e.error.errors })),
  );
 }

 onIsRisResetPw(authState: AuthState) {
  this.presentToast(authState.messResetPw || 'success', 'success');
 }

 onIsResetPwFail(authState: AuthState) {
  this.presentToast(authState.errorResetPw.errorMessages, 'danger');
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

 handleResetPw() {
  if (this.form.valid) this.store.dispatch(resetPw());
 }

 goToPage(page: string) {
  this.router.navigate([page]);
 }

 get f() {
  return this.form;
 }

 ngOnDestroy(): void {
  this.authStateSubscription.unsubscribe();
 }
}

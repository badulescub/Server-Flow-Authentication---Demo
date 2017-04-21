import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'login-page app'
  }
})
export class LoginComponent {
  
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;

  busy = false;
  loginFailed = false;
  loginState = 'login';
  
  constructor(

    private formBuilder: FormBuilder,
    private router: Router) {

        this.buildForm();
    }

    buildForm(): void {
        this.loginForm = this.formBuilder.group({
            'userName': [null, Validators.required],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            'rememberMe': false
        });

        this.forgotPasswordForm = this.formBuilder.group({
            'userName': [null, Validators.required]
        });

        this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }

    onValueChanged(data: any): void {
        this.loginFailed = false;
    }

    loginWithFacebook(): void {
        this.busy = true;
        //this.authentication.login('facebook', null).then(() =>
        //{
        //    this.router.navigate(['/app', 'dashboard']);
        //});
    }

    loginWithGoogle(): void {
        this.busy = true;
        //this.authentication.login('google', null).then(() => {
        //    this.router.navigate(['/app', 'dashboard']);
        //});
    }

    loginWithTwitter(): void {
        this.busy = true;
        //this.authentication.login('twitter', null).then(() => {
        //    this.router.navigate(['/app', 'dashboard']);
        //});
    }

    loginWithUserName(value: any): void {
        this.busy = true;
        if (this.loginForm.invalid) return;

        // let user = new AuthenticationUser();
        // user.userName = value.userName;
        // user.password = value.password;
        // user.rememberMe = value.rememberMe;

        //this.authentication.login('custom', user)
        //.then(() => {
        //    this.router.navigate(['/app', 'dashboard']);
        //})
        //.catch((reason) => {
        //    console.log(reason);
        //    this.busy = false;
        //    this.loginFailed = true;
        //});
    }

    forgotPassword(value: string): void {

    }
}

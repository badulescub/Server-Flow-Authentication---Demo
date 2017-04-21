"use strict";
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var app_config_1 = require("../app.config");
var Login = (function () {
    function Login(config, formBuilder, router) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.busy = false;
        this.loginFailed = false;
        this.loginState = 'login';
        this.config = config.getConfig();
        this.buildForm();
    }
    Login.prototype.buildForm = function () {
        var _this = this;
        this.loginForm = this.formBuilder.group({
            'userName': [null, forms_1.Validators.required],
            'password': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5)])],
            'rememberMe': false
        });
        this.forgotPasswordForm = this.formBuilder.group({
            'userName': [null, forms_1.Validators.required]
        });
        this.loginForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
    };
    Login.prototype.onValueChanged = function (data) {
        this.loginFailed = false;
    };
    Login.prototype.loginWithFacebook = function () {
        this.busy = true;
        //this.authentication.login('facebook', null).then(() =>
        //{
        //    this.router.navigate(['/app', 'dashboard']);
        //});
    };
    Login.prototype.loginWithGoogle = function () {
        this.busy = true;
        //this.authentication.login('google', null).then(() => {
        //    this.router.navigate(['/app', 'dashboard']);
        //});
    };
    Login.prototype.loginWithTwitter = function () {
        this.busy = true;
        //this.authentication.login('twitter', null).then(() => {
        //    this.router.navigate(['/app', 'dashboard']);
        //});
    };
    Login.prototype.loginWithUserName = function (value) {
        this.busy = true;
        if (this.loginForm.invalid)
            return;
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
    };
    Login.prototype.forgotPassword = function (value) {
    };
    return Login;
}());
Login = __decorate([
    core_1.Component({
        selector: 'login',
        styleUrls: ['./login.style.scss'],
        templateUrl: './login.template.html',
        encapsulation: core_1.ViewEncapsulation.None,
        host: {
            class: 'login-page app'
        }
    }),
    __metadata("design:paramtypes", [app_config_1.AppConfig,
        forms_1.FormBuilder,
        router_1.Router])
], Login);
exports.Login = Login;
//# sourceMappingURL=login.component.js.map
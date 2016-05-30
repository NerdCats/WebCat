"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var app_settings_1 = require('../shared/app.settings');
var signup_component_1 = require('../account/signup/signup.component');
var NavbarComponent = (function () {
    function NavbarComponent() {
        this.isCollapsed = false;
        this.AppTitle = app_settings_1.AppSettings.APP_NAME;
    }
    NavbarComponent.prototype.showSignUpComponent = function () {
        this.signUpComponent.open();
    };
    __decorate([
        core_1.ViewChild('signup'), 
        __metadata('design:type', signup_component_1.SignupComponent)
    ], NavbarComponent.prototype, "signUpComponent", void 0);
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'navbar',
            templateUrl: 'app/navbar/navbar.component.html',
            directives: [ng2_bootstrap_1.CollapseDirective, signup_component_1.SignupComponent],
            styleUrls: ['app/navbar/navbar.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;

//# sourceMappingURL=navbar.component.js.map

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
var platform_browser_1 = require('@angular/platform-browser');
var router_deprecated_1 = require('@angular/router-deprecated');
var app_settings_1 = require('./shared/app.settings');
var WrapHeader_component_1 = require('./wrapHeader/WrapHeader.component');
var navbar_component_1 = require('./navbar/navbar.component');
var AppComponent = (function () {
    function AppComponent(title) {
        this.isCollapsed = false;
        title.setTitle(app_settings_1.AppSettings.APP_NAME);
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'webcat',
            templateUrl: 'app/app.component.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, navbar_component_1.NavbarComponent, WrapHeader_component_1.WrapHeaderComponent],
            providers: [router_deprecated_1.ROUTER_PROVIDERS, platform_browser_1.Title]
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/',
                name: 'Home',
                component: WrapHeader_component_1.WrapHeaderComponent,
                useAsDefault: true
            }
        ]), 
        __metadata('design:paramtypes', [platform_browser_1.Title])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.component.js.map

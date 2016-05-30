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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var app_settings_1 = require('../../shared/app.settings');
var AccountService = (function () {
    function AccountService(http) {
        this.http = http;
        this.accountUrl = app_settings_1.AppSettings.TASKCAT_API_BASE + 'account'; // URL to web API
    }
    AccountService.prototype.register = function (registration) {
        var body = JSON.stringify(registration);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.accountUrl + "/register", body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AccountService.prototype.check = function (propertyName, suggestedValue) {
        return this.http.get(this.accountUrl + '/check?' + propertyName + "=" + suggestedValue)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AccountService.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        var body = res.json();
        return body || {};
    };
    AccountService.prototype.handleError = function (error) {
        // We should use a remote logging infrastructure
        var errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Rx_1.Observable.throw(errMsg);
    };
    AccountService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;

//# sourceMappingURL=account.service.js.map

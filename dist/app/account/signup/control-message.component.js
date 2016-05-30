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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var validation_service_1 = require('../shared/validation.service');
var ControlMessage = (function () {
    function ControlMessage(_formDir) {
        this._formDir = _formDir;
    }
    Object.defineProperty(ControlMessage.prototype, "controlMessage", {
        get: function () {
            var control = this._formDir.form.find(this.controlName);
            if (control.dirty && !control.valid) {
                var selectedErrorProperty = void 0;
                for (var propertyName in control.errors) {
                    if (control.errors.hasOwnProperty(propertyName)) {
                        selectedErrorProperty = propertyName;
                    }
                }
                if (selectedErrorProperty) {
                    return validation_service_1.ValidationService.getValidatorErrorMessage(selectedErrorProperty);
                }
                else {
                    return "Checking..";
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    ControlMessage = __decorate([
        core_1.Component({
            selector: 'control-message',
            inputs: ['controlName: control'],
            template: "<div *ngIf=\"controlMessage !== null\" class=\"alert alert-info\">\n                    {{controlMessage}}\n               </div>"
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [common_1.NgFormModel])
    ], ControlMessage);
    return ControlMessage;
}());
exports.ControlMessage = ControlMessage;

//# sourceMappingURL=control-message.component.js.map

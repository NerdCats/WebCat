import { Component, Host } from '@angular/core';
import { NgFormModel } from '@angular/common';
import { ValidationService } from '../shared/validation.service';

@Component({
    selector: 'control-message',
    inputs: ['controlName: control'],
    template: `<div *ngIf="controlMessage !== null" class="alert alert-{{controlMessageType}} alert_control_msg">
                    {{controlMessage}}
               </div>`,
    styleUrls: ['app/account/signup/signup.component.css']
})
export class ControlMessage {
    controlName: string;
    constructor( @Host() private _formDir: NgFormModel) { }

    public get controlMessage() {
        var message = this.getControlMessage();
        return message.message;
    }

    public get controlMessageType() {
        var message = this.getControlMessage();
        return message.type;
    }

    public getControlMessage() {
        let control = this._formDir.form.find(this.controlName);

        if (control.dirty && !control.valid) {
            let selectedErrorProperty: string;
            for (let propertyName in control.errors) {
                if (control.errors.hasOwnProperty(propertyName)) {
                    selectedErrorProperty = propertyName;
                }
            }
            if (selectedErrorProperty) {
                return {
                    message: ValidationService.getValidatorErrorMessage(selectedErrorProperty),
                    type: 'danger'
                };
            }
            else {
                return {
                    message: "Checking...",
                    type: 'info'
                };
            }
        }
        return {
                    message: null,
                    type: null
                };
    }
}
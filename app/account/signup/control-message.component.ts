import { Component, Host } from '@angular/core';
import { NgFormModel } from '@angular/common';
import { ValidationService } from '../shared/validation.service';

interface IControlMessage {
    message: string,
    type: string
}

@Component({
    selector: 'control-message',
    inputs: ['controlName: control'],
    template: `<div *ngIf="ControlMessage !== null" class="alert alert-{{ControlMessage.type}} alert_control_msg">
                    {{ControlMessage.message}}
               </div>`,
    styleUrls: ['app/account/signup/signup.component.css']
})
export class ControlMessage {
    controlName: string;
    constructor( @Host() private _formDir: NgFormModel) { }

    public get ControlMessage(): IControlMessage {
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
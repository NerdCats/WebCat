import { Component, Host } from '@angular/core';
import { NgFormModel } from '@angular/common';
import { ValidationService } from '../shared/validation.service';

@Component({
    selector: 'control-message',
    inputs: ['controlName: control'],
    template: `<div *ngIf="controlMessage !== null" class="alert alert-info">
                    {{controlMessage}}
               </div>`
})
export class ControlMessage {
    controlName: string;
    constructor( @Host() private _formDir: NgFormModel) { }

    public get controlMessage() {
        let control = this._formDir.form.find(this.controlName);

        if (control.dirty) {
            let selectedErrorProperty: string;
            for (let propertyName in control.errors) {
                if (control.errors.hasOwnProperty(propertyName)) {
                    selectedErrorProperty = propertyName;
                }
            }
            if (selectedErrorProperty) {
                return ValidationService.getValidatorErrorMessage(selectedErrorProperty);
            }
            else {
                return "Checking..";
            }
        }
        return null;
    }
}
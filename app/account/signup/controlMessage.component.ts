import { Component, Host } from '@angular/core';
import { NgFormModel } from '@angular/common';
import { ValidationService } from '../shared/validation.service';

@Component({
    selector: 'control-message',
    inputs: ['controlName: control'],
    template: `<div *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ControlMessage {
    controlName: string;
    constructor( @Host() private _formDir: NgFormModel) { }

    public get ErrorMessage() {
        let c = this._formDir.form.find(this.controlName);

        for (let propertyName in c.errors) {
            if (c.errors.hasOwnProperty(propertyName) && c.touched) {
                return ValidationService.getValidatorErrorMessage(propertyName);
            }
        }

        return null;
    }
}
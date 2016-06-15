import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Control} from '@angular/common';

export class AsyncValidator {
    _validate;

    constructor(validator: (control: Control) => any, debounceTime = 1000) {
        let source: any = new Observable((observer: Observer<Control>) => {
            this._validate = (control) => observer.next(control);
        });

        source.debounceTime(debounceTime)
            .distinctUntilChanged(null, (x) => x.control.value)
            .map(x => { return { promise: validator(x.control), resolver: x.promiseResolver }; })
            .subscribe(
            (x) => x.promise.then(resultValue => x.resolver(resultValue),
                (e) => { console.log('async validator error: %s', e); }));
    }

    private _getValidator() {
        return (control) => {
            let promiseResolver;
            let p = new Promise((resolve) => {
                promiseResolver = resolve;
            });
            this._validate({ control: control, promiseResolver: promiseResolver });
            return p;
        };
    }

    static debounce(validator: (control: Control) => any, debounceTime = 800) {
        var asyncValidator = new this(validator, debounceTime);
        return asyncValidator._getValidator();
    }
}
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[catShowPassword]',
    host: {
        '(mousedown)' : 'mouseDown()',
        '(mouseup)' : 'mouseUp()',
    }
})
export class CatShowPassword{

    private el: HTMLElement;
    constructor(el: ElementRef){
        this.el = el.nativeElement;
    }

    mouseDown() {
        document.getElementById('sign-up-password').setAttribute('type', 'text');
        console.log(document.getElementById('sign-up-password'));
    }

    mouseUp() {
        document.getElementById('sign-up-password').setAttribute('type', 'password');
    }
}
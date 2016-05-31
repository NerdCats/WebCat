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
        console.log(this.passwordInputId);
    }
    @Input("catShowPassword")  passwordInputId : string;
    mouseDown() {
        document.getElementById(this.passwordInputId).setAttribute('type', 'text');
    }
    mouseUp() {
        document.getElementById(this.passwordInputId).setAttribute('type', 'password');
    }
}
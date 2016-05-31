import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[ncShowPassword]'
})
export class NcShowPassword {
    private el: HTMLElement;
    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    @Input("ncPasswordControl") passwordInputId: string;

    @HostListener('mousedown') onMouseDown() {
        document.getElementById(this.passwordInputId).setAttribute('type', 'text');
    }

    @HostListener('mouseup') onMouseUp() {
        document.getElementById(this.passwordInputId).setAttribute('type', 'password');
    }
}
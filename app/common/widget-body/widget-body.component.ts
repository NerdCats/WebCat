import {Component, Input} from '@angular/core';

@Component({
    selector: 'widget-body',
    properties: ['loading', 'classes'],
    templateUrl: 'app/common/widget-body/widget-body.component.html'
})
export class WidgetBodyComponent {
    @Input()
    classes: string;

    constructor() {
        this.classes = '';
    }
}
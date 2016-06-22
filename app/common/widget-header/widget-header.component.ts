import {Component, Input} from '@angular/core';

@Component({
    selector: 'widget-header',
    templateUrl: 'app/common/widget-header/widget-header.component.html'
})
export class WidgetHeaderComponent {
    @Input()
    title: string;

    @Input()
    icon: string;

    constructor() {
        this.title = "";
        this.icon = "";
    }
}

import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class DashboardBusService {
    // Observable string sources
    private dashboardSectionChangedSource = new Subject<string>();

    // Observable string streams
    sectionChangeAnnounced$ = this.dashboardSectionChangedSource.asObservable();

    constructor() {}

    annouceSectionChange(newSectionName: string) {
        this.dashboardSectionChangedSource.next(newSectionName);
    }
}
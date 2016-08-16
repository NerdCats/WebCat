
import { WrapHeaderComponent } from '../wrapHeader/wrapHeader.component';
import { ConfirmEmailComponent } from '../account/confirm-email/confirm-email.component';

import { JobTrackComponent } from '../job/job-track/job-track.component';


import { OrderComponent } from '../dashboard/order/order.component';


import {JobHistoryComponent} from '../job/job-history/job-history.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {VendorDetailsComponent} from '../vendor-details/vendor-details.component';


export const Routes = [
    {
        path: '/home',
        name: 'Home',
        component: WrapHeaderComponent,
        useAsDefault: true
    },
    {
        path: '/confirmEmail',
        name: 'ConfirmEmail',
        component: ConfirmEmailComponent
    },
    {
        path: '/track/:jobId',
        name: 'Track',
        component: JobTrackComponent
    },
    {
        path: '/dashboard/...',
        name: 'Dashboard',
        component: DashboardComponent
    },
    {
        path: '/vendors/:vendorId',
        name: 'VendorDetails',
        component: VendorDetailsComponent
    }
]

export const PublicRoutes = [
    'home',
    'confirmEmail'
]
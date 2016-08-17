
import { WrapHeaderComponent } from '../wrapHeader/wrapHeader.component';
import { ConfirmEmailComponent } from '../account/confirm-email/confirm-email.component';

import { JobTrackComponent } from '../job/job-track/job-track.component';


import { OrderComponent } from '../dashboard/order/order.component';


import {JobHistoryComponent} from '../job/job-history/job-history.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {FrontComponent} from '../front/front.component';

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
        path: '/front/:frontId',
        name: 'frontDetails',
        component: FrontComponent
    }
]

export const PublicRoutes = [
    'home',
    'confirmEmail'
]
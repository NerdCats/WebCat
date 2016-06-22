import { WrapHeaderComponent } from '../wrapHeader/wrapHeader.component';
import { ConfirmEmailComponent } from '../account/confirm-email/confirm-email.component';
import { OrderComponent } from '../order/order.component';
import { JobTrackComponent } from '../job/job-track/job-track.component';

import {JobHistoryComponent} from '../job/job-history/job-history.component';
import {DashboardComponent} from '../dashboard/dashboard.component';

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
        path: '/order',
        name: 'Order',
        component: OrderComponent,
    },
    {

        path: '/job',
        name: 'Job',
        component: JobHistoryComponent

    },
    {
        path: '/track/:jobId',
        name: 'Track',
        component: JobTrackComponent
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent
    }
]

export const PublicRoutes = [
    '',
    'confirmEmail'
]
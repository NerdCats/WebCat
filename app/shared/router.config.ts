import {WrapHeaderComponent} from '../wrapHeader/wrapHeader.component';
import {ConfirmEmailComponent} from '../account/confirm-email/confirm-email.component';

import { OrderComponent } from '../order/order.component';

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
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent
    }
]

export const PublicRoutes = [
    'home',
    'confirmEmail'
]
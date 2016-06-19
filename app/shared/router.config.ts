import {WrapHeaderComponent} from '../wrapHeader/wrapHeader.component';
import {ConfirmEmailComponent} from '../account/confirm-email/confirm-email.component';

import { OrderComponent } from '../order/order.component';

import {JobHistoryComponent} from '../job/job-history/job-history.component';


export const Routes = [
    {
        path: '/',
        name: 'Home',
        component: WrapHeaderComponent,
    },
    {
        path: '/confirmEmail',
        name: 'ConfirmEmail',
        component: ConfirmEmailComponent,
        useAsDefault: true
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

    }
]

export const PublicRoutes = [
    '',
    'confirmEmail'
]
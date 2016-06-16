import {WrapHeaderComponent} from '../wrapHeader/wrapHeader.component';
import {ConfirmEmailComponent} from '../account/confirm-email/confirm-email.component';

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
    }
]

export const PublicRoutes = [
     '',
     'confirmEmail'
]
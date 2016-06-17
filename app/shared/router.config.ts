import {WrapHeaderComponent} from '../wrapHeader/wrapHeader.component';
import {ConfirmEmailComponent} from '../account/confirm-email/confirm-email.component';

export const Routes = [
    {
        path: '/',
        name: 'Home',
        component: WrapHeaderComponent,
    },
    {
        path: '/confirm',
        name: 'ConfirmEmail',
        component: ConfirmEmailComponent,
        useAsDefault: true
    }
]
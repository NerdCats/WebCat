import {UserRegistrationBase} from './user-registration-base';
import {UserTypes} from './user-types';

export class UserRegistration extends UserRegistrationBase {
    public InterestedLocalities: Array<string>;

    constructor() {
        super();
        this.InterestedLocalities = new Array<string>();
        this.Type = UserTypes.TYPE_USER;
    }
}
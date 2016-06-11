import {UserRegistrationBase} from './user-registration-base';
import {UserTypes} from './user-types';

export class EnterpriseUserRegistration extends UserRegistrationBase {
    ContactPersonName: string;
    Website: string;

    constructor() {
        super();
        this.Type = UserTypes.TYPE_ENTERPRISE;
    }
}
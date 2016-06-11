import {UserRegistrationBase} from './user-registration-base';

export class UserRegistration extends UserRegistrationBase {
    public InterestedLocalities: Array<string>;

    constructor() {
        super();
        this.InterestedLocalities = new Array<string>();
        this.Type = "USER";
    }
}
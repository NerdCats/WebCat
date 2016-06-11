import {DefaultAddress} from '../../shared/geocoding.defaultAddress';

export class UserRegistrationBase {
    public UserName: string;
    public Password: string;
    public ConfirmPassword: string;
    public Email: string;
    public PhoneNumber: string;

    public Type: string;

    constructor() {}
}
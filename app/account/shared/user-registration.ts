import {DefaultAddress} from '../../shared/geocoding.defaultAddress';

export class UserRegistration {
    public UserName: string;
    public Password: string;
    public ConfirmPassword: string;
    public Email: string;
    public PhoneNumber: string;
    public InterestedLocalities: Array<string>;

    public Type: string;

    constructor() {
        this.InterestedLocalities = new Array<string>();
    }
}
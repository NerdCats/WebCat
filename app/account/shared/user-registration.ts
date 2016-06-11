import {DefaultAddress} from '../../shared/geocoding.defaultAddress';

export class UserRegistration {
    public UserName: string;
    public Password: string;
    public ConfirmPassword: string;
    public Email: string;
    public PhoneNumber: string;
    public Address: DefaultAddress;
    public InterestedLocalities: Array<string>;

    constructor() {
        this.Address = new DefaultAddress();
        this.InterestedLocalities = new Array<string>();
    }
}
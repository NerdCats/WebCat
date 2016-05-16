import { UserBase } from './user.base';

export class User extends UserBase{
    public UserName:string;
    public PhoneNumberConfirmed: boolean;
    public EmailConfirmed: boolean;
    public Profile: any; // FIXME: Currently we dont have a profile implementation here, when we need it we'll add it
}
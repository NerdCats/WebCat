export interface UserModelBase {
    UserId: string;
    Type: string;
    PhoneNumber: string;
    Email: string;
}

export interface UserModel extends UserModelBase {
    UserName: string;
    PhoneNumberConfirmed: boolean;
    EmailConfirmed: boolean;
    Profile: Object;
}
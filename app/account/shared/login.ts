/**
 * Login
 */
export class Login {
    public UserName: string;
    public Password: string;
    public GrantType: string;
    public ClientId: string;

    constructor() {
        this.GrantType = "password";
        this.ClientId = "GoFetchDevWebApp";
    }
}
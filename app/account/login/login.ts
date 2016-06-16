/**
 * Login Model
 */
export class Login {
    public UserName: string;
    public Password: string;
    public GrantType: string;
    public ClientId: string;

    constructor(grantType: string, clientId: string) {
        this.GrantType = grantType;
        this.ClientId = clientId;
    }
}
export class DefaultAddress {
    public PostalCode: string;
    public Floor: string;
    public HouseNumber: string;
    public Address: string;
    public AddressLine1: string;
    public AddressLine2: string;
    public Country: string;
    public City: string;
    public State: string;
    public Locality: string;
    public Point: GeoPoint;
    constructor(){
        this.Point = new GeoPoint();
        // INFO: This is a blatant hack
        this.City = "Dhaka";
    }
}

export class GeoPoint{
    public type:string;
    public coordinates: number[];
}
import { DefaultAddress } from './geocoding.defaultAddress'

export class OrderModel {
    public NoteToDeliveryMan: string;
    public RequiredChangeFor: string;
    public Name: string;
    public From: DefaultAddress;
    public To: DefaultAddress;
    public Type: string;
    public PayloadType: string;
    public UserId: string;
    public OrderLocation: string;
    public ETA: string;
    public ETAMinutes: number;
    public PaymentMethod: string;
    public Description: string;
    public OrderCart: OrderCartModel;
    constructor() {
        this.From = new DefaultAddress();
        this.To = new DefaultAddress();
        this.OrderCart = new OrderCartModel();
    }
}


export class OrderCartModel {
    public PackageList: PackageListModel[];
    public TotalVATAmount: number;
    public SubTotal: number;
    public ServiceCharge: number;
    public TotalWeight: number;
    public TotalToPay: number;
    constructor() {

    }
}

export class PackageListModel {
    public Item: string;
    public PicUrl: string;
    public Quantity: number;
    public Price: number;
    public VAT: number;
    public Total: number;
    public VATAmount: number;
    public TotalPlusVAT: number;
    public Weight: number;
    constructor() {

    }
}
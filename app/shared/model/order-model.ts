import { DefaultAddress } from './geocoding.defaultAddress'

export class OrderModel {
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
    public ReferenceInvoiceId: string;
    public OrderCart: OrderCartModel;
    public JobTaskETAPreference: JobTaskETAPreferenceModel[];


    public NoteToDeliveryMan: string;
    public RequiredChangeFor: string;

    public SellerInfo: PersonInfo;
    public BuyerInfo: PersonInfo;

    constructor() {
        this.From = new DefaultAddress();
        this.To = new DefaultAddress();
        this.OrderCart = new OrderCartModel();
        this.Description = '';
        this.PayloadType = "default";
        this.SellerInfo = new PersonInfo();
        this.BuyerInfo = new PersonInfo();

        this.PaymentMethod = "CashOnDelivery";
    }
}


export class OrderCartModel {
    public PackageList: PackageListModel[];
    public TotalVATAmount: number = 0;
    public SubTotal: number = 0;
    public ServiceCharge: number = 0;
    public TotalWeight: number = 0;
    public TotalToPay: number = 0;
    constructor() {
        this.PackageList = [];
        this.ServiceCharge = 0;
    }
}

export class PackageListModel {
    public Item: string;
    public PicUrl: string;
    public Quantity: number = 0;
    public Price: number = 0;
    public VAT: number = 0;
    public Total: number = 0;
    public VATAmount: number = 0;
    public TotalPlusVAT: number = 0;
    public Weight: number = 0;
    constructor() {
        this.Item = null;
        this.Quantity = 1;
        this.Price = 0;
    }
}


export class JobTaskETAPreferenceModel {
    public Type: string;
    public ETA: Date;
    constructor(type, eta){
        this.Type = type;
        this.ETA = eta;
    }
}

export class PersonInfo {
    public UserRef : string;
    public Name : string;
    public Address : DefaultAddress;
    public PhoneNumber : string;
    constructor(){
        this.Address = new DefaultAddress();
    }
}

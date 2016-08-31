import { DefaultAddress } from './geocoding.defaultAddress';

export class Vendor {
    id: number;
    name: string;
    username: string;
    address: DefaultAddress;
    phone_number: string;
    isOpen: boolean;
    products: any[];
    image: string;
    catagories: Catagory[];
}

export class Catagory {
    catagory: string;
    itemlist: Item[];
}

export class Item {
    item: string;
    price: number;
    description: string;
}
import { DefaultAddress } from './geocoding.defaultAddress';

export class Vendor {
    id: number;
    name: string;
    address: DefaultAddress;
    phone_number: string;
    isOpen: boolean;
    products: any[];
    image: string;
}
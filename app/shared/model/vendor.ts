import { DefaultAddress } from './geocoding.defaultAddress';

export class Vendor {

    StoreName: string = "Not Found";
    Address: string = "";
    Type: string = "";
    products: any[] = [];
    Image: string = "";
    ProductCategories: string[] = [];
    SupportedAreas: string[] = [];
    Products: Product[] = [];
}

export class Product {
    Name: string;
    Price: number;
    ProductCategories: string[];
}

export class Item {
    item: string;
    price: number;
    description: string;
    image: string;
}
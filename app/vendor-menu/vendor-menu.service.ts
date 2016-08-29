import { Injectable } from '@angular/core';
import { Vendor } from '.././shared/model/vendor';
import { MockVendors } from '.././shared/mock-vendors';

@Injectable()
export class VendorDetailsService {
    selectedVendor:Vendor;

    vendorDetails = {
        name: "Pop up Pizza",
        address: "1 S Main St, Las Vegas, NV",
        catagories: [
            {
                catagory: "SIGNATURE PIZZAS",
                itemlist: [
                {
                    item: "The 18 lb.",
                    price: 14
                },
                {
                    item: "The Main St",
                    price: 15.99
                },
                {
                    item: "The Goodman",
                    price: 19.99
                },
                {
                    item: "The Newport",
                    price: 19.99
                },
                {
                    item: "The Hawaiian",
                    price: 19.99
                },
                {
                    item: "The White Chape",
                    price: 21.99
                },
                {
                    item: "The Plaza",
                    price: 21.99
                },
                {
                    item: "TheScintas",
                    price: 21.99
                },
                {
                    item: "The Soho",
                    price: 24.99
                },
                {
                    item: "TheWestern",
                    price: 21.99
                }
            ]
            },
            {
                catagory: "BIG PIZZAS",
                itemlist: [
                {
                    item: "The 18 lb.",
                    price: 14.99
                },
                {
                    item: "The Main St",
                    price: 15.99
                },
                {
                    item: "The Goodman",
                    price: 19.99
                },
                {
                    item: "The Newport",
                    price: 19.99
                },
                {
                    item: "The Hawaiian",
                    price: 19.99
                },
                {
                    item: "The White Chape",
                    price: 21.99
                },
                {
                    item: "The Plaza",
                    price: 21.99
                },
                {
                    item: "TheScintas",
                    price: 21.99
                },
                {
                    item: "The Soho",
                    price: 24.99
                },
                {
                    item: "TheWestern",
                    price: 21.99
                }
            ]
            },
            {
                catagory: "SMALL PIZZAS",
                itemlist: [
                {
                    item: "The 18 lb.",
                    price: 14.99
                },
                {
                    item: "The Main St",
                    price: 15.99
                },
                {
                    item: "The Goodman",
                    price: 19.99
                },
                {
                    item: "The Newport",
                    price: 19.99
                },
                {
                    item: "The Hawaiian",
                    price: 19.99
                },
                {
                    item: "The White Chape",
                    price: 21.99
                },
                {
                    item: "The Plaza",
                    price: 21.99
                },
                {
                    item: "TheScintas",
                    price: 21.99
                },
                {
                    item: "The Soho",
                    price: 24.99
                },
                {
                    item: "TheWestern",
                    price: 21.99
                }
            ]
            }
        ]
    }

    getVendorDetails(vendorName: string){

        MockVendors.VENDORS.forEach(vendor => {
            if(vendor.name == vendorName)
            {
                this.selectedVendor = vendor;
            }
        })
        return this.selectedVendor;
    }
}
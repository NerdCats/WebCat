import { Injectable } from '@angular/core';

@Injectable()
export class VendorDetailsService {
    vendorDetails = {
        name: "Pop up Pizza",
        address: "1 S Main St, Las Vegas, NV",
        catagories: [
            {
                catagory: "SIGNATURE PIZZAS",
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

    getVendorDetails(){
        return this.vendorDetails;
    }
}
import { Injectable } from '@angular/core';
import { MockVendors } from '../shared/mock-vendors';
// import { Vendor } from '../shared/model/vendor';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class SearchResultService {

    // private Vendors: Vendor[];

    constructor(private http: Http) {}
    public search(area:string, keyword:string){

        // this.Vendors = [];

        // this.getVendors().forEach(vendor=>{
        //     if(vendor.address.Locality===area){
        //         for(let i=0; i < vendor.products.length; i++){
        //             if(vendor.products[i]===keyword){
        //                 this.Vendors.push(vendor);
        //                 console.log("keyword : " + keyword + "   maching : " + vendor.products[i]);
        //                 break;
        //             }
        //         }
        //     }
        // });

        return this.http.get("http://gobdsif.cloudapp.net/api/store-search?area="+area+"&keyword="+keyword)
                .map((res: Response) => {
                    let stores:any = res.json();
                    return stores;
                })
                .catch(error=>{
                    return Observable.throw(error);
                })
    }

    private getVendors() {
        return MockVendors.VENDORS;
    }
}
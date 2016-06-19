import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AppSettings } from '../shared/app.settings';
import { SecureHttp } from '../shared/secure-http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { OrderModel } from '../shared/order-model'


@Injectable()
export class OrderService {
    private url = AppSettings.TASKCAT_API_BASE;

    constructor(private http: SecureHttp) {
    }

    createOrder(order: OrderModel) {
        let orderPostUrl = this.url + "Order/";
        let orderJson = JSON.stringify(order);

        return this.http.securePost(orderPostUrl, orderJson)
            .map((res: Response) => {
                if (res.status < 200 || res.status >= 300) {
                    throw new Error("Response status: " + res.status);
                }
                return res;
            })
            .catch((error: Response) => {
                console.log(error)
                return  this._extractOrderCreationError(error);
            });
    }

    private _extractOrderCreationError(res: Response){
        let error = res.json();
        console.log(error);
        console.log(error.ModelState["model.From.AddressLine1"]);
        let errorMsg = error.Message || "Server error";
        if (error.ModelState) {
            errorMsg += "<ul>";
            if (error.ModelState["model.From.AddressLine1"]) {
                var err = error.ModelState["model.From.AddressLine1"][0];
                errorMsg += "<li>" + "Pickup Address is required" + "</li>";
            }
            if (error.ModelState["model.To.AddressLine1"]) {
                var err = error.ModelState["model.To.AddressLine1"][0];
                errorMsg += "<li>" + "Delivery Address is required" + "</li>";
            }
            if (error.ModelState["model.OrderCart.PackageList[0].Item"]) {
                var err = error.ModelState["model.OrderCart.PackageList[0].Item"][0];
                errorMsg += "<li>" + err + "</li>";
            }
            if (error.ModelState["model.OrderCart.PackageList[0].Quantity"]) {
                var err = error.ModelState["model.OrderCart.PackageList[0].Quantity"][0];
                errorMsg += "<li>" + err + "</li>";
            }
            if (error.ModelState["model.PaymentMethod"]) {
                var err = error.ModelState["model.PaymentMethod"][0];
                errorMsg += "<li>" + err + "</li>";
            }





            errorMsg += "</ul>";
        }
        return Observable.throw(errorMsg)
    }
}
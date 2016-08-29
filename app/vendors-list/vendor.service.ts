import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { MockVendors } from '../shared/mock-vendors';

@Injectable()
export class VendorService {

    public getVendors() {
        return MockVendors.VENDORS;
    }
}
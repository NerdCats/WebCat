import { Injectable } from '@angular/core';

import { VENDORS } from './mock-vendors';

@Injectable()
export class VendorService {
    getVendors() {
        return Promise.resolve(VENDORS);
    }
}
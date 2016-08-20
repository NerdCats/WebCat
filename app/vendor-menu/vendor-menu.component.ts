import { Component, ViewChild, OnInit } from "@angular/core";
import { VendorDetailsService } from "./vendor-menu.service";
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


@Component({
    selector: 'vendor-menu',
    templateUrl: 'app/vendor-menu/vendor-menu.component.html',
    styleUrls: ['app/vendor-menu/vendor-menu.component.css'],
    directives: [MODAL_DIRECTIVES, ModalComponent],
    providers: [VendorDetailsService]
})



export class VendorMenuComponent implements OnInit {
    vendor: any;

    ngOnInit(){
        this.vendor = this.vendorDetailsService.vendorDetails;
    }

    constructor(private vendorDetailsService: VendorDetailsService){

    }
    @ViewChild('cartModal')
    cartModal: ModalComponent;
    openCartModal(){
        this.cartModal.open();
    }
    closeCartModal(){
        this.cartModal.close();
    }

}
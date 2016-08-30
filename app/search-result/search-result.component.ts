import { Component, OnInit } from '@angular/core';
import { Router, RouteParams, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { Vendor } from '../shared/model/vendor';
import { SearchResultService } from './search-result.service';

@Component({
    selector: 'search-result',
    templateUrl: 'app/search-result/search-result.component.html',
    styleUrls: ['app/search-result/search-result.component.css'],
    providers: [SearchResultService]
})


export class SearchResultComponent implements OnInit {
    vendors: Vendor[] = [];
    area: string;
    keyword: string;
    ngOnInit(){
        this.vendors = this._searchResultService.getVendors();
        this.area = this._routeParams.get('area');
        this.keyword = this._routeParams.get('keyword');
        console.log(this.area + "  " + this.keyword);
    }

    constructor(private _router: Router,
                private _routeParams: RouteParams,
                private _searchResultService: SearchResultService){

    }

    goToVendorMenu(vendorName){
        this._router.navigateByUrl("/vendors/" + vendorName);
    }
}
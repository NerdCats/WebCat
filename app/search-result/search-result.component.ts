import { Component, OnInit } from '@angular/core';
import { Router, RouteParams, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
// import { Vendor } from '../shared/model/vendor';
import { SearchResultService } from './search-result.service';

@Component({
    selector: 'search-result',
    templateUrl: 'app/search-result/search-result.component.html',
    styleUrls: ['app/search-result/search-result.component.css'],
    providers: [SearchResultService]
})


export class SearchResultComponent implements OnInit {
    vendors: any = [];
    area: string;
    keyword: string;
    ngOnInit(){
        this.area = this._routeParams.get('area');
        this.keyword = this._routeParams.get('keyword');
        this._searchResultService.search(this.area, this.keyword)
            .subscribe(stores=>{
                this.vendors = stores.data;
                console.log(this.vendors)
            }, error => {

            })
    }

    constructor(private _router: Router,
                private _routeParams: RouteParams,
                private _searchResultService: SearchResultService){

    }
}
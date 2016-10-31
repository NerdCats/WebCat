import { Component, OnInit } from '@angular/core';
import { Router, RouteParams, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { SearchResultService } from './search-result.service';
import { ProgressBubbleComponent } from './../common/progress-bubble/progress-bubble.component'
import { ComponentServiceStatus } from './../shared/component-service-status';
import { CartBusService } from '../cart/cart-bus.service';
import { CartSidebarComponent } from '../cart/cart-sidebar/cart-sidebar.component';

@Component({
    selector: 'search-result',
    templateUrl: 'app/search-result/search-result.component.html',
    styleUrls: ['app/search-result/search-result.component.css'],
    providers: [SearchResultService, CartBusService],
    directives: [ProgressBubbleComponent, CartSidebarComponent]
})


export class SearchResultComponent implements OnInit {
    vendors: any = [];
    area: string;
    keyword: string;
    status: ComponentServiceStatus;
    ngOnInit(){
        this.status = "IN_PROGRESS";
        this.area = this._routeParams.get('area');
        this.keyword = this._routeParams.get('keyword');
        this._searchResultService.search(this.area, this.keyword)
            .subscribe(stores=>{
                this.vendors = stores.data;
                this.status = "SUCCESSFUL";
            }, error => {

            })
    }

    constructor(private _router: Router,
                private _routeParams: RouteParams,
                private _searchResultService: SearchResultService){

    }

    getImage(index: number){
        let images = ['http://i.imgur.com/9Cfolu9.jpg',
                        'http://imgur.com/DvmzsbV.jpg',
                        'http://imgur.com/DvmzsbV.jpg',
                        'http://i.imgur.com/iW1euxZ.jpg',
                        'http://i.imgur.com/C1fbSZc.jpg',
                        'http://i.imgur.com/1LGNGv8.jpg',
                        'http://i.imgur.com/OrYcw8i.jpg',
                        'http://i.imgur.com/5ex18sL.jpg',
                        'http://i.imgur.com/DvmzsbV.jpg',
                        'http://i.imgur.com/DvmzsbV.jpg',
                        'http://i.imgur.com/DvmzsbV.jpg',
                        'http://i.imgur.com/DvmzsbV.jpg'
                    ]
        if(index%2 === 0) return images[0];
        if(index%3 === 0) return images[1];
        if(index%5 === 0) return images[2];
        if(index%7 === 0) return images[3];
        if(index%11 === 0) return images[4];
        if(index%13 === 0) return images[5];
        if(index%17 === 0) return images[6];
        if(index%23 === 0) return images[7];
        if(index%29 === 0) return images[8];
        if(index%31 === 0) return images[9];
        if(index%37 === 0) return images[10];

    }
}
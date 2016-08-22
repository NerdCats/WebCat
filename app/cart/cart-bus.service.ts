import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CartBusService {
    // Observable string source
    private cartNumberChangedSource = new Subject<string>();


    // Observable string streams
    cartNumberChangeAnnounced$ = this.cartNumberChangedSource.asObservable();

    announceCartNumberChange(newNumber: string){
        this.cartNumberChangedSource.next(newNumber);
        console.log(newNumber);
    }
}
/**
 * angular2-google-maps - Angular 2 components for Google Maps
 * @version v0.12.0
 * @link https://github.com/SebastianM/angular2-google-maps#readme
 * @license MIT
 */
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SebmGoogleMapCircle } from '../../directives/google-map-circle';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
import * as mapTypes from '../google-maps-types';
export declare class CircleManager {
    private _apiWrapper;
    private _zone;
    private _circles;
    constructor(_apiWrapper: GoogleMapsAPIWrapper, _zone: NgZone);
    addCircle(circle: SebmGoogleMapCircle): void;
    setOptions(circle: SebmGoogleMapCircle, options: mapTypes.CircleOptions): Promise<void>;
    getBounds(circle: SebmGoogleMapCircle): Promise<mapTypes.LatLngBounds>;
    getCenter(circle: SebmGoogleMapCircle): Promise<mapTypes.LatLng>;
    getRadius(circle: SebmGoogleMapCircle): Promise<number>;
    setCenter(circle: SebmGoogleMapCircle): Promise<void>;
    setEditable(circle: SebmGoogleMapCircle): Promise<void>;
    setDraggable(circle: SebmGoogleMapCircle): Promise<void>;
    setVisible(circle: SebmGoogleMapCircle): Promise<void>;
    setRadius(circle: SebmGoogleMapCircle): Promise<void>;
    createEventObservable<T>(eventName: string, circle: SebmGoogleMapCircle): Observable<T>;
}

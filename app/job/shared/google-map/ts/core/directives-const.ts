/**
 * angular2-google-maps - Angular 2 components for Google Maps
 * @version v0.12.0
 * @link https://github.com/SebastianM/angular2-google-maps#readme
 * @license MIT
 */
import {SebmGoogleMap} from './directives/google-map';
import {SebmGoogleMapCircle} from './directives/google-map-circle';
import {SebmGoogleMapInfoWindow} from './directives/google-map-info-window';
import {SebmGoogleMapMarker} from './directives/google-map-marker';

export const GOOGLE_MAPS_DIRECTIVES: any[] =
    [SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow, SebmGoogleMapCircle];

/**
 * angular2-google-maps - Angular 2 components for Google Maps
 * @version v0.12.0
 * @link https://github.com/SebastianM/angular2-google-maps#readme
 * @license MIT
 */
import {provide} from '@angular/core';

import {LazyMapsAPILoader} from './services/maps-api-loader/lazy-maps-api-loader';
import {MapsAPILoader} from './services/maps-api-loader/maps-api-loader';

import {BROWSER_GLOBALS_PROVIDERS} from './utils/browser-globals';

// main modules
export * from './directives';
export * from './services';
export * from './events';

// Google Maps types
export {LatLngBounds, LatLng, LatLngLiteral, MapTypeStyle} from './services/google-maps-types';

export const GOOGLE_MAPS_PROVIDERS: any[] = [
  BROWSER_GLOBALS_PROVIDERS,
  provide(MapsAPILoader, {useClass: LazyMapsAPILoader}),
];

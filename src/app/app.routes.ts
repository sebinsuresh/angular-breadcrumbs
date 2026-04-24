import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ShipmentSearch } from './shipment-search/shipment-search';
import { ShipmentSearchResults } from './shipment-search-results/shipment-search-results';
import { ShipmentDetails } from './shipment-details/shipment-details';
import { Locations } from './locations/locations';
import { LocationDetails } from './location-details/location-details';

export const RouteId = {
  Home: 'home',
  ShipmentSearch: 'shipment-search',
  ShipmentSearchResults: 'shipment-search-results',
  ShipmentDetails: 'shipment-details',
  Locations: 'locations',
  LocationDetails: 'location-details',
} as const;

export type RouteId = (typeof RouteId)[keyof typeof RouteId];

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home, data: { id: RouteId.Home } },
  { path: 'home/shipment-search', component: ShipmentSearch, data: { id: RouteId.ShipmentSearch } },
  { path: 'home/shipment-search/results', component: ShipmentSearchResults, data: { id: RouteId.ShipmentSearchResults } },
  { path: 'home/shipment-search/results/shipment-details', component: ShipmentDetails, data: { id: RouteId.ShipmentDetails } },
  { path: 'home/locations', component: Locations, data: { id: RouteId.Locations } },
  { path: 'home/locations/location-details', component: LocationDetails, data: { id: RouteId.LocationDetails } },
];

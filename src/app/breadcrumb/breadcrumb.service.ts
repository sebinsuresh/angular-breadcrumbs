import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { RouteId } from '../app.routes';

export interface BreadcrumbItem {
  label: string;
  url: string;
  queryParams?: Record<string, string>;
}

interface BreadcrumbRouteConfig {
  breadcrumbIds: RouteId[];
  defaultLabel: string;
  defaultUrl: string;
  label: WritableSignal<string>;
  url: WritableSignal<string>;
}

export const breadcrumbRouteMap: Record<RouteId, BreadcrumbRouteConfig> = {
  [RouteId.Home]: {
    breadcrumbIds: [RouteId.Home],
    defaultLabel: 'Home',
    defaultUrl: '/home',
    label: signal('Home'),
    url: signal('/home'),
  },
  [RouteId.ShipmentSearch]: {
    breadcrumbIds: [RouteId.Home, RouteId.ShipmentSearch],
    defaultLabel: 'Shipment Search',
    defaultUrl: '/home/shipment-search',
    label: signal('Shipment Search'),
    url: signal('/home/shipment-search'),
  },
  [RouteId.ShipmentSearchResults]: {
    breadcrumbIds: [RouteId.Home, RouteId.ShipmentSearch, RouteId.ShipmentSearchResults],
    defaultLabel: 'Shipment Search Results',
    defaultUrl: '/home/shipment-search/results',
    label: signal('Shipment Search Results'),
    url: signal('/home/shipment-search/results'),
  },
  [RouteId.ShipmentDetails]: {
    breadcrumbIds: [RouteId.Home, RouteId.ShipmentSearch, RouteId.ShipmentSearchResults, RouteId.ShipmentDetails],
    defaultLabel: 'Shipment Details',
    defaultUrl: '/home/shipment-search/results/shipment-details',
    label: signal('Shipment Details'),
    url: signal('/home/shipment-search/results/shipment-details'),
  },
  [RouteId.Locations]: {
    breadcrumbIds: [RouteId.Home, RouteId.Locations],
    defaultLabel: 'Locations',
    defaultUrl: '/home/locations',
    label: signal('Locations'),
    url: signal('/home/locations'),
  },
  [RouteId.LocationDetails]: {
    breadcrumbIds: [RouteId.Home, RouteId.Locations, RouteId.LocationDetails],
    defaultLabel: 'Location Details',
    defaultUrl: '/home/locations/location-details',
    label: signal('Location Details'),
    url: signal('/home/locations/location-details'),
  },
};

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private readonly router = inject(Router);

  readonly breadcrumbs = signal<BreadcrumbItem[]>([]);

  constructor() {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event) => {
      const routeId = this.findRouteId(event.urlAfterRedirects);
      if (!routeId) return;

      const routeConfig = breadcrumbRouteMap[routeId];
      routeConfig.url.set(event.urlAfterRedirects);

      this.breadcrumbs.set(
        routeConfig.breadcrumbIds.map((id) => {
          const fullUrl = breadcrumbRouteMap[id].url();
          const [path, queryString] = fullUrl.split('?');

          let queryParams = undefined;
          if (queryString) {
            queryParams = Object.fromEntries(new URLSearchParams(queryString).entries());
          }

          return { label: breadcrumbRouteMap[id].label(), url: path, queryParams };
        }),
      );
    });
  }

  private findRouteId(url: string): RouteId | undefined {
    const path = url.split('?')[0];
    return (Object.keys(breadcrumbRouteMap) as RouteId[]).find((id) => breadcrumbRouteMap[id].defaultUrl === path);
  }
}

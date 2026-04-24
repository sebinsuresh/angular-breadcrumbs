import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { RouteId } from '../app.routes';
import { ShipmentDetailStore } from '../shipment-details/shipment-details.store';
import { ShipmentSearchStore } from '../shipment-search/shipment-search.store';
import { ShipmentDetail } from '../shipment-details/shipment-details.service';

export interface BreadcrumbItem {
  label: string;
  url: string;
  queryParams?: Record<string, string>;
}

interface BreadcrumbRouteConfig {
  breadcrumbIds: RouteId[];
  defaultLabel: string;
  defaultUrl: string;
  label: Signal<string>;
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
  private readonly shipmentSearchStore = inject(ShipmentSearchStore);
  private readonly shipmentDetailStore = inject(ShipmentDetailStore);

  private readonly currentRouteId = signal<RouteId | undefined>(undefined);

  readonly breadcrumbs = computed(() => {
    const routeId = this.currentRouteId();
    if (!routeId) return [];

    const routeConfig = breadcrumbRouteMap[routeId];
    return routeConfig.breadcrumbIds.map((id) => {
      const fullUrl = breadcrumbRouteMap[id].url();
      return { label: breadcrumbRouteMap[id].label(), ...this.parseUrl(fullUrl) };
    });
  });

  constructor() {
    this.initializeBreadcrumbForSearchResults();
    this.initializeBreadcrumbsForShipmentDetails();
    this.setupBreadcrumbUrlUpdates();
  }

  private initializeBreadcrumbForSearchResults() {
    breadcrumbRouteMap[RouteId.ShipmentSearchResults].label = computed(() => {
      const query = this.shipmentSearchStore.query();
      return query ? `Search results for '${query}'` : 'Shipment Search Results';
    });
  }

  private initializeBreadcrumbsForShipmentDetails() {
    breadcrumbRouteMap[RouteId.ShipmentDetails].label = computed(() => {
      const shipment = this.shipmentDetailStore.shipment();
      if (!shipment?.purchaserName) {
        return 'Shipment Details';
      }

      const abbrev = this.getPurchaserNameAbbreviated(shipment);
      return `${abbrev}'s Shipment`;
    });
  }

  private setupBreadcrumbUrlUpdates() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      const routeId = this.findRouteId(event.urlAfterRedirects);
      if (!routeId) return;

      breadcrumbRouteMap[routeId].url.set(event.urlAfterRedirects);
      this.currentRouteId.set(routeId);
    });
  }

  private getPurchaserNameAbbreviated(shipment: ShipmentDetail): string {
    const parts = shipment.purchaserName.trim().split(/\s+/);
    return parts.length >= 2 ? `${parts[0]} ${parts[1][0]}` : parts[0];
  }

  private parseUrl(fullUrl: string): Partial<BreadcrumbItem> {
    const [url, queryString] = fullUrl.split('?');

    let queryParams: Record<string, string> | undefined;
    if (queryString) {
      queryParams = Object.fromEntries(new URLSearchParams(queryString).entries());
    }

    return { url, queryParams };
  }

  private findRouteId(url: string): RouteId | undefined {
    const path = url.split('?')[0];
    const routeIdList = Object.keys(breadcrumbRouteMap) as RouteId[];
    return routeIdList.find((id) => breadcrumbRouteMap[id].defaultUrl === path);
  }
}

import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { RouteId } from '../app.routes';

export interface BreadcrumbItem {
  label: string;
  url: string;
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
  [RouteId.PageOne]: {
    breadcrumbIds: [RouteId.Home, RouteId.PageOne],
    defaultLabel: 'Page One',
    defaultUrl: '/home/page-one',
    label: signal('Page One'),
    url: signal('/home/page-one'),
  },
  [RouteId.PageTwo]: {
    breadcrumbIds: [RouteId.Home, RouteId.PageOne, RouteId.PageTwo],
    defaultLabel: 'Page Two',
    defaultUrl: '/home/page-one/page-two',
    label: signal('Page Two'),
    url: signal('/home/page-one/page-two'),
  },
  [RouteId.PageThree]: {
    breadcrumbIds: [RouteId.Home, RouteId.PageOne, RouteId.PageTwo, RouteId.PageThree],
    defaultLabel: 'Page Three',
    defaultUrl: '/home/page-one/page-two/page-three',
    label: signal('Page Three'),
    url: signal('/home/page-one/page-two/page-three'),
  },
};

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private readonly router = inject(Router);

  readonly breadcrumbs = signal<BreadcrumbItem[]>([]);

  constructor() {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(() => {
      // TODO: build breadcrumbs from current route tree
    });
  }
}

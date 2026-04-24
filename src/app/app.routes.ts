import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PageOne } from './page-one/page-one';
import { PageTwo } from './page-two/page-two';
import { PageThree } from './page-three/page-three';

export const RouteId = {
  Home: 'home',
  PageOne: 'page-one',
  PageTwo: 'page-two',
  PageThree: 'page-three',
} as const;

export type RouteId = (typeof RouteId)[keyof typeof RouteId];

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home, data: { id: RouteId.Home } },
  { path: 'home/page-one', component: PageOne, data: { id: RouteId.PageOne } },
  { path: 'home/page-one/page-two', component: PageTwo, data: { id: RouteId.PageTwo } },
  { path: 'home/page-one/page-two/page-three', component: PageThree, data: { id: RouteId.PageThree } },
];

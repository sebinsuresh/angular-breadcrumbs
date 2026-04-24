import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PageOne } from './page-one/page-one';
import { PageTwo } from './page-two/page-two';
import { PageThree } from './page-three/page-three';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'home/page-one', component: PageOne },
  { path: 'home/page-one/page-two', component: PageTwo },
  { path: 'home/page-one/page-two/page-three', component: PageThree },
];

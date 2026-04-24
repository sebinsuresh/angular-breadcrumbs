import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PageOne } from './page-one/page-one';
import { PageTwo } from './page-two/page-two';
import { PageThree } from './page-three/page-three';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'page-one', component: PageOne },
  { path: 'page-two', component: PageTwo },
  { path: 'page-three', component: PageThree },
];

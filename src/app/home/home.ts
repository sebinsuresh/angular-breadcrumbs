import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Home</h1>
    <ul>
      <li><a routerLink="/home/shipment-search">Shipment Search</a></li>
      <li><a routerLink="/home/locations">Locations</a></li>
    </ul>
  `,
  imports: [RouterLink],
})
export class Home {}

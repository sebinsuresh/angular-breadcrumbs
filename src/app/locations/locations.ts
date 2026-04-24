import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-locations',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Locations</h1>
    <a routerLink="/home/locations/location-details">View Location Details</a>
  `,
  imports: [RouterLink],
})
export class Locations {}

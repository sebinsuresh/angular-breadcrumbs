import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-location-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <h1>Location Details</h1> `,
})
export class LocationDetails {}

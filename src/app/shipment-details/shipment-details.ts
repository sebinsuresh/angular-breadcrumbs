import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { patchState } from '@ngrx/signals';
import { switchMap, map } from 'rxjs';
import { ShipmentDetailsService } from './shipment-details.service';
import { ShipmentDetailStore } from './shipment-details.store';

@Component({
  selector: 'app-shipment-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Shipment Details</h1>
    @if (store.shipment(); as shipment) {
      <dl>
        <dt>ID</dt>
        <dd>{{ shipment.id }}</dd>
        <dt>Description</dt>
        <dd>{{ shipment.description }}</dd>
        <dt>Origin ZIP</dt>
        <dd>{{ shipment.originZip }}</dd>
        <dt>Destination ZIP</dt>
        <dd>{{ shipment.destinationZip }}</dd>
        <dt>Purchaser</dt>
        <dd>{{ shipment.purchaserName }}</dd>
      </dl>
    } @else {
      <p>Loading shipment details…</p>
    }
    <a routerLink="/home/locations/location-details">View Location Details</a>
  `,
  imports: [RouterLink],
})
export class ShipmentDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly shipmentDetailsService = inject(ShipmentDetailsService);
  protected readonly store = inject(ShipmentDetailStore);

  private readonly shipment = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => params.get('id') ?? ''),
      switchMap((id) => this.shipmentDetailsService.getShipmentById(id)),
    ),
  );

  constructor() {
    effect(() => {
      const shipment = this.shipment();
      if (shipment !== undefined) {
        patchState(this.store, { shipment });
      }
    });
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ShipmentSearchService } from '../shipment-search/shipment-search.service';

@Component({
  selector: 'app-shipment-search-results',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Search results for "{{ query() }}"</h1>
    @if (shipments()) {
      <ul>
        @for (shipment of shipments(); track shipment.id) {
          <li>
            <a routerLink="/home/shipment-search/results/shipment-details" [queryParams]="{ id: shipment.id }">
              {{ shipment.id }}
            </a>
            — {{ shipment.description }} ({{ shipment.originZip }} → {{ shipment.destinationZip }})
          </li>
        }
      </ul>
    }
  `,
  imports: [RouterLink],
})
export class ShipmentSearchResults {
  private readonly route = inject(ActivatedRoute);
  private readonly shipmentSearchService = inject(ShipmentSearchService);

  protected readonly query = toSignal(this.route.queryParamMap.pipe(map((params) => params.get('q') ?? '')), {
    initialValue: '',
  });

  protected readonly shipments = toSignal(this.shipmentSearchService.getShipments());
}

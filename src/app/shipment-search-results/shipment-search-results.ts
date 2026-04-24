import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-shipment-search-results',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Search results for "{{ query() }}"</h1>
    <a routerLink="/home/shipment-search/results/shipment-details">View Shipment Details</a>
  `,
  imports: [RouterLink],
})
export class ShipmentSearchResults {
  private readonly route = inject(ActivatedRoute);
  protected readonly query = toSignal(this.route.queryParamMap.pipe(map((params) => params.get('q') ?? '')), {
    initialValue: '',
  });
}

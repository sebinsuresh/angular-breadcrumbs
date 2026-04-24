import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { patchState } from '@ngrx/signals';
import { ShipmentSearchStore } from './shipment-search.store';

@Component({
  selector: 'app-shipment-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Shipment Search</h1>
    <div>
      <label for="search-query">Search query</label>
      <input id="search-query" type="search" [formControl]="queryControl" placeholder="Enter shipment query" />
      <button type="button" (click)="search()">Search</button>
    </div>
  `,
  imports: [ReactiveFormsModule],
})
export class ShipmentSearch {
  private readonly router = inject(Router);
  private readonly store = inject(ShipmentSearchStore);
  protected readonly queryControl = new FormControl('', { nonNullable: true });

  protected search(): void {
    const query = this.queryControl.value;
    patchState(this.store, { query });
    this.router.navigate(['/home/shipment-search/results'], { queryParams: { q: query } });
  }
}

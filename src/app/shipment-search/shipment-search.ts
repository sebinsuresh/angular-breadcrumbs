import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  protected readonly queryControl = new FormControl('', { nonNullable: true });

  protected search(): void {
    this.router.navigate(['/home/shipment-search/results'], { queryParams: { q: this.queryControl.value } });
  }
}

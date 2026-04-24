import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

export interface Shipment {
  id: string;
  description: string;
  originZip: string;
  destinationZip: string;
}

const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: 'SHP-001',
    description: 'Electronics Package',
    originZip: '10001',
    destinationZip: '90210',
  },
  {
    id: 'SHP-002',
    description: 'Furniture Delivery',
    originZip: '60601',
    destinationZip: '77001',
  },
  {
    id: 'SHP-003',
    description: 'Medical Supplies',
    originZip: '33101',
    destinationZip: '98101',
  },
];

@Injectable({ providedIn: 'root' })
export class ShipmentSearchService {
  getShipments(): Observable<Shipment[]> {
    return of(MOCK_SHIPMENTS).pipe(delay(300));
  }
}

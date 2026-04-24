import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

export interface ShipmentDetail {
  id: string;
  description: string;
  originZip: string;
  destinationZip: string;
  purchaserName: string;
}

const MOCK_SHIPMENT_DETAILS: ShipmentDetail[] = [
  {
    id: 'SHP-001',
    description: 'Electronics Package',
    originZip: '10001',
    destinationZip: '90210',
    purchaserName: 'Alice Johnson',
  },
  {
    id: 'SHP-002',
    description: 'Furniture Delivery',
    originZip: '60601',
    destinationZip: '77001',
    purchaserName: 'Bob Martinez',
  },
  {
    id: 'SHP-003',
    description: 'Medical Supplies',
    originZip: '33101',
    destinationZip: '98101',
    purchaserName: 'Carol Smith',
  },
];

@Injectable({ providedIn: 'root' })
export class ShipmentDetailsService {
  getShipmentById(id: string): Observable<ShipmentDetail | undefined> {
    return of(MOCK_SHIPMENT_DETAILS.find((s) => s.id === id)).pipe(delay(300));
  }
}

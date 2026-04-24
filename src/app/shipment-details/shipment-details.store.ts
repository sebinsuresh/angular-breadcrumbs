import { signalStore, withState } from '@ngrx/signals';
import { ShipmentDetail } from './shipment-details.service';

export interface ShipmentDetailState {
  shipment: ShipmentDetail | undefined;
}

export const ShipmentDetailStore = signalStore(
  { protectedState: false },
  withState<ShipmentDetailState>({ shipment: undefined }),
);

import { signalStore, withState } from '@ngrx/signals';
import { ShipmentDetail } from './shipment-details.service';

export interface ShipmentDetailState {
  shipment: ShipmentDetail | undefined;
}

export const ShipmentDetailStore = signalStore(
  // providedIn: 'root' makes this a true singleton shared by all injectors.
  // BreadcrumbService depends on this store, so it must be root-scoped.
  // Do NOT re-declare this store in component providers or appConfig — doing so
  // creates a second instance and the breadcrumb service will never see updates.
  { providedIn: 'root', protectedState: false },
  withState<ShipmentDetailState>({ shipment: undefined }),
);

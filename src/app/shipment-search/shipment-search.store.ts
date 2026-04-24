import { signalStore, withState } from '@ngrx/signals';

export const ShipmentSearchStore = signalStore(
  // providedIn: 'root' makes this a true singleton shared by all injectors.
  // BreadcrumbService depends on this store, so it must be root-scoped.
  // Do NOT re-declare this store in component providers or appConfig — doing so
  // creates a second instance and the breadcrumb service will never see updates.
  { providedIn: 'root', protectedState: false },
  withState({ query: '' }),
);

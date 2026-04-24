import { signalStore, withState } from '@ngrx/signals';

export const ShipmentSearchStore = signalStore({ protectedState: false }, withState({ query: '' }));

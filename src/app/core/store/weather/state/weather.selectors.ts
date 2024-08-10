import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State } from './weather.reducer';

export const selectLocationState = createFeatureSelector<State>(featureKey);

export const selectCurrentConditions = createSelector(
    selectLocationState,
    (state: State) => state.currentConditions
);

export const selectForecast = createSelector(
    selectLocationState,
    (state ) => state.forecast
);

export const selectIconUrl = createSelector(
  selectLocationState,
    (state) => state.iconUrl
);

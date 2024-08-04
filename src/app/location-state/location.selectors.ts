import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey, State} from './location.reducer';

export const selectLocationState = createFeatureSelector<State>(featureKey);

export const selectCurrentConditions = createSelector(
    selectLocationState,
    (state: State) => state.currentConditions
);

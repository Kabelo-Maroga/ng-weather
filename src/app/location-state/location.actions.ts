import { createAction, props } from '@ngrx/store';
import {CurrentConditions} from '../current-conditions/current-conditions.type';

export const addCurrentConditions = createAction(
    '[Location] Add Current Location',
    props<{ zipcode: string }>()
);

export const addCurrentConditionsSuccess = createAction(
    '[Location] Add Current Location Success',
    props<{ zipcode: string, data: CurrentConditions }>()
);

export const addCurrentConditionsFailure = createAction(
    '[Location] Add Current Location Failure',
    props<{ zipcode: string, error: any }>()
);

export const removeCurrentConditions = createAction(
    '[Location] Remove Current Location',
    props<{ zipcode: string }>()
);

export const removeCurrentConditionsSuccess = createAction(
    '[Location] Remove Current Location Success',
    props<{ zipcode: string, data: CurrentConditions }>()
);

export const removeCurrentConditionsFailure = createAction(
    '[Location] Remove Current Location Failure',
    props<{ zipcode: string, error: any }>()
);

import { createAction, props } from '@ngrx/store';
import {CurrentConditions} from '../current-conditions/current-conditions.type';
import {Forecast} from '../forecasts-list/forecast.type';


// adding/removing current locations.
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

// forecasts.
export const getForecast = createAction(
    '[Location] Get Forecast',
    props<{ zipcode: string }>()
);

export const getForecastSuccess = createAction(
    '[Location] Get Forecast Success',
    props<{ zipcode: string, data: Forecast }>()
);

export const getForecastFailure = createAction(
    '[Location] Get Forecast Failure',
    props<{ zipcode: string, error: any }>()
);

export const getIcon = createAction(
    '[Location] Get Icon',
    props<{ id: number }>()
);

export const getIconSuccess = createAction(
    '[Location] Get Icon Success',
    props<{ id: number, iconUrl: string }>()
);

export const getIconFailure = createAction(
    '[Location] Get Icon Failure',
    props<{ id: number, error: any }>()
);

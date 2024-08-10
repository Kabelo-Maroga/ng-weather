import {createAction, props} from '@ngrx/store';
import {Forecast} from '../../../models/forecast.type';
import {CurrentConditions} from '../../../models/current-conditions.type';


// adding or removing current locations.
export const readCurrentConditionsFromCache = createAction(
    '[Weather Store] Initialise Current Location From Local Storage',
    props<{ cacheKey: string }>()
);

export const addCurrentConditions = createAction(
    '[Weather Store] Add Current Location',
    props<{ zipcode: string, notification: boolean }>()
);

export const addCurrentConditionsSuccess = createAction(
    '[Weather Store] Add Current Location Success',
    props<{ zipcode: string, data: CurrentConditions }>()
);

export const addCurrentConditionsFailure = createAction(
    '[Weather Store] Add Current Location Failure',
    props<{ zipcode: string, error: string }>()
);

export const removeCurrentConditions = createAction(
    '[Weather Store] Remove Current Location',
    props<{ zipcode: string }>()
);

export const removeCurrentConditionsSuccess = createAction(
    '[Weather Store] Remove Current Location Success',
    props<{ zipcode: string, data: CurrentConditions }>()
);

export const removeCurrentConditionsFailure = createAction(
    '[Weather Store] Remove Current Location Failure',
    props<{ zipcode: string, error: string }>()
);


// forecasts.
export const getForecast = createAction(
    '[Weather Store] Get Forecast',
    props<{ zipcode: string }>()
);

export const getForecastSuccess = createAction(
    '[Weather Store] Get Forecast Success',
    props<{ zipcode: string, data: Forecast }>()
);

export const getForecastFailure = createAction(
    '[Weather Store] Get Forecast Failure',
    props<{ zipcode: string, error: string }>()
);

export const getIcon = createAction(
    '[Weather Store] Get Icon',
    props<{ id: number }>()
);

export const getIconSuccess = createAction(
    '[Weather Store] Get Icon Success',
    props<{ id: number, iconUrl: string }>()
);

export const getIconFailure = createAction(
    '[Weather Store] Get Icon Failure',
    props<{ id: number, error: string }>()
);

import {createReducer, on} from '@ngrx/store';
import * as LocationActions from './location.actions';
import {ConditionsAndZip} from '../conditions-and-zip.type';
import {Forecast} from '../forecasts-list/forecast.type';

export const featureKey = "LocationReducer";

export interface State {
    currentConditions: ConditionsAndZip[],
    forecast: Forecast;
    iconUrl: string;
}

export const initialState: State = {
    currentConditions: [],
    forecast: {} as Forecast,
    iconUrl: null
};

export const locationReducer = createReducer(
    initialState,
    on(LocationActions.addCurrentConditionsSuccess, (state, { zipcode, data }) => ({
        ...state,
        currentConditions: [...state.currentConditions, { zip: zipcode, data }]
    })),
    on(LocationActions.removeCurrentConditions, (state, { zipcode }) => ({
        ...state,
        currentConditions: removeCondition(state.currentConditions, zipcode)
    })),
    on(LocationActions.getForecastSuccess, (state, { data }) => ({
        ...state,
        forecast: data
    })),
    on(LocationActions.getIconSuccess, (state, { iconUrl }) => ({
        ...state,
        iconUrl: iconUrl
    }))
);

// function removeCondition(conditions: ConditionsAndZip[], zipcode: string): ConditionsAndZip[] {
//     for (let i in conditions) {
//         if (conditions[i].zip == zipcode)
//             conditions.splice(+i, 1);
//     }
//     return conditions;
// }


//better implementation...
function removeCondition(conditions: ConditionsAndZip[], zipcode: string): ConditionsAndZip[] {
    return conditions.filter(condition => condition.zip !== zipcode);
}

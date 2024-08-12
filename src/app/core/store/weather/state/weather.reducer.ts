import { createReducer, on } from '@ngrx/store';
import * as Actions from './weather.actions';
import { ConditionsAndZip } from '../../../models/conditions-and-zip.type';
import { Forecast } from '../../../models/forecast.type';

export const featureKey = 'WeatherReducer';

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

export const weatherReducer = createReducer(
    initialState,
    on(Actions.addCurrentConditionsSuccess, (state, { zipcode, data }) => {
        const condition = state.currentConditions.find(currentCondition => currentCondition.zip === zipcode);
        if (condition) {
            return state;
        }
        return {
            ...state,
            currentConditions: [...state.currentConditions, { zip: zipcode, data }]
        };
    }),
    on(Actions.removeCurrentConditions, (state, { zipcode }) => ({
        ...state,
        currentConditions: removeCondition(state.currentConditions, zipcode)
    })),
    on(Actions.getForecastSuccess, (state, { data }) => ({
        ...state,
        forecast: data
    })),
    on(Actions.getIconSuccess, (state, { iconUrl }) => ({
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

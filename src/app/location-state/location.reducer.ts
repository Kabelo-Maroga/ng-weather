import {createReducer, on} from '@ngrx/store';
import {addCurrentConditionsSuccess, removeCurrentConditions,} from './location.actions';
import {ConditionsAndZip} from '../conditions-and-zip.type';

export const featureKey = "LocationReducer";

export interface State {
    currentConditions: ConditionsAndZip[]
}

export const initialState: State = {
    currentConditions: []
};

export const locationReducer = createReducer(
    initialState,
    on(addCurrentConditionsSuccess, (state, { zipcode, data }) => ({
        ...state,
        currentConditions: [...state.currentConditions, { zip: zipcode, data }]
    })),
    on(removeCurrentConditions, (state, { zipcode }) => ({
        ...state,
        currentConditions: removeCondition(state.currentConditions, zipcode)
    }))
);

function removeCondition(conditions: ConditionsAndZip[], zipcode: string): ConditionsAndZip[] {
    for (let i in conditions) {
        if (conditions[i].zip == zipcode)
            conditions.splice(+i, 1);
    }
    return conditions;
}

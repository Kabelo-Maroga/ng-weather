import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import * as LocationActions from './location.actions';
import {addCurrentConditions, removeCurrentConditions} from './location.actions';
import {WeatherService} from '../weather.service';
import {of} from 'rxjs';
//
// switchMap(action =>
//     this.service.getRegulations(action.lawFamilyId).pipe(
//         map(regulations => StoreActions.getRegulationsSuccess({ regulations })),
//         catchError(error => of(StoreActions.getRegulationsFail({ error })))
//     )
// ),

@Injectable()
export class LocationEffects {

    addCurrentConditions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addCurrentConditions),
            switchMap(({ zipcode }) => this.weatherService.addCurrentConditions(zipcode).pipe(
                map(data => LocationActions.addCurrentConditionsSuccess({ zipcode, data})),
                catchError(error => of(LocationActions.addCurrentConditionsFailure({ zipcode, error })))
            )),
        )
    );

    // removeCurrentConditions$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(removeCurrentConditions),
    //
    //         tap(({ zipcode }) => this.weatherService.removeCurrentConditions(zipcode))
    //     ), { dispatch: false }
    // );

    constructor(
        private actions$: Actions,
        private weatherService: WeatherService
    ) {}
}

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as LocationActions from './location.actions';
import {addCurrentConditions, getForecast, getIcon} from './location.actions';
import {WeatherService} from '../weather.service';
import {of} from 'rxjs';

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

    getForecast$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getForecast),
            switchMap(({ zipcode }) => this.weatherService.getForecast(zipcode).pipe(
                map(data => LocationActions.getForecastSuccess({ zipcode, data})),
                catchError(error => of(LocationActions.getForecastFailure({ zipcode, error })))
            )),
        )
    );

    getIcon$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getIcon),
            switchMap(({ id }) => this.weatherService.getWeatherIcon(id).pipe(
                map(iconUrl => LocationActions.getIconSuccess({ id, iconUrl})),
                catchError(error => of(LocationActions.getIconFailure({ id, error })))
            )),
        )
    );

    constructor(
        private actions$: Actions,
        private weatherService: WeatherService
    ) {}
}

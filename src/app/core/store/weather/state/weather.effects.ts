import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, switchMap} from 'rxjs/operators';
import * as WeatherActions from './weather.actions';
import {WeatherService} from '../../../services/weather.service';
import {of} from 'rxjs';

@Injectable()
export class WeatherEffects {

    addCurrentConditions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WeatherActions.addCurrentConditions),
            concatMap(({ zipcode }) => this.weatherService.addCurrentConditions(zipcode).pipe(
                map(data => WeatherActions.addCurrentConditionsSuccess({ zipcode, data})),
                catchError(error => of(WeatherActions.addCurrentConditionsFailure({ zipcode, error })))
            )),
        )
    );

    getForecast$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WeatherActions.getForecast),
            concatMap(({ zipcode }) => this.weatherService.getForecast(zipcode).pipe(
                map(data => WeatherActions.getForecastSuccess({ zipcode, data})),
                catchError(error => of(WeatherActions.getForecastFailure({ zipcode, error })))
            )),
        )
    );

    getIcon$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WeatherActions.getIcon),
            concatMap(({ id }) => this.weatherService.getWeatherIcon(id).pipe(
                map(iconUrl => WeatherActions.getIconSuccess({ id, iconUrl})),
                catchError(error => of(WeatherActions.getIconFailure({ id, error })))
            )),
        )
    );

    constructor(
        private actions$: Actions,
        private weatherService: WeatherService
    ) {}
}

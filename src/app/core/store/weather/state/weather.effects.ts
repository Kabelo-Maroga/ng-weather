import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import * as WeatherActions from './weather.actions';
import {from, of} from 'rxjs';
import {CacheService} from '../../../services/cache.service';
import {CurrentConditions} from '../../../models/current-conditions.type';
import {WeatherService} from '../services/weather.service';
import {FORECAST, LOCATIONS} from '../../../models/constants/cache.type';
import {Forecast} from '../../../models/forecast.type';
import {ConfigService} from '../../../services/config.service';

@Injectable()
export class WeatherEffects {
    cacheTTL: number;
    /**
     * Reading the cached conditions when the application initialises.
     */
    readCurrentConditionsFromCache$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WeatherActions.readCurrentConditionsFromCache),
            switchMap(({ cacheKey }) => {
                const cachedLocations = this.cacheService.getAll<string>(cacheKey);

                if (Object.keys(cachedLocations).length > 0) {
                    const locations = [...new Set(Object.keys(cachedLocations))];
                    return from(locations).pipe(
                        concatMap((loc) => of(WeatherActions.addCurrentConditions({ zipcode: loc })))
                    );
                }
                return of(null);
            })
        )
    );

    addCurrentConditions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WeatherActions.addCurrentConditions),
            withLatestFrom(this.configService.config$),
            concatMap(([{ zipcode }, config]) => {
                const cachedData: CurrentConditions = this.cacheService.get(LOCATIONS, zipcode);
                if (cachedData) {
                    return of(WeatherActions.addCurrentConditionsSuccess({ zipcode, data: cachedData }));
                } else {
                    return this.weatherService.addCurrentConditions(zipcode).pipe(
                        map(data => {
                            this.cacheService.set<CurrentConditions>(LOCATIONS, zipcode, data, config.cacheTTL);
                            return WeatherActions.addCurrentConditionsSuccess({ zipcode, data });
                        }),
                        catchError(error => of(WeatherActions.addCurrentConditionsFailure({ zipcode, error })))
                    );
                }
            })
        )
    );


    removeCurrentConditions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WeatherActions.removeCurrentConditions),
            tap(({ zipcode }) => this.cacheService.clear(LOCATIONS, zipcode)),

        ), {
            dispatch: false
        }
    );


    getForecast$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WeatherActions.getForecast),
            withLatestFrom(this.configService.config$),
            concatMap(([{ zipcode }, config]) => {
                const cachedData: Forecast = this.cacheService.get(FORECAST, zipcode);
                if(cachedData) {
                    return of(WeatherActions.getForecastSuccess({ zipcode, data: cachedData }));
                } else {
                    return this.weatherService.getForecast(zipcode).pipe(
                        map(data => {
                            this.cacheService.set<Forecast>(FORECAST, zipcode, data, config.cacheTTL);
                            return WeatherActions.getForecastSuccess({zipcode, data})
                        }),
                        catchError(error => of(WeatherActions.getForecastFailure({zipcode, error})))
                    );
                }
            }),
        )
    );


    getIcon$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WeatherActions.getIcon),
            switchMap(({ id }) => this.weatherService.getWeatherIcon(id).pipe(
                map(iconUrl => WeatherActions.getIconSuccess({ id, iconUrl})),
                catchError(error => of(WeatherActions.getIconFailure({ id, error })))
            )),
        )
    );

    constructor(
        private actions$: Actions,
        private weatherService: WeatherService,
        private cacheService: CacheService,
        private configService: ConfigService
    ) {
        // this.cacheTTL = this.configService.getConfig();
    }
}

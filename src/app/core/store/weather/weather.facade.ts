import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Selectors from './state/weather.selectors';
import { Observable } from 'rxjs';
import * as Actions from './state/weather.actions';

@Injectable({
    providedIn: 'root'
})
export class WeatherFacade {
    constructor(private store: Store) {}

    currentConditions$ = this.store.select(Selectors.selectCurrentConditions);

    selectForecast$ = this.store.select(Selectors.selectForecast);

    iconUrl$ = this.store.select(Selectors.selectIconUrl);

    readCurrentConditionsFromCache(cacheKey: string) {
        this.store.dispatch(Actions.readCurrentConditionsFromCache({ cacheKey }));
    }

    addCurrentConditions(zipcode: string): void {
        this.store.dispatch(Actions.addCurrentConditions({ zipcode, notification: true }));
    }

    removeCurrentConditions(zipcode: string): void {
        this.store.dispatch(Actions.removeCurrentConditions({ zipcode }));
    }

    getForecast(zipcode: string): void {
        this.store.dispatch(Actions.getForecast({ zipcode }));
    }

    getWeatherIcon(id: number): Observable<string> {
        this.store.dispatch(Actions.getIcon({ id }));
        return this.iconUrl$;
    }
}

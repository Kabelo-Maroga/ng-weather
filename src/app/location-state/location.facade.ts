import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as LocationActions from './location.actions';
import * as LocationSelectors from './location.selectors';
import {WeatherService} from '../weather.service';

@Injectable({
    providedIn: 'root'
})
export class LocationFacade {
    constructor(private weatherService: WeatherService, private store: Store) {}

    currentConditions$ = this.store.select(LocationSelectors.selectCurrentConditions);

    addCurrentConditions(zipcode: string) {
        this.store.dispatch(LocationActions.addCurrentConditions({ zipcode }));
    }

    removeCurrentConditions(zipcode: string) {
        this.store.dispatch(LocationActions.removeCurrentConditions({ zipcode }));
    }

    getWeatherIcon(id: number) {
        return this.weatherService.getWeatherIcon(id);
    }
}

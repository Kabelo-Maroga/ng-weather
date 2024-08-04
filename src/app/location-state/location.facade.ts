import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as LocationActions from './location.actions';
import * as LocationSelectors from './location.selectors';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocationFacade {
    constructor(private store: Store) {}

    currentConditions$ = this.store.select(LocationSelectors.selectCurrentConditions);

    selectForecast$ = this.store.select(LocationSelectors.selectForecast);

    iconUrl$ = this.store.select(LocationSelectors.selectIconUrl);

    addCurrentConditions(zipcode: string): void {
        this.store.dispatch(LocationActions.addCurrentConditions({ zipcode }));
    }

    removeCurrentConditions(zipcode: string): void {
        this.store.dispatch(LocationActions.removeCurrentConditions({ zipcode }));
    }

    getForecast(zipcode: string): void {
        this.store.dispatch(LocationActions.getForecast({ zipcode }));
    }

    getWeatherIcon(id: number): Observable<string> {
        this.store.dispatch(LocationActions.getIcon({ id }));
        return this.iconUrl$;
    }
}

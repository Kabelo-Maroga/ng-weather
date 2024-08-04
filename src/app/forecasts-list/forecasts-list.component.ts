import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocationFacade} from '../location-state/location.facade';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {
  forecast$ = this.locationFacade.selectForecast$;

  constructor(protected locationFacade: LocationFacade, route : ActivatedRoute) {
    route.params.subscribe(params => {
      const zipcode = params['zipcode'];
      locationFacade.getForecast(zipcode);
    });
  }
}

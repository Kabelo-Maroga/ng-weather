import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WeatherFacade} from '../../core/store/weather/weather.facade';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {
  forecast$ = this.weatherFacade.selectForecast$;

  constructor(protected weatherFacade: WeatherFacade, route : ActivatedRoute) {
    route.params.subscribe(params => {
      const zipcode = params['zipcode'];
      weatherFacade.getForecast(zipcode);
    });
  }
}

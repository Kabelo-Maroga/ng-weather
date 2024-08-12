import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { WeatherFacade } from '../../core/store/weather/weather.facade';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {
  protected forecast$ = this.weatherFacade.selectForecast$;

  constructor(protected weatherFacade: WeatherFacade, route : ActivatedRoute) {
    route.paramMap.subscribe((params: ParamMap) => {
      const zipcode = params.get('zipcode');
      if (zipcode) {
        weatherFacade.getForecast(zipcode);
      }
    });
  }
}

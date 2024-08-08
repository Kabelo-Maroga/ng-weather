import {Component, Inject} from '@angular/core';
import {WeatherFacade} from '../../core/store/weather/weather.facade';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {

  constructor(private weatherFacade : WeatherFacade) { }

  addLocation(zipcode : string){
    this.weatherFacade.addCurrentConditions(zipcode);
  }
}

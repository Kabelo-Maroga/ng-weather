import {Component, Input} from '@angular/core';
import {ConditionsAndZip} from '../conditions-and-zip.type';
import {LocationService} from '../location.service';
import {WeatherFacade} from '../weather-state/weather.facade';

@Component({
  selector: 'current-condition',
  templateUrl: './current-condition.component.html',
  styleUrls: ['./current-condition.component.css']
})
export class CurrentConditionComponent {
  @Input() location: ConditionsAndZip;

  constructor(public locationService: LocationService,
              public weatherFacade: WeatherFacade) {
  }
}

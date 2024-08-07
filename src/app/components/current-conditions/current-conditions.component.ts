import {Component, inject, Signal} from '@angular/core';
import {LocationService} from '../../core/services/location.service';
import {Router} from '@angular/router';
import {ConditionsAndZip} from '../../core/models/conditions-and-zip.type';
import {WeatherFacade} from '../../core/store/weather/weather.facade';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {

  private router = inject(Router);
  protected weatherFacade = inject(WeatherFacade);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = toSignal(this.weatherFacade.currentConditions$);

  showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode])
  }
}

import {Component, inject, Signal} from '@angular/core';
import {LocationService} from '../location.service';
import {Router} from '@angular/router';
import {ConditionsAndZip} from '../conditions-and-zip.type';
import {LocationFacade} from '../location-state/location.facade';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {

  private router = inject(Router);
  protected locationFacade = inject(LocationFacade);
  protected locationService = inject(LocationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = toSignal(this.locationFacade.currentConditions$);

  showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode])
  }
}

import {AfterViewInit, Component, inject, OnInit, QueryList, TemplateRef, ViewChildren} from '@angular/core';
import {Router} from '@angular/router';
import {WeatherFacade} from '../../core/store/weather/weather.facade';
import {toSignal} from '@angular/core/rxjs-interop';
import {LOCATIONS} from '../../core/models/constants/cache.type';
import {Tab} from '../../core/models/tab.type';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit, AfterViewInit {
  protected router = inject(Router);
  protected weatherFacade = inject(WeatherFacade);
  protected currentConditionsByZip = toSignal(this.weatherFacade.currentConditions$);

  @ViewChildren('locationTemplate', { read: TemplateRef })
  readonly locationTemplates!: QueryList<TemplateRef<any>>;

  tabs: Tab[] = [];

  ngOnInit(): void {
    this.loadInitConditions();
  }

  loadInitConditions(): void {
    this.weatherFacade.readCurrentConditionsFromCache(LOCATIONS);
  }

  removeCondition(zipcode: string): void {
    this.weatherFacade.removeCurrentConditions(zipcode);
  }

  ngAfterViewInit(): void {
    this.createTemplates();
  }

  showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode])
  }

  createTemplates() {
    const conditions = this.currentConditionsByZip();
    this.locationTemplates.forEach((templateRef, index) => {
      const location = conditions[index];
      if (location && location.data && location.data.name) {
        this.tabs.push({
          id: location.zip,
          title: `${location.data.name} (${location.zip})`,
          active: index === 0,
          template: templateRef
        });
      }
    });
  }
}

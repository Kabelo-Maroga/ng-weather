import {AfterContentChecked, AfterViewInit, Component, inject, OnInit, QueryList, TemplateRef, ViewChildren} from '@angular/core';
import {Router} from '@angular/router';
import {WeatherFacade} from '../../core/store/weather/weather.facade';
import {toSignal} from '@angular/core/rxjs-interop';
import {LOCATIONS} from '../../core/models/constants/cache.type';
import {Tab} from '../../core/models/tab.type';
import {distinctUntilChanged, tap} from 'rxjs/operators';
import {ConditionsAndZip} from '../../core/models/conditions-and-zip.type';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit, AfterViewInit, AfterContentChecked {
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

  ngAfterContentChecked(): void {
    if(this.locationTemplates) {
      this.createTemplates();
    }
  }

  showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode])
  }

  tabExists(location: ConditionsAndZip): boolean {
    return this.tabs.some(tab => tab.id === location.zip);
  }

  createTemplates() {
    const conditions = this.currentConditionsByZip();
    this.locationTemplates.forEach((templateRef, index) => {
      const location = conditions[index];
      // const tabExists = this.tabs.some(tab => tab.id === location.zip);

      if (location && location.data && location.data.name && !this.tabExists(location)) {
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

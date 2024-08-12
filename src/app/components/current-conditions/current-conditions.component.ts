import { AfterContentChecked, AfterViewInit, Component, inject, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherFacade } from '../../core/store/weather/weather.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { LOCATIONS } from '../../core/models/constants/cache.type';
import { Tab } from '../../core/models/tab.type';
import { ConditionsAndZip } from '../../core/models/conditions-and-zip.type';
import { CurrentConditionComponent } from '../current-condition/current-condition.component';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit, AfterViewInit, AfterContentChecked {
  protected router = inject(Router);
  protected weatherFacade = inject(WeatherFacade);
  protected currentConditionsByZip = toSignal(this.weatherFacade.currentConditions$);
  protected tabs: Tab<CurrentConditionComponent>[] = [];

  @ViewChildren('locationTemplate', { read: TemplateRef })
  readonly locationTemplates!: QueryList<TemplateRef<CurrentConditionComponent>>;

  trackByZip(index: number, location: ConditionsAndZip): string {
    return location.zip;
  }

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
    if (this.locationTemplates) {
      this.createTemplates();
    }
  }

  showForecast(zipcode : string): void {
     void this.router.navigate(['/forecast', zipcode]);
  }

  tabExists(location: ConditionsAndZip): boolean {
    return this.tabs.some(tab => tab.id === location.zip);
  }

  createTemplates(): void {
    const conditions = this.currentConditionsByZip();
    this.locationTemplates.forEach((templateRef, index) => {
      const location = conditions[index];

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

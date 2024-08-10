import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ZipcodeEntryComponent } from './components/zipcode-entry/zipcode-entry.component';
import { ForecastsListComponent } from './components/forecasts-list/forecasts-list.component';
import { CurrentConditionsComponent } from './components/current-conditions/current-conditions.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import * as LocationReducer from './core/store/weather/state/weather.reducer';
import * as NotificationReducer from './core/store/notification/state/notification.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './core/store/weather/state/weather.effects';
import { ConfigService } from './core/services/config.service';
import { WeatherService } from './core/store/weather/services/weather.service';
import { CurrentConditionComponent } from './components/current-condition/current-condition.component';
import { TabsComponent } from './core/shared/tabs/tabs.component';
import { NotificationComponent } from './core/shared/notification/notification.component';

export function initializeApp(appConfigService: ConfigService) {
  return () => appConfigService.loadConfig().toPromise();
}

@NgModule({
  declarations: [
    AppComponent,
    ZipcodeEntryComponent,
    ForecastsListComponent,
    CurrentConditionsComponent,
    CurrentConditionComponent,
    MainPageComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        StoreModule.forRoot({}),

        //weather store
        EffectsModule.forRoot([]),
        StoreModule.forFeature(LocationReducer.featureKey, LocationReducer.weatherReducer),

        //notification store
        EffectsModule.forRoot([]),
        StoreModule.forFeature(NotificationReducer.featureKey, NotificationReducer.notificationReducer),

        EffectsModule.forFeature([WeatherEffects]),
        routing,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
        TabsComponent,
        NotificationComponent
    ],
  providers: [
    WeatherService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

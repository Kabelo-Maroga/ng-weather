import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {ZipcodeEntryComponent} from './components/zipcode-entry/zipcode-entry.component';
import {LocationService} from './location.service';
import {ForecastsListComponent} from './components/forecasts-list/forecasts-list.component';
import {CurrentConditionsComponent} from './components/current-conditions/current-conditions.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {RouterModule} from '@angular/router';
import {routing} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {StoreModule} from '@ngrx/store';
import * as LocationReducer from './core/store/weather/state/weather.reducer';
import {EffectsModule} from '@ngrx/effects';
import {WeatherEffects} from './core/store/weather/state/weather.effects';
import {WeatherService} from './core/store/weather/services/weather.service';

@NgModule({
  declarations: [
    AppComponent,
    ZipcodeEntryComponent,
    ForecastsListComponent,
    CurrentConditionsComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(LocationReducer.featureKey, LocationReducer.weatherReducer),
    EffectsModule.forFeature([WeatherEffects]),
    routing,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [LocationService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {ZipcodeEntryComponent} from './zipcode-entry/zipcode-entry.component';
import {LocationService} from './location.service';
import {ForecastsListComponent} from './forecasts-list/forecasts-list.component';
import {WeatherService} from './weather.service';
import {CurrentConditionsComponent} from './current-conditions/current-conditions.component';
import {MainPageComponent} from './main-page/main-page.component';
import {RouterModule} from '@angular/router';
import {routing} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {StoreModule} from '@ngrx/store';
import * as LocationReducer from './weather-state/weather.reducer';
import {EffectsModule} from '@ngrx/effects';
import {WeatherEffects} from './weather-state/weather.effects';

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

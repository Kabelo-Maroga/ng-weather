import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CurrentConditions} from '../../../models/current-conditions.type';
import {Forecast} from '../../../models/forecast.type';

@Injectable()
export class WeatherService {

  static URL = 'https://api.openweathermap.org/data/2.5';
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
  static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';

  constructor(private http: HttpClient) { }

  addCurrentConditions(zipcode: string): Observable<CurrentConditions> {

    // Here we make a request to get the current conditions data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get<CurrentConditions>(`${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`);
  }

  getForecast(zipcode: string): Observable<Forecast> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get<Forecast>(`${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`);
  }

  getWeatherIcon(id: number): Observable<string> {
    if (id >= 200 && id <= 232)
      return of(WeatherService.ICON_URL + "art_storm.png");
    else if (id >= 501 && id <= 511)
      return of(WeatherService.ICON_URL + "art_rain.png");
    else if (id === 500 || (id >= 520 && id <= 531))
      return of(WeatherService.ICON_URL + "art_light_rain.png");
    else if (id >= 600 && id <= 622)
      return of(WeatherService.ICON_URL + "art_snow.png");
    else if (id >= 801 && id <= 804)
      return of(WeatherService.ICON_URL + "art_clouds.png");
    else if (id === 741 || id === 761)
      return of(WeatherService.ICON_URL + "art_fog.png");
    else
      return of(WeatherService.ICON_URL + "art_clear.png");
  }
}

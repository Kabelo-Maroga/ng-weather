import { Injectable } from '@angular/core';
import {WeatherService} from "./weather.service";
import {LocationFacade} from './location-state/location.facade';

export const LOCATIONS : string = "locations";

@Injectable()
export class LocationService {

  locations : string[] = [];

  constructor(private weatherService : WeatherService, private locationFacade: LocationFacade ) {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString)
      this.locations = JSON.parse(locString);
    for (let loc of this.locations)
      this.locationFacade.addCurrentConditions(loc);
      // this.weatherService.addCurrentConditions(loc);
  }

  addLocation(zipcode : string) {
    this.locations.push(zipcode);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    this.locationFacade.addCurrentConditions(zipcode);
  }

  removeLocation(zipcode : string) {
    let index = this.locations.indexOf(zipcode);
    if (index !== -1){
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.locationFacade.removeCurrentConditions(zipcode);
      // this.weatherService.removeCurrentConditions(zipcode);
    }
  }
}

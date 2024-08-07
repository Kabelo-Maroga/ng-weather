import {Injectable} from '@angular/core';
import {WeatherFacade} from './weather-state/weather.facade';

export const LOCATIONS : string = "locations";

@Injectable()
export class LocationService {

  locations : string[] = [];

  constructor(private locationFacade: WeatherFacade ) {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString) {
      const locations: string[] = JSON.parse(locString);
      this.locations = [...new Set(locations)];
    }
    for (let loc of this.locations)
      this.locationFacade.addCurrentConditions(loc);
  }

  addLocation(zipcode : string) {
    if(this.locations.includes(zipcode)) {
      return;
    }
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
    }
  }
}

import { Injectable } from '@angular/core';
import {WeatherFacade} from './core/store/weather/weather.facade';
import {CacheService} from './core/services/cache.service';
import {LOCATIONS} from './core/models/constants/cache.type';

// export const LOCATIONS: string = 'locations';
export const LOCATION_CACHE_TTL: number = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

@Injectable()
export class LocationService {
  locations: string[] = [];

  constructor(private locationFacade: WeatherFacade, private cacheService: CacheService) {
    // const cachedLocations = this.cacheService.getAll<string>(LOCATIONS);
    //
    // console.log('Cached Locations:', cachedLocations); // Add this line
    //
    // if (Object.keys(cachedLocations).length > 0) {
    //   this.locations = [...new Set(Object.keys(cachedLocations))];
    // }
    //
    // // Initialize current conditions for stored locations
    // this.locations.forEach((loc) => this.locationFacade.addCurrentConditions(loc));

    // // this.locationFacade.
    this.locationFacade.readCurrentConditionsFromCache(LOCATIONS);
  }

  addLocation(zipcode: string) {
    this.locationFacade.addCurrentConditions(zipcode);
  }

  removeLocation(zipcode: string) {
      this.locationFacade.removeCurrentConditions(zipcode);
  }
}

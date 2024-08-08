import {Injectable} from '@angular/core';

interface CacheEntry {
  value: any;
  expiry: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  /**
   * Adds a record into the local storage, and also sets ttl (time-to-live) for that record
   * in the local storage.
   * @param cacheKey
   * @param secondaryKey
   * @param value
   * @param ttl
   */
  set<T>(cacheKey: string, secondaryKey: string, value: T, ttl: number): void {
    const expiry = Date.now() + ttl;
    const cache: CacheEntry = { value, expiry };

    const existingCache = localStorage.getItem(cacheKey);
    let cacheMap: { [key: string]: CacheEntry };

    if (existingCache) {
      cacheMap = JSON.parse(existingCache);
    } else {
      cacheMap = {};
    }

    cacheMap[secondaryKey] = cache;
    localStorage.setItem(cacheKey, JSON.stringify(cacheMap));
  }

  /**
   * Retrieves all records from local storage, and thereafter lookup a specific record by the secondaryKey.
   * @param cacheKey
   * @param zipcode
   */
  get<T>(cacheKey: string, zipcode: string): T | null {
    const cacheItem = localStorage.getItem(cacheKey);
    if (!cacheItem) {
      return null;
    }

    const cacheMap: { [key: string]: CacheEntry } = JSON.parse(cacheItem);
    const cacheEntry = cacheMap[zipcode];

    if (!cacheEntry) {
      return null;
    }

    if (Date.now() > cacheEntry.expiry) {
      delete cacheMap[zipcode];
      localStorage.setItem(cacheKey, JSON.stringify(cacheMap));
      return null;
    }
    return cacheEntry.value as T;
  }

  /**
   * Retrieves all records in the location storage by the specified key.
   * @param cacheKey
   */
  getAll<T>(cacheKey: string): { [secondaryKey: string]: T } {
    const cacheItem = localStorage.getItem(cacheKey);
    if (!cacheItem) {
      return {};
    }

    const cacheMap: { [key: string]: CacheEntry } = JSON.parse(cacheItem);
    const validEntries: { [key: string]: T } = {};

    for (const key in cacheMap) {
      if (Date.now() <= cacheMap[key].expiry) {
        validEntries[key] = cacheMap[key].value as T;
      } else {
        delete cacheMap[key];
      }
    }

    localStorage.setItem(cacheKey, JSON.stringify(cacheMap));
    return validEntries;
  }

  clear(cacheKey: string, secondaryKey: string): void {
    const cacheItem = localStorage.getItem(cacheKey);
    if (!cacheItem) {
      return;
    }

    const cacheMap: { [key: string]: CacheEntry } = JSON.parse(cacheItem);
    delete cacheMap[secondaryKey];
    localStorage.setItem(cacheKey, JSON.stringify(cacheMap));
  }
}

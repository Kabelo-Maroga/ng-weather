import {Injectable} from '@angular/core';

interface CacheEntry {
  value: any;
  expiry: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor() {}
add
  set<T>(cacheKey: string, zipcode: string, value: T, ttl: number): void {
    const expiry = Date.now() + ttl;
    const cache: CacheEntry = { value, expiry };

    const existingCache = localStorage.getItem(cacheKey);
    let cacheMap: { [key: string]: CacheEntry };

    if (existingCache) {
      cacheMap = JSON.parse(existingCache);
    } else {
      cacheMap = {};
    }

    cacheMap[zipcode] = cache;
    localStorage.setItem(cacheKey, JSON.stringify(cacheMap));
  }

  get<T>(primaryKey: string, secondaryKey: string): T | null {
    const cacheItem = localStorage.getItem(primaryKey);
    if (!cacheItem) {
      return null;
    }

    const cacheMap: { [key: string]: CacheEntry } = JSON.parse(cacheItem);
    const cacheEntry = cacheMap[secondaryKey];

    if (!cacheEntry) {
      return null;
    }

    if (Date.now() > cacheEntry.expiry) {
      delete cacheMap[secondaryKey];
      localStorage.setItem(primaryKey, JSON.stringify(cacheMap));
      return null;
    }
    return cacheEntry.value as T;
  }

  getAll<T>(primaryKey: string): { [secondaryKey: string]: T } {
    const cacheItem = localStorage.getItem(primaryKey);
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

    localStorage.setItem(primaryKey, JSON.stringify(cacheMap));
    return validEntries;
  }

  clear(primaryKey: string, secondaryKey: string): void {
    const cacheItem = localStorage.getItem(primaryKey);
    if (!cacheItem) {
      return;
    }

    const cacheMap: { [key: string]: CacheEntry } = JSON.parse(cacheItem);
    delete cacheMap[secondaryKey];
    localStorage.setItem(primaryKey, JSON.stringify(cacheMap));
  }

  clearExpired(primaryKey: string): void {
    const cacheItem = localStorage.getItem(primaryKey);
    if (!cacheItem) {
      return;
    }

    const cacheMap: { [key: string]: CacheEntry } = JSON.parse(cacheItem);

    for (const key in cacheMap) {
      if (Date.now() > cacheMap[key].expiry) {
        delete cacheMap[key];
      }
    }
    localStorage.setItem(primaryKey, JSON.stringify(cacheMap));
  }
}

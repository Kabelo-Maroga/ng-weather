import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

interface CacheSettings {
  defaultTTL: number;
  testTTL: number;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configUrl = 'assets/config.json';
  private cacheSettings: CacheSettings | null = null;

  constructor(private http: HttpClient) { }

  /**
   * Fetches the remote configuration and stores it in cacheSettings.
   */
  loadConfig(): Observable<CacheSettings> {
    if (this.cacheSettings) {
      return of(this.cacheSettings);
    }

    return this.http.get<CacheSettings>(this.configUrl).pipe(
        tap((settings: CacheSettings) => this.cacheSettings = settings),
        catchError(error => {
          console.error('Failed to load configuration:', error);
          return of({ defaultTTL: 7200000, testTTL: 10000 }); // Default settings in case of error
        })
    );
  }

  /**
   * Returns the current cache settings.
   */
  getCacheSettings(): CacheSettings {
    return this.cacheSettings || { defaultTTL: 7200000, testTTL: 10000 };
  }
}

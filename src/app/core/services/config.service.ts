import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configSubject = new BehaviorSubject<{ cacheTTL: number }>(null);
  config$ = this.configSubject.asObservable();

  constructor(private http: HttpClient) {}


  loadConfig(): Observable<{ cacheTTL: number }> {
    return this.http.get<{ cacheTTL: number }>('/assets/config/cache-config.json').pipe(
        tap(config => {
          this.configSubject.next(config);
        })
    );
  }
}

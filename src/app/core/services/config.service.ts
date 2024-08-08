import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configSubject = new BehaviorSubject<any>(null);
  config$ = this.configSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<any> {
    return this.http.get('/assets/config/cache-config.json').pipe(
        tap(config => {
          console.log("*****", config);
          this.configSubject.next(config)
        })
    );
  }

  getConfig(): any {
    return this.configSubject.value;
  }
}

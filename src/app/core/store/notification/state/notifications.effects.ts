import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { addNotification, dismissNotification } from './notification.actions';

@Injectable({
    providedIn: 'root'
})
export class NotificationEffects {

    addNotification$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addNotification),
            tap(action => of(dismissNotification({ notification: action.notification }))))
    );

    constructor(private actions$: Actions) {}
}

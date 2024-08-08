import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as NotificationSelectors from './state/notification.selectors';
import * as NotificationActions from './state/notification.actions';

@Injectable({
    providedIn: 'root'
})
export class NotificationFacade {

    selectNotification$ = this.store.select(NotificationSelectors.selectNotification);

    dismissNotification(notification: string) {
        this.store.dispatch(NotificationActions.dismissNotification({ notification }));
    }

    constructor(private store: Store) {}
}

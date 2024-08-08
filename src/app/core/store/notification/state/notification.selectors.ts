import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey, NotificationState} from './notification.reducer';

export const selectNotificationState = createFeatureSelector<NotificationState>(featureKey);

export const selectNotification = createSelector(
    selectNotificationState,
    (state: NotificationState) => state.notification
);

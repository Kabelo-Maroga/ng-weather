import { createReducer, on } from '@ngrx/store';
import { addNotification, dismissNotification } from './notification.actions';

export const featureKey = 'NotificationReducer';

export interface NotificationState {
    notification: string;
}

export const initialState: NotificationState = {
    notification: null
};

export const notificationReducer = createReducer(
    initialState,
    on(addNotification, (state, { notification }) => ({
        ...state,
        notification: notification
    })),
    on(dismissNotification, (state, { notification }) => ({
        ...state,
        notification: null
    }))
);

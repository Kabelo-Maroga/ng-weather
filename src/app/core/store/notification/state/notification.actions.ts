import { createAction, props } from '@ngrx/store';

export const addNotification = createAction('[Notification Store] Add New Notification', props<{ notification: string }>());

export const dismissNotification = createAction('[Notification Store] Dismiss Notification', props<{ notification: string }>());

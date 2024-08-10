import { Component, Input } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { NotificationFacade } from '../../store/notification/notification.facade';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  @Input() message = '';
  isVisible = true;

  massage$ = this.notificationFacade.selectNotification$;

  constructor(private notificationFacade: NotificationFacade) {
  }
  close() {
    this.notificationFacade.dismissNotification(null);
  }
}

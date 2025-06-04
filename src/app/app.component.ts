import { Component } from '@angular/core';
import { NotificationFormComponent } from './notifications/notification-form/notification-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NotificationFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notification-app';
}

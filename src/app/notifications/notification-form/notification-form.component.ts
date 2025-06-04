import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../notification.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.css'],
  imports: [CommonModule, FormsModule]
})
export class NotificationFormComponent implements OnInit {
  message: string = '';
  type: string = 'email';
  notifications: any[] = [];
  isBrowser: boolean;

  constructor(
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.loadNotifications();
  }

  send(): void {
    this.notificationService.sendNotification(this.message, this.type).subscribe({
      next: () => {
        if (this.isBrowser) {
          alert('✅ Notificación enviada'); // Se ejecuta solo en el navegador
        }
        this.message = '';
        this.loadNotifications();
      },
      error: () => {
        if (this.isBrowser) {
          alert('❌ Error al enviar notificación');
        }
      }
    });
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (data) => this.notifications = data,
      error: () => {
        if (this.isBrowser) {
          alert(' Error al cargar notificaciones');
        }
      }
    });
  }
}

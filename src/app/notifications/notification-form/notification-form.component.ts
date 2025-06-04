import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../notification.service';

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

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  send(): void {
    this.notificationService.sendNotification(this.message, this.type).subscribe({
      next: () => {
        alert('✅ Notificación enviada');
        this.message = '';
        this.loadNotifications();
      },
      error: () => alert('❌ Error al enviar notificación')
    });
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (data) => this.notifications = data,
      error: () => alert('❌ Error al cargar notificaciones')
    });
  }
}

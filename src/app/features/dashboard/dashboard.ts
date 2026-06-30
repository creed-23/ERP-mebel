import { Component, inject, signal } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { OwnerDashboard } from './pages/owner-dashboard/owner-dashboard';
import { WorkshopDashboard } from './pages/workshop-dashboard/workshop-dashboard';
import { WorkerDashboard } from './pages/worker-dashboard/worker-dashboard';
import { OrderDrawer } from '@shared/components/overlays/order-drawer/order-drawer';
import { SmsModal, SmsTarget } from '@shared/components/overlays/sms-modal/sms-modal';

/**
 * Dashboard — rolь asosida mos bosh sahifani ko'rsatadi.
 * Login response'idan kelgan role (AuthService) ga qarab
 * owner / workshop / worker dashboard render qilinadi.
 */
@Component({
  selector: 'app-dashboard',
  imports: [OwnerDashboard, WorkshopDashboard, WorkerDashboard, OrderDrawer, SmsModal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private auth = inject(AuthService);

  role = this.auth.role;

  orderDrawerOpen = signal(false);
  smsOpen = signal(false);
  smsTarget = signal<SmsTarget | null>(null);

  openOrderDrawer(): void {
    this.orderDrawerOpen.set(true);
  }

  openSms(target: SmsTarget): void {
    this.smsTarget.set(target);
    this.smsOpen.set(true);
  }
}

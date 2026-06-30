import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FactoryDataService } from '@core/services/factory-data.service';
import { StatCard } from '@shared/components/stat-card/stat-card';
import { LineChart } from '@shared/components/charts/line-chart';
import { DonutChart } from '@shared/components/charts/donut-chart';
import { StatusBadge } from '@shared/components/status-badge/status-badge';
import { Button } from '@shared/components/button/button';
import { RevenuePoint, SeriesPoint, WorkshopRow } from '@shared/interfaces/factory.interface';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [TranslatePipe, StatCard, LineChart, DonutChart, StatusBadge, Button],
  templateUrl: './owner-dashboard.html',
  styleUrl: './owner-dashboard.scss',
})
export class OwnerDashboard {
  private data = inject(FactoryDataService);
  private translate = inject(TranslateService);

  @Output() addOrder = new EventEmitter<void>();

  revenue = signal<RevenuePoint[]>([]);
  ordersByWorkshop = signal<SeriesPoint[]>([]);
  workshops = signal<WorkshopRow[]>([]);

  totalOrders = 324;

  constructor() {
    this.data.getRevenueDynamics().subscribe((d) => this.revenue.set(d));
    this.data.getOrdersByWorkshop().subscribe((d) => this.ordersByWorkshop.set(d));
    this.data.getWorkshops().subscribe((d) => this.workshops.set(d));
  }

  t(key: string, params?: object): string {
    return this.translate.instant(key, params);
  }
}

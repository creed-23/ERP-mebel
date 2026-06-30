import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FactoryDataService } from '@core/services/factory-data.service';
import { StatCard } from '@shared/components/stat-card/stat-card';
import { LineChart } from '@shared/components/charts/line-chart';
import { DonutChart } from '@shared/components/charts/donut-chart';
import { StatusBadge } from '@shared/components/status-badge/status-badge';
import { Button } from '@shared/components/button/button';
import { TableColumn, TableDefalt } from '@shared/components/tables/table-defalt/table-defalt';
import { TableCellDirective } from '@shared/components/tables/table-defalt/table-cell.directive';
import { RevenuePoint, SeriesPoint, WorkshopRow } from '@shared/interfaces/factory.interface';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [
    TranslatePipe,
    StatCard,
    LineChart,
    DonutChart,
    StatusBadge,
    Button,
    TableDefalt,
    TableCellDirective,
  ],
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

  columns: TableColumn[] = [
    { key: 'name', label: 'LABELS.WORKSHOPS' },
    { key: 'workers', label: 'LABELS.WORKERS' },
    { key: 'orders', label: 'LABELS.ORDERS' },
    { key: 'revenue', label: 'LABELS.REVENUE' },
    { key: 'status', label: 'LABELS.STATUS' },
  ];

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

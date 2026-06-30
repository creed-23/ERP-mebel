import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FactoryDataService } from '@core/services/factory-data.service';
import { StatCard } from '@shared/components/stat-card/stat-card';
import { StatusBadge } from '@shared/components/status-badge/status-badge';
import { Button } from '@shared/components/button/button';
import { CatalogItem, FurnitureCategory, OrderRow } from '@shared/interfaces/factory.interface';
import { PathResources } from '@shared/resources/path_resource';

@Component({
  selector: 'app-worker-dashboard',
  standalone: true,
  imports: [TranslatePipe, StatCard, StatusBadge, Button],
  templateUrl: './worker-dashboard.html',
  styleUrl: './worker-dashboard.scss',
})
export class WorkerDashboard {
  private data = inject(FactoryDataService);
  private translate = inject(TranslateService);
  private router = inject(Router);

  orders = signal<OrderRow[]>([]);
  catalog = signal<CatalogItem[]>([]);
  catFilter = signal<FurnitureCategory | 'all'>('all');

  cats: (FurnitureCategory | 'all')[] = ['all', 'divan', 'armchair', 'bed', 'office', 'tableChair'];

  todayLog = [
    { time: '09:14', action: 'WORKER.CAME_IN' },
    { time: '12:00', action: 'WORKER.LUNCH' },
    { time: '13:00', action: 'WORKER.RETURNED' },
  ];

  filtered = computed(() => {
    const f = this.catFilter();
    return f === 'all' ? this.catalog() : this.catalog().filter((i) => i.category === f);
  });

  constructor() {
    this.data.getWorkerOrders().subscribe((d) => this.orders.set(d));
    this.data.getCatalog().subscribe((d) => this.catalog.set(d));
  }

  t(key: string, params?: object): string {
    return this.translate.instant(key, params);
  }

  setFilter(c: FurnitureCategory | 'all'): void {
    this.catFilter.set(c);
  }

  view(item: CatalogItem): void {
    this.router.navigate(['/', PathResources.DIMENSIONS, item.id]);
  }
}

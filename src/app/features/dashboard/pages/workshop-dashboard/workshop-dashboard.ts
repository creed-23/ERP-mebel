import { Component, EventEmitter, Output, computed, inject, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FactoryDataService } from '@core/services/factory-data.service';
import { StatCard } from '@shared/components/stat-card/stat-card';
import { BarChart } from '@shared/components/charts/bar-chart';
import { RingProgress } from '@shared/components/ring-progress/ring-progress';
import { Avatar } from '@shared/components/avatar/avatar';
import { Button } from '@shared/components/button/button';
import { SmsTarget } from '@shared/components/overlays/sms-modal/sms-modal';
import {
  AttendanceItem,
  DebtorMini,
  KanbanCard,
  KanbanColumns,
  WeeklyOrderPoint,
} from '@shared/interfaces/factory.interface';
import { initials } from '@shared/utils/text.util';

interface KanbanColumn {
  key: keyof KanbanColumns;
  dotClass: string;
  cards: KanbanCard[];
}

@Component({
  selector: 'app-workshop-dashboard',
  standalone: true,
  imports: [TranslatePipe, StatCard, BarChart, RingProgress, Avatar, Button],
  templateUrl: './workshop-dashboard.html',
  styleUrl: './workshop-dashboard.scss',
})
export class WorkshopDashboard {
  private data = inject(FactoryDataService);
  private translate = inject(TranslateService);

  @Output() addOrder = new EventEmitter<void>();
  @Output() sms = new EventEmitter<SmsTarget>();

  weekly = signal<WeeklyOrderPoint[]>([]);
  attendance = signal<AttendanceItem[]>([]);
  debtors = signal<DebtorMini[]>([]);
  kanban = signal<KanbanColumns | null>(null);

  cameCount = computed(() => this.attendance().filter((a) => a.came).length);
  attendanceTotal = computed(() => this.attendance().length);
  attendancePct = computed(() =>
    this.attendanceTotal() ? Math.round((this.cameCount() / this.attendanceTotal()) * 100) : 0,
  );

  columns = computed<KanbanColumn[]>(() => {
    const k = this.kanban();
    if (!k) return [];
    return [
      { key: 'new', dotClass: 'k-new', cards: k.new },
      { key: 'inProgress', dotClass: 'k-progress', cards: k.inProgress },
      { key: 'checking', dotClass: 'k-checking', cards: k.checking },
      { key: 'done', dotClass: 'k-done', cards: k.done },
    ];
  });

  readonly primaryColor = 'var(--color-primary)';
  readonly successColor = 'var(--color-success)';

  constructor() {
    this.data.getWeeklyOrders().subscribe((d) => this.weekly.set(d));
    this.data.getAttendance().subscribe((d) => this.attendance.set(d));
    this.data.getWorkshopDebtors().subscribe((d) => this.debtors.set(d));
    this.data.getKanban().subscribe((d) => this.kanban.set(d));
  }

  t(key: string, params?: object): string {
    return this.translate.instant(key, params);
  }

  ini = (name: string) => initials(name);

  onSms(d: DebtorMini): void {
    this.sms.emit({ name: d.name, phone: d.phone, amount: d.amount });
  }
}

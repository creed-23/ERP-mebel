import { Component, inject, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FactoryDataService } from '@core/services/factory-data.service';
import { StatCard } from '@shared/components/stat-card/stat-card';
import { Avatar } from '@shared/components/avatar/avatar';
import { Button } from '@shared/components/button/button';
import { AvansModal } from '@shared/components/overlays/avans-modal/avans-modal';
import { TableColumn, TableDefalt } from '@shared/components/tables/table-defalt/table-defalt';
import { TableCellDirective } from '@shared/components/tables/table-defalt/table-cell.directive';
import { SalaryRow } from '@shared/interfaces/factory.interface';
import { initials } from '@shared/utils/text.util';

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [TranslatePipe, StatCard, Avatar, Button, AvansModal, TableDefalt, TableCellDirective],
  templateUrl: './salary.html',
  styleUrl: './salary.scss',
})
export class Salary {
  private data = inject(FactoryDataService);
  private translate = inject(TranslateService);

  rows = signal<SalaryRow[]>([]);
  month = signal('Iyun 2024');

  columns: TableColumn[] = [
    { key: 'name', label: 'LABELS.NAME' },
    { key: 'days', label: 'LABELS.DAYS' },
    { key: 'hours', label: 'LABELS.HOURS' },
    { key: 'rate', label: 'LABELS.RATE' },
    { key: 'salary', label: 'LABELS.SALARY' },
    { key: 'avans', label: 'LABELS.ADVANCE' },
    { key: 'qoldiq', label: 'LABELS.REMAINDER' },
  ];

  avansOpen = signal(false);
  selectedWorker = signal<SalaryRow | null>(null);

  constructor() {
    this.data.getSalaries().subscribe((d) => this.rows.set(d));
  }

  t(key: string, params?: object): string {
    return this.translate.instant(key, params);
  }

  ini = (name: string) => initials(name);

  openAvans(row: SalaryRow): void {
    this.selectedWorker.set(row);
    this.avansOpen.set(true);
  }
}

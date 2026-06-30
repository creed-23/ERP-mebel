import { Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FactoryDataService } from '@core/services/factory-data.service';
import { Avatar } from '@shared/components/avatar/avatar';
import { Button } from '@shared/components/button/button';
import { StatusBadge } from '@shared/components/status-badge/status-badge';
import { SmsModal, SmsTarget } from '@shared/components/overlays/sms-modal/sms-modal';
import { Debtor } from '@shared/interfaces/factory.interface';
import { initials } from '@shared/utils/text.util';

type DebtTab = 'all' | 'overdue' | 'thisWeek' | 'paid';

@Component({
  selector: 'app-debtors',
  standalone: true,
  imports: [TranslatePipe, Avatar, Button, StatusBadge, SmsModal],
  templateUrl: './debtors.html',
  styleUrl: './debtors.scss',
})
export class Debtors {
  private data = inject(FactoryDataService);
  private translate = inject(TranslateService);

  all = signal<Debtor[]>([]);
  tab = signal<DebtTab>('all');

  smsOpen = signal(false);
  smsTarget = signal<SmsTarget | null>(null);

  tabs: { key: DebtTab; label: string }[] = [
    { key: 'all', label: 'DEBTORS.TAB_ALL' },
    { key: 'overdue', label: 'DEBTORS.TAB_OVERDUE' },
    { key: 'thisWeek', label: 'DEBTORS.TAB_WEEK' },
    { key: 'paid', label: 'DEBTORS.TAB_PAID' },
  ];

  filtered = computed(() => {
    const list = this.all();
    switch (this.tab()) {
      case 'overdue':
        return list.filter((d) => d.overdue);
      case 'thisWeek':
        return list.slice(0, 6);
      case 'paid':
        return list.slice(0, 3);
      default:
        return list;
    }
  });

  constructor() {
    this.data.getDebtors().subscribe((d) => this.all.set(d));
  }

  t(key: string, params?: object): string {
    return this.translate.instant(key, params);
  }

  ini = (name: string) => initials(name);

  count(tab: DebtTab): number {
    const list = this.all();
    switch (tab) {
      case 'overdue':
        return list.filter((d) => d.overdue).length;
      case 'thisWeek':
        return Math.min(6, list.length);
      case 'paid':
        return Math.min(3, list.length);
      default:
        return list.length;
    }
  }

  openSms(d: Debtor): void {
    this.smsTarget.set({ name: d.name, phone: d.phone, amount: d.amount });
    this.smsOpen.set(true);
  }
}

import { Component, Input, computed, inject, signal } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ThemeService } from '@styles/themes/theme.service';
import { SeriesPoint } from '@shared/interfaces/factory.interface';
import { readChartColors } from './chart-colors';

/** Donut chart markaziy umumiy son bilan. */
@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  template: `
    <apx-chart
      [series]="opts().series"
      [chart]="opts().chart"
      [labels]="opts().labels"
      [colors]="opts().colors"
      [stroke]="opts().stroke"
      [legend]="opts().legend"
      [dataLabels]="opts().dataLabels"
      [plotOptions]="opts().plotOptions"
      [tooltip]="opts().tooltip"
    ></apx-chart>
  `,
})
export class DonutChart {
  private theme = inject(ThemeService);

  @Input() set data(value: SeriesPoint[]) {
    this._data.set(value ?? []);
  }
  private _data = signal<SeriesPoint[]>([]);

  @Input() centerLabel = 'Total';
  @Input() height = 230;

  opts = computed(() => {
    this.theme.theme();
    const c = readChartColors();
    const d = this._data();
    const total = d.reduce((s, x) => s + x.value, 0);
    return {
      series: d.map((x) => x.value),
      labels: d.map((x) => x.label),
      chart: { type: 'donut' as const, height: this.height, fontFamily: 'inherit', background: 'transparent' },
      colors: [c.primary, c.purple, c.teal, c.warning, c.danger],
      stroke: { colors: [c.card], width: 2 },
      dataLabels: { enabled: false },
      legend: { show: false },
      tooltip: { theme: this.theme.isDark() ? 'dark' : 'light' },
      plotOptions: {
        pie: {
          donut: {
            size: '68%',
            labels: {
              show: true,
              total: {
                show: true,
                label: this.centerLabel,
                color: c.textMuted,
                fontSize: '11px',
                formatter: () => String(total),
              },
              value: { color: c.text, fontSize: '22px', fontWeight: 700 },
            },
          },
        },
      },
    };
  });
}

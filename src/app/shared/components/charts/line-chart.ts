import { Component, Input, computed, inject, signal } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ThemeService } from '@styles/themes/theme.service';
import { RevenuePoint } from '@shared/interfaces/factory.interface';
import { readChartColors } from './chart-colors';

/** Ikki seriyali line chart (tushum dinamikasi). */
@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  template: `
    <apx-chart
      [series]="opts().series"
      [chart]="opts().chart"
      [xaxis]="opts().xaxis"
      [yaxis]="opts().yaxis"
      [colors]="opts().colors"
      [stroke]="opts().stroke"
      [grid]="opts().grid"
      [tooltip]="opts().tooltip"
      [legend]="opts().legend"
      [dataLabels]="opts().dataLabels"
    ></apx-chart>
  `,
})
export class LineChart {
  private theme = inject(ThemeService);

  @Input() set data(value: RevenuePoint[]) {
    this._data.set(value ?? []);
  }
  private _data = signal<RevenuePoint[]>([]);

  @Input() receivedLabel = 'Received';
  @Input() completedLabel = 'Completed';
  @Input() height = 200;

  opts = computed(() => {
    this.theme.theme(); // theme o'zgarsa qayta hisoblansin
    const c = readChartColors();
    const d = this._data();
    return {
      series: [
        { name: this.receivedLabel, data: d.map((x) => x.received) },
        { name: this.completedLabel, data: d.map((x) => x.completed) },
      ],
      chart: { type: 'line' as const, height: this.height, toolbar: { show: false }, fontFamily: 'inherit', background: 'transparent' },
      colors: [c.primary, c.success],
      stroke: { width: 2, curve: 'smooth' as const },
      dataLabels: { enabled: false },
      grid: { borderColor: c.border, strokeDashArray: 4 },
      xaxis: {
        categories: d.map((x) => x.month),
        labels: { style: { colors: c.textMuted, fontSize: '11px' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: { labels: { style: { colors: c.textMuted, fontSize: '11px' } } },
      legend: { show: false },
      tooltip: { theme: this.theme.isDark() ? 'dark' : 'light' },
    };
  });
}

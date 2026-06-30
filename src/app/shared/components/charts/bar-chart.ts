import { Component, Input, computed, inject, signal } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ThemeService } from '@styles/themes/theme.service';
import { WeeklyOrderPoint } from '@shared/interfaces/factory.interface';
import { readChartColors } from './chart-colors';

/** Ikki seriyali ustunli chart (haftalik zakaz holati). */
@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  template: `
    <apx-chart
      [series]="opts().series"
      [chart]="opts().chart"
      [xaxis]="opts().xaxis"
      [yaxis]="opts().yaxis"
      [colors]="opts().colors"
      [grid]="opts().grid"
      [plotOptions]="opts().plotOptions"
      [dataLabels]="opts().dataLabels"
      [legend]="opts().legend"
      [tooltip]="opts().tooltip"
    ></apx-chart>
  `,
})
export class BarChart {
  private theme = inject(ThemeService);

  @Input() set data(value: WeeklyOrderPoint[]) {
    this._data.set(value ?? []);
  }
  private _data = signal<WeeklyOrderPoint[]>([]);

  @Input() completedLabel = 'Completed';
  @Input() createdLabel = 'New';
  @Input() height = 170;

  opts = computed(() => {
    this.theme.theme();
    const c = readChartColors();
    const d = this._data();
    return {
      series: [
        { name: this.completedLabel, data: d.map((x) => x.completed) },
        { name: this.createdLabel, data: d.map((x) => x.created) },
      ],
      chart: { type: 'bar' as const, height: this.height, toolbar: { show: false }, fontFamily: 'inherit', background: 'transparent' },
      colors: [c.primary, c.teal],
      dataLabels: { enabled: false },
      grid: { borderColor: c.border, strokeDashArray: 4, xaxis: { lines: { show: false } } },
      plotOptions: { bar: { columnWidth: '45%', borderRadius: 3, borderRadiusApplication: 'end' as const } },
      xaxis: {
        categories: d.map((x) => x.day),
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

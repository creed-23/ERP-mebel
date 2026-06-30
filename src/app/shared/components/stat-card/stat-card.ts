import { Component, Input } from '@angular/core';

export type StatColor = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'teal';

/**
 * StatCard — dashboard statistik karta.
 * O'ng tomonga ixtiyoriy slot (ring/progress) qo'yish uchun
 * `<app-stat-card>...</app-stat-card>` ichidagi kontent header'ga joylanadi.
 */
@Component({
  selector: 'app-stat-card',
  standalone: true,
  template: `
    <div class="stat-card">
      <div class="stat-card__top">
        <div class="stat-card__icon" [class]="'ic-' + iconColor">
          <i [class]="icon"></i>
        </div>

        @if (trend) {
          <span class="stat-card__trend" [class.is-up]="trendUp" [class.is-down]="!trendUp">
            <i class="pi" [class.pi-arrow-up-right]="trendUp" [class.pi-arrow-down-right]="!trendUp"></i>
            {{ trend }}
          </span>
        }

        <ng-content select="[slot=top-right]"></ng-content>
      </div>

      <div class="stat-card__body">
        <div class="stat-card__value">{{ value }}</div>
        @if (subValue) {
          <div class="stat-card__sub">{{ subValue }}</div>
        }
        <div class="stat-card__label">{{ label }}</div>
      </div>
    </div>
  `,
  styles: `
    .stat-card {
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: var(--color-bg-elevated);
      border: 1px solid var(--color-border);
      border-radius: 12px;
      padding: 20px;
    }
    .stat-card__top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
    }
    .stat-card__icon {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      i {
        font-size: 18px;
      }
    }
    .ic-primary { background: color-mix(in srgb, var(--color-primary) 10%, transparent); color: var(--color-primary); }
    .ic-success { background: color-mix(in srgb, var(--color-success) 10%, transparent); color: var(--color-success); }
    .ic-warning { background: color-mix(in srgb, var(--color-warning) 10%, transparent); color: var(--color-warning); }
    .ic-danger { background: color-mix(in srgb, var(--color-danger) 10%, transparent); color: var(--color-danger); }
    .ic-info { background: color-mix(in srgb, var(--color-info) 10%, transparent); color: var(--color-info); }
    .ic-purple { background: rgba(124, 58, 237, 0.1); color: #7c3aed; }
    .ic-teal { background: rgba(13, 148, 136, 0.1); color: #0d9488; }

    .stat-card__trend {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      font-size: 12px;
      font-weight: 500;
      &.is-up { color: var(--color-success); }
      &.is-down { color: var(--color-danger); }
      i { font-size: 11px; }
    }
    .stat-card__body {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .stat-card__value {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--color-text-primary);
    }
    .stat-card__sub {
      font-size: 12px;
      font-weight: 500;
      color: var(--color-success);
    }
    .stat-card__label {
      font-size: 12px;
      color: var(--color-text-secondary);
    }
  `,
})
export class StatCard {
  @Input() icon = 'pi pi-chart-bar';
  @Input() iconColor: StatColor = 'primary';
  @Input() value = '';
  @Input() label = '';
  @Input() subValue?: string;
  @Input() trend?: string;
  @Input() trendUp = true;
}

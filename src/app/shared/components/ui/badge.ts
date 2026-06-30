import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant =
  | 'primary' // indigo to'q
  | 'primary-subtle' // indigo och
  | 'success' // yashil to'q
  | 'success-subtle' // yashil och
  | 'warning' // sariq to'q
  | 'warning-subtle' // sariq och
  | 'danger' // qizil to'q
  | 'danger-subtle' // qizil och
  | 'info' // ko'k to'q
  | 'info-subtle' // ko'k och
  | 'neutral'; // kulrang (fon rangi)

export type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" [class]="'badge--' + variant + ' badge--' + size">
      <ng-content></ng-content>
    </span>
  `,
  styles: `
    .badge {
      display: inline-flex;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      border-radius: 20px;
      white-space: nowrap;
      line-height: 1;

      &--sm {
        font-size: 10px;
        padding: 2px 8px;
      }

      &--md {
        font-size: 11px;
        padding: 3px 10px;
      }

      &--lg {
        font-size: 13px;
        padding: 5px 14px;
      }
      &--primary {
        background-color: var(--color-primary);
        color: var(--color-text-inverse);
      }

      &--primary-subtle {
        background-color: var(--color-primary-subtle);
        color: var(--color-primary-text);
      }

      &--success {
        background-color: var(--color-success);
        color: var(--color-text-inverse);
      }

      &--success-subtle {
        background-color: var(--color-success-subtle);
        color: var(--color-success-text);
      }

      &--warning {
        background-color: var(--color-warning);
        color: var(--color-text-inverse);
      }

      &--warning-subtle {
        background-color: var(--color-warning-subtle);
        color: var(--color-warning-text);
      }

      &--danger {
        background-color: var(--color-danger);
        color: var(--color-text-inverse);
      }

      &--danger-subtle {
        background-color: var(--color-danger-subtle);
        color: var(--color-danger-text);
      }

      &--info {
        background-color: var(--color-info);
        color: var(--color-text-inverse);
      }

      &--info-subtle {
        background-color: var(--color-info-subtle);
        color: var(--color-info-text);
      }

      &--neutral {
        background-color: var(--color-bg-subtle);
        color: var(--color-text-secondary);
      }
    }
  `,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'primary';
  @Input() size: BadgeSize = 'md';
}

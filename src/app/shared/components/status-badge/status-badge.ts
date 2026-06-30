import { Component, Input, computed, signal } from '@angular/core';

export type StatusKind =
  | 'done'
  | 'inProgress'
  | 'pending'
  | 'cancelled'
  | 'new'
  | 'checking'
  | 'danger'
  | 'warning'
  | 'active';

/**
 * StatusBadge — rangli nuqtali status chip.
 * `label` allaqachon tarjima qilingan matn bo'lib keladi.
 */
@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `
    <span class="status-badge" [class]="kindClass()" [class.status-badge--xs]="size === 'xs'">
      <span class="status-badge__dot"></span>
      {{ label }}
    </span>
  `,
  styles: `
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 2px 10px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
      line-height: 1.4;

      &--xs {
        padding: 1px 8px;
        font-size: 10px;
      }
    }
    .status-badge__dot {
      width: 6px;
      height: 6px;
      border-radius: 9999px;
      background: currentColor;
      flex-shrink: 0;
    }
    .k-primary {
      color: var(--color-primary);
      background: color-mix(in srgb, var(--color-primary) 10%, transparent);
    }
    .k-success {
      color: var(--color-success);
      background: color-mix(in srgb, var(--color-success) 12%, transparent);
    }
    .k-warning {
      color: var(--color-warning);
      background: color-mix(in srgb, var(--color-warning) 12%, transparent);
    }
    .k-danger {
      color: var(--color-danger);
      background: color-mix(in srgb, var(--color-danger) 12%, transparent);
    }
  `,
})
export class StatusBadge {
  @Input() set status(value: StatusKind | string) {
    this._status.set(value);
  }
  private _status = signal<string>('pending');

  @Input() label = '';
  @Input() size: 'xs' | 'sm' = 'sm';

  private readonly map: Record<string, string> = {
    done: 'k-success',
    active: 'k-success',
    inProgress: 'k-primary',
    new: 'k-primary',
    checking: 'k-warning',
    pending: 'k-warning',
    warning: 'k-warning',
    cancelled: 'k-danger',
    danger: 'k-danger',
  };

  kindClass = computed(() => this.map[this._status()] ?? 'k-warning');
}

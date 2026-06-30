import { Component, Input, computed, signal } from '@angular/core';

export type AvatarColor = 'auto' | 'blue' | 'purple' | 'teal' | 'green' | 'orange';

/**
 * Avatar — bosh harflar bilan dumaloq avatar.
 * Rang `auto` bo'lsa bosh harf kodidan avtomatik tanlanadi.
 */
@Component({
  selector: 'app-avatar',
  standalone: true,
  template: `
    <span
      class="avatar"
      [class]="colorClass()"
      [style.width.px]="size"
      [style.height.px]="size"
      [style.font-size.px]="fontSize()"
    >
      {{ initials }}
      @if (online) {
        <span class="avatar__dot"></span>
      }
    </span>
  `,
  styles: `
    .avatar {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border-radius: 9999px;
      font-weight: 600;
      line-height: 1;
      user-select: none;
    }
    .avatar__dot {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 25%;
      height: 25%;
      min-width: 8px;
      min-height: 8px;
      background: var(--color-success);
      border-radius: 9999px;
      border: 2px solid var(--color-bg-elevated);
    }
    .c-blue {
      background: color-mix(in srgb, var(--color-primary) 15%, transparent);
      color: var(--color-primary);
    }
    .c-purple {
      background: rgba(124, 58, 237, 0.15);
      color: #7c3aed;
    }
    .c-teal {
      background: rgba(13, 148, 136, 0.15);
      color: #0d9488;
    }
    .c-green {
      background: color-mix(in srgb, var(--color-success) 15%, transparent);
      color: var(--color-success);
    }
    .c-orange {
      background: color-mix(in srgb, var(--color-warning) 15%, transparent);
      color: var(--color-warning);
    }
  `,
})
export class Avatar {
  @Input() set initials(value: string) {
    this._initials.set(value ?? '');
  }
  get initials(): string {
    return this._initials();
  }
  private _initials = signal('');

  @Input() size = 32;
  @Input() online = false;
  @Input() color: AvatarColor = 'auto';

  private readonly palette = ['blue', 'purple', 'teal', 'green', 'orange'];

  colorClass = computed(() => {
    if (this.color !== 'auto') return 'c-' + this.color;
    const code = this._initials().charCodeAt(0) || 0;
    return 'c-' + this.palette[code % this.palette.length];
  });

  fontSize = computed(() => {
    const s = this.size;
    if (s <= 24) return 9;
    if (s <= 32) return 11;
    if (s <= 40) return 12;
    return 14;
  });
}

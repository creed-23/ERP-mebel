// ============================================================
// lang-switcher.component.ts — Til almashtirish tugmasi
// ============================================================
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from './language.service';

@Component({
  selector: 'app-lang-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lang-switcher">
      @for (lang of langService.languages; track lang.code) {
        <button
          class="lang-btn"
          [class.lang-btn--active]="langService.currentLang() === lang.code"
          (click)="langService.setLang(lang.code)"
          [attr.title]="lang.label"
        >
          <span class="lang-btn__flag">{{ lang.flag }}</span>
          <span class="lang-btn__code">{{ lang.code.toUpperCase() }}</span>
        </button>
      }
    </div>
  `,
  styles: [
    `
      .lang-switcher {
        display: flex;
        align-items: center;
        gap: 4px;
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg, 12px);
        padding: 4px;
      }

      .lang-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 8px 10px;
        border-radius: 8px;
        border: none;
        background: transparent;
        color: var(--color-text-secondary);
        font-size: 0.75rem;
        font-weight: 500;
        cursor: pointer;
        transition:
          background 150ms ease,
          color 150ms ease;

        &:hover:not(&--active) {
          background: var(--color-bg-overlay);
          color: var(--color-text-primary);
        }

        &--active {
          background: var(--color-bg-elevated);
          color: var(--color-text-primary);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        &__flag {
          font-size: 1rem;
          line-height: 1;
        }
        &__code {
          font-family: monospace;
          font-size: 0.7rem;
          letter-spacing: 0.05em;
        }
      }
    `,
  ],
})
export class LangSwitcherComponent {
  langService = inject(LanguageService);
}

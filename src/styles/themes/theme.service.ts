// ============================================================
// theme.service.ts — Dark/Light mode boshqaruvi
// Foydalanish: inject(ThemeService)
// ============================================================
import { Injectable, signal, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly STORAGE_KEY = 'app-theme';

  readonly theme = signal<Theme>(this.getInitialTheme());
  readonly isDark = () => this.theme() === 'dark';

  constructor() {
    // Theme o'zgarganda HTML elementga apply qiladi
    effect(() => {
      this.applyTheme(this.theme());
    });
  }

  toggle(): void {
    this.theme.set(this.isDark() ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  // ─── Private ────────────────────────────────────────────────

  private applyTheme(theme: Theme): void {
    const html = this.document.documentElement;
    html.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  private getInitialTheme(): Theme {
    // 1. localStorage'dan tekshiradi
    const stored = localStorage.getItem(this.STORAGE_KEY) as Theme;
    if (stored === 'light' || stored === 'dark') return stored;

    // 2. Tizim sozlamalaridan oladi
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}

// ============================================================
// Foydalanish misoli (component.ts):
//
// export class AppComponent {
//   themeService = inject(ThemeService);
// }
//
// Template:
// <button (click)="themeService.toggle()">
//   {{ themeService.isDark() ? '☀️' : '🌙' }}
// </button>
// ============================================================

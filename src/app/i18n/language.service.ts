import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type Lang = 'uz' | 'ru' | 'en';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translate = inject(TranslateService);

  private readonly STORAGE_KEY = 'app-lang';

  readonly currentLang = signal<Lang>(this.getSavedLang());

  readonly languages = [
    { code: 'uz' as Lang, label: "O'zbek", flag: '🇺🇿' },
    { code: 'ru' as Lang, label: 'Русский', flag: '🇷🇺' },
    { code: 'en' as Lang, label: 'English', flag: '🇬🇧' },
  ];

  setLang(lang: Lang): void {
    this.currentLang.set(lang);

    this.translate.use(lang);

    localStorage.setItem(this.STORAGE_KEY, lang);

    document.documentElement.setAttribute('lang', lang);
  }

  getSavedLang(): Lang {
    const stored = localStorage.getItem(this.STORAGE_KEY);

    if (stored === 'uz' || stored === 'ru' || stored === 'en') {
      return stored;
    }

    return 'uz';
  }
}

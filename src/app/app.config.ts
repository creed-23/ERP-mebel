import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { provideTranslateService, TranslateService } from '@ngx-translate/core';

import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { LanguageService } from './i18n/language.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideHttpClient(),

    provideTranslateService({
      fallbackLang: 'uz',
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json',
      }),
    }),

    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      const languageService = inject(LanguageService);

      const lang = languageService.getSavedLang();

      translate.addLangs(['uz', 'ru', 'en']);

      document.documentElement.setAttribute('lang', lang);

      return translate.use(lang);
    }),
  ],
};

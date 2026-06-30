import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '../styles/themes/theme.service';
import { LanguageService } from './i18n/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  themeService = inject(ThemeService);
  private lang = inject(LanguageService);
}

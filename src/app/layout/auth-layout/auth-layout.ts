import { Component, inject } from '@angular/core';
import { LangSwitcherComponent } from '@i18n/lang-switcher.component';
import { ThemeService } from '@styles/themes/theme.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [LangSwitcherComponent, RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {
  themeService = inject(ThemeService);
}

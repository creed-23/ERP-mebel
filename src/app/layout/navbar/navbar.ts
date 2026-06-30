import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter, Subscription } from 'rxjs';

import { MenuItem } from 'primeng/api';

import { BreadcrumbModule } from 'primeng/breadcrumb';

import { TranslateService } from '@ngx-translate/core';

import { LangSwitcherComponent } from '../../i18n/lang-switcher.component';
import { ThemeService } from '@styles/themes/theme.service';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [BreadcrumbModule, LangSwitcherComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit, OnDestroy {
  private router = inject(Router);
  themeService = inject(ThemeService);
  sidebarService = inject(SidebarService);
  private activatedRoute = inject(ActivatedRoute);

  private translate = inject(TranslateService);

  private subscriptions = new Subscription();

  items: MenuItem[] = [];

  home: MenuItem = {
    icon: 'pi pi-home',
    routerLink: '/dashboard',
  };

  ngOnInit(): void {
    this.updateBreadcrumb();

    this.subscriptions.add(
      this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
        this.updateBreadcrumb();
      }),
    );

    this.subscriptions.add(
      this.translate.onLangChange.subscribe(() => {
        this.updateBreadcrumb();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private updateBreadcrumb(): void {
    this.items = this.buildBreadcrumb(this.activatedRoute.root);
  }

  private buildBreadcrumb(route: ActivatedRoute, breadcrumbs: MenuItem[] = []): MenuItem[] {
    const child = route.firstChild;

    if (!child) {
      return breadcrumbs;
    }

    const key = child.snapshot.data['breadcrumb'];

    if (key) {
      breadcrumbs.push({
        label: this.translate.instant(key),
      });
    }

    return this.buildBreadcrumb(child, breadcrumbs);
  }
}

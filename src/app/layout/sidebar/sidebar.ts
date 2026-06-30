import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { environment } from '@env/environment';
import { TranslatePipe } from '@ngx-translate/core';
import { PathResources } from '@shared/resources/path_resource';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  sidebarService = inject(SidebarService);
  AppName = environment.appName;

  menus = [
    {
      label: 'NAV.DASHBOARD',
      icon: 'pi pi-home',
      route: PathResources.DASHBOARD,
    },

    {
      label: 'NAV.MASTERS',
      icon: 'pi pi-users',
      route: PathResources.MASTERS,
    },
    {
      label: 'NAV.MEBEL_SIZE',
      icon: 'pi pi-chart-line',
      route: PathResources.MEBEL_SIZE,
    },
    {
      label: 'Qarzlar',
      icon: 'pi pi-wallet',
      route: '/debts',
    },
  ];
  toggle() {
    this.sidebarService.toggle();
  }
  closeMobile() {
    this.sidebarService.close();
  }
}

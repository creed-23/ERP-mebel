import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { environment } from '@env/environment';
import { TranslatePipe } from '@ngx-translate/core';
import { PathResources } from '@shared/resources/path_resource';
import { AuthService } from '@core/services/auth.service';
import { Avatar } from '@shared/components/avatar/avatar';
import { Role } from '@shared/interfaces/factory.interface';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, Avatar],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  sidebarService = inject(SidebarService);
  private auth = inject(AuthService);
  private router = inject(Router);

  AppName = environment.appName;
  user = this.auth.user;
  role = this.auth.role;

  private readonly menusByRole: Record<Role, MenuItem[]> = {
    owner: [
      { label: 'NAV.HOME', icon: 'pi pi-home', route: '/' + PathResources.DASHBOARD },
      { label: 'NAV.WORKERS', icon: 'pi pi-users', route: '/' + PathResources.MASTERS },
      { label: 'NAV.SALARY', icon: 'pi pi-chart-bar', route: '/' + PathResources.SALARY },
      { label: 'NAV.DEBTORS', icon: 'pi pi-wallet', route: '/' + PathResources.DEBTORS },
      { label: 'NAV.DIMENSIONS', icon: 'pi pi-box', route: '/' + PathResources.DIMENSIONS },
    ],
    workshop: [
      { label: 'NAV.HOME', icon: 'pi pi-home', route: '/' + PathResources.DASHBOARD },
      { label: 'NAV.WORKERS', icon: 'pi pi-users', route: '/' + PathResources.MASTERS },
      { label: 'NAV.DEBTORS', icon: 'pi pi-wallet', route: '/' + PathResources.DEBTORS },
      { label: 'NAV.DIMENSIONS', icon: 'pi pi-box', route: '/' + PathResources.DIMENSIONS },
    ],
    worker: [
      { label: 'NAV.ORDERS', icon: 'pi pi-clipboard', route: '/' + PathResources.DASHBOARD },
      { label: 'NAV.DIMENSIONS', icon: 'pi pi-box', route: '/' + PathResources.DIMENSIONS },
    ],
  };

  menus = computed(() => this.menusByRole[this.role()]);

  toggle(): void {
    this.sidebarService.toggle();
  }
  closeMobile(): void {
    this.sidebarService.close();
  }
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/', PathResources.AUTH, PathResources.LOGIN]);
  }
}

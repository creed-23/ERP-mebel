import { Routes } from '@angular/router';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';
import { Breadcrumb } from 'primeng/breadcrumb';
import { FEATURES } from './features/features.routing';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { PathResources } from './shared/resources/path_resource';

export const routes: Routes = [
  {
    path: PathResources.EMPTY,
    redirectTo: PathResources.DASHBOARD,
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardLayout,
    children: [
      {
        path: PathResources.EMPTY,
        loadChildren: () => import('./features/features.routing').then((m) => m.FEATURES),
      },
    ],
  },
  {
    path: PathResources.AUTH,
    component: AuthLayout,
    children: [
      {
        path: PathResources.EMPTY,
        loadChildren: () => import('./features/auth/auth.routing').then((c) => c.AUTH),
      },
    ],
  },
];

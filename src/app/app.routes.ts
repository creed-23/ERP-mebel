import { Routes } from '@angular/router';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';
import { FEATURES } from './features/features.routing';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { PathResources } from './shared/resources/path_resource';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: PathResources.EMPTY,
    redirectTo: PathResources.DASHBOARD,
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardLayout,
    canActivate: [authGuard],
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

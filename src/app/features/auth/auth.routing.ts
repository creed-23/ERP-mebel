import { Routes } from '@angular/router';
import { PathResources } from '@shared/resources/path_resource';

export const AUTH: Routes = [
  {
    path: PathResources.LOGIN,
    loadComponent: () => import('./pages/login/login').then((c) => c.Login),
  },
  {
    path: PathResources.FORGOT,
    loadComponent: () => import('./pages/forgot/forgot').then((c) => c.Forgot),
  },
];

import { Routes } from '@angular/router';
import { PathResources } from '@shared/resources/path_resource';

export const FEATURES: Routes = [
  {
    path: PathResources.DASHBOARD,
    loadComponent: () => import('./dashboard/dashboard').then((c) => c.Dashboard),
    data: {
      breadcrumb: 'NAV.DASHBOARD',
    },
  },
  {
    path: PathResources.MASTERS,
    loadComponent: () => import('./masters/masters').then((c) => c.Masters),
    data: {
      breadcrumb: 'NAV.MASTERS',
    },
  },
  {
    path: PathResources.MASTER_ID,
    loadComponent: () =>
      import('./masters/pages/master-detail/master-detail').then((C) => C.MasterDetail),
    data: {
      breadcrumb: 'NAV.MASTER',
    },
  },
  {
    path: PathResources.MEBEL_SIZE,
    loadComponent: () => import('./mebel-sizes/mebel-sizes').then((c) => c.MebelSizes),
    data: {
      breadcrumb: 'NAV.MEBEL_SIZE',
    },
  },
  {
    path: PathResources.SIZE_ID,
    loadComponent: () =>
      import('./mebel-sizes/pages/size-detail/size-detail').then((C) => C.SizeDetail),
    data: {
      breadcrumb: 'NAV.MEBEL_SIZE',
    },
  },
  {
    path: PathResources.SALARY,
    loadComponent: () => import('./salary/salary').then((c) => c.Salary),
    data: { breadcrumb: 'NAV.SALARY' },
  },
  {
    path: PathResources.DEBTORS,
    loadComponent: () => import('./debtors/debtors').then((c) => c.Debtors),
    data: { breadcrumb: 'NAV.DEBTORS' },
  },
  {
    path: PathResources.DIMENSIONS,
    loadComponent: () => import('./dimensions/dimensions').then((c) => c.Dimensions),
    data: { breadcrumb: 'NAV.DIMENSIONS' },
  },
  {
    path: PathResources.DIMENSION_ID,
    loadComponent: () =>
      import('./dimensions/pages/dimension-detail/dimension-detail').then((c) => c.DimensionDetail),
    data: { breadcrumb: 'NAV.DIMENSIONS' },
  },
];

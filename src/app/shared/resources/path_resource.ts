export enum PathResources {
  // ADDITIONAL
  EMPTY = '',
  SLASH = '/',
  ID = ':id',

  // page
  DASHBOARD = 'dashboard',
  AUTH = 'auth',
  LOGIN = 'login',
  FORGOT = 'forgot',
  MASTERS = 'masters',
  MASTER = 'master',
  MEBEL_SIZE = 'mebel-size',

  // factory pages
  WORKSHOPS = 'workshops',
  WORKERS = 'workers',
  SALARY = 'salary',
  DEBTORS = 'debtors',
  DIMENSIONS = 'dimensions',
  ATTENDANCE = 'attendance',
  REPORTS = 'reports',
  SETTINGS = 'settings',

  // id
  MASTER_ID = MASTER + SLASH + ID,
  SIZE_ID = MEBEL_SIZE + SLASH + ID,
  DIMENSION_ID = DIMENSIONS + SLASH + ID,
}

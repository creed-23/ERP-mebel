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

  // id
  MASTER_ID = MASTER + SLASH + ID,
  SIZE_ID = MEBEL_SIZE + SLASH + ID,
}

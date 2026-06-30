import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { PathResources } from '@shared/resources/path_resource';

/** Login qilinmagan foydalanuvchini login sahifasiga yo'naltiradi. */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) return true;

  return router.createUrlTree(['/', PathResources.AUTH, PathResources.LOGIN]);
};

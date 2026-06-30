import { Injectable, computed, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { AuthUser, LoginRequest, LoginResponse, Role } from '@shared/interfaces/factory.interface';

/**
 * AuthService — MOCK.
 * Backend hali tayyor emas. login() telefon raqamining oxirgi
 * raqamiga qarab rol qaytaradi (demo maqsadida):
 *   - 1/2/3 bilan tugasa → owner / workshop / worker
 *   - aks holda → owner
 * Keyinchalik real `/auth/login` endpoint'iga ulanadi.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'app-user';

  readonly user = signal<AuthUser | null>(this.restore());
  readonly role = computed<Role>(() => this.user()?.role ?? 'owner');
  readonly isAuthenticated = computed(() => this.user() !== null);

  private readonly mockUsers: Record<Role, AuthUser> = {
    owner: { id: 1, name: 'Jahongir Toshmatov', initials: 'JT', phone: '+998 90 000 00 01', role: 'owner' },
    workshop: { id: 2, name: 'Sardor Karimov', initials: 'SK', phone: '+998 90 000 00 02', role: 'workshop' },
    worker: { id: 3, name: 'Alisher Normatov', initials: 'AN', phone: '+998 90 000 00 03', role: 'worker' },
  };

  login(payload: LoginRequest): Observable<LoginResponse> {
    const role = this.resolveRole(payload.phone);
    const response: LoginResponse = {
      token: 'mock-token-' + Date.now(),
      user: this.mockUsers[role],
    };

    return of(response).pipe(
      delay(600), // tarmoq kechikishini simulyatsiya qilamiz
      tap((res) => this.setSession(res.user)),
    );
  }

  logout(): void {
    this.user.set(null);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // ─── Private ─────────────────────────────────────────────
  private resolveRole(phone: string): Role {
    const digits = (phone || '').replace(/\D/g, '');
    const last = digits.charAt(digits.length - 1);
    if (last === '2') return 'workshop';
    if (last === '3') return 'worker';
    return 'owner';
  }

  private setSession(user: AuthUser): void {
    this.user.set(user);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  private restore(): AuthUser | null {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  }
}

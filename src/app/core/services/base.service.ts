import { inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ApiResponse, PageRequest, PageResponse } from '../../shared/interfaces/base.interface';
import { environment } from '../../../environments/environment';

/**
 * BaseService — barcha feature service'lar shu classni extend qiladi.
 *
 * Qo'llanilishi:
 *   @Injectable({ providedIn: 'root' })
 *   export class TableService extends BaseService<Table> {
 *     constructor() { super('tables'); }
 *   }
 */
export abstract class BaseService<T> {
  protected readonly http = inject(HttpClient);
  protected readonly messageService = inject(MessageService);

  protected readonly baseUrl: string;

  constructor(endpoint: string) {
    this.baseUrl = `${environment.apiUrl}/${endpoint}`;
  }

  // ─── CRUD ────────────────────────────────────────────────────────────────

  getAll(params?: PageRequest): Observable<PageResponse<T>> {
    return this.http
      .get<PageResponse<T>>(this.baseUrl, { params: this.toHttpParams(params) })
      .pipe(catchError((err) => this.handleError(err)));
  }

  getById(id: number | string): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}/${id}`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  create(payload: Partial<T>): Observable<T> {
    return this.http
      .post<T>(this.baseUrl, payload)
      .pipe(catchError((err) => this.handleError(err)));
  }

  update(id: number | string, payload: Partial<T>): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}/${id}`, payload)
      .pipe(catchError((err) => this.handleError(err)));
  }

  patch(id: number | string, payload: Partial<T>): Observable<T> {
    return this.http
      .patch<T>(`${this.baseUrl}/${id}`, payload)
      .pipe(catchError((err) => this.handleError(err)));
  }

  delete(id: number | string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  // ─── Wrapper uchun (ApiResponse<T> format) ────────────────────────────

  createWrapped(payload: Partial<T>): Observable<T> {
    return this.http.post<ApiResponse<T>>(this.baseUrl, payload).pipe(
      map((res) => res.data),
      catchError((err) => this.handleError(err)),
    );
  }

  updateWrapped(id: number | string, payload: Partial<T>): Observable<T> {
    return this.http.put<ApiResponse<T>>(`${this.baseUrl}/${id}`, payload).pipe(
      map((res) => res.data),
      catchError((err) => this.handleError(err)),
    );
  }

  // ─── Toast xabarlari ──────────────────────────────────────────────────

  showSuccess(detail: string, summary = 'Muvaffaqiyat'): void {
    this.messageService.add({ severity: 'success', summary, detail, life: 3000 });
  }

  showError(detail: string, summary = 'Xatolik'): void {
    this.messageService.add({ severity: 'error', summary, detail, life: 5000 });
  }

  showInfo(detail: string, summary = "Ma'lumot"): void {
    this.messageService.add({ severity: 'info', summary, detail, life: 3000 });
  }

  showWarn(detail: string, summary = 'Ogohlantirish'): void {
    this.messageService.add({ severity: 'warn', summary, detail, life: 4000 });
  }

  // ─── Ichki yordamchi metodlar ─────────────────────────────────────────

  protected handleError(error: any): Observable<never> {
    const message = error?.error?.message || error?.message || "Noma'lum xatolik yuz berdi";

    this.showError(message);
    console.error('[BaseService Error]', error);
    return throwError(() => error);
  }

  protected toHttpParams(params?: PageRequest | Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    if (!params) return httpParams;

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return httpParams;
  }
}

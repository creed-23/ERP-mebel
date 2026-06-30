import { Directive, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { Subject, takeUntil, finalize } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { BaseService } from '../services/base.service';
import { PageRequest, PageResponse } from '../../shared/interfaces/base.interface';

/**
 * BaseListComponent — CRUD ro'yxat sahifalari uchun abstract directive.
 *
 * Qo'llanilishi:
 *   @Component({ ... })
 *   export class TablesComponent extends BaseListComponent<Table, TableService> {
 *     constructor() { super(inject(TableService)); }
 *
 *     // Ixtiyoriy: o'z loadData'ingizni override qiling
 *     protected override buildParams(): PageRequest {
 *       return { ...super.buildParams(), status: 'ACTIVE' };
 *     }
 *   }
 */
@Directive()
export abstract class BaseListComponent<
  T extends { id?: number | string },
  S extends BaseService<T>,
>
  implements OnInit, OnDestroy
{
  protected readonly confirmationService = inject(ConfirmationService);

  // ─── State (Signals) ──────────────────────────────────────────────────
  readonly items = signal<T[]>([]);
  readonly loading = signal(false);
  readonly total = signal(0);
  readonly page = signal(0); // 0-indexed (Spring Boot style)
  readonly pageSize = signal(10);
  readonly search = signal('');

  readonly isEmpty = computed(() => !this.loading() && this.items().length === 0);
  readonly totalPages = computed(() => Math.ceil(this.total() / this.pageSize()));

  // Dialog state
  readonly dialogVisible = signal(false);
  readonly selectedItem = signal<T | null>(null);
  readonly isEditMode = computed(() => !!this.selectedItem()?.id);

  protected readonly destroy$ = new Subject<void>();

  constructor(protected readonly service: S) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ─── Ma'lumot yuklash ─────────────────────────────────────────────────

  loadData(): void {
    this.loading.set(true);
    this.service
      .getAll(this.buildParams())
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: (res: PageResponse<T>) => {
          this.items.set(res.content);
          this.total.set(res.totalElements);
        },
        error: () => {}, // BaseService handleError() toast ko'rsatadi
      });
  }

  /** Override qilib qo'shimcha filter parametrlar qo'shish mumkin */
  protected buildParams(): PageRequest {
    return {
      page: this.page(),
      size: this.pageSize(),
      search: this.search() || undefined,
    };
  }

  // ─── Pagination ───────────────────────────────────────────────────────

  onPageChange(event: { page: number; rows: number }): void {
    this.page.set(event.page);
    this.pageSize.set(event.rows);
    this.loadData();
  }

  // ─── Qidiruv ─────────────────────────────────────────────────────────

  onSearch(value: string): void {
    this.search.set(value);
    this.page.set(0);
    this.loadData();
  }

  onSearchClear(): void {
    this.onSearch('');
  }

  // ─── Dialog ───────────────────────────────────────────────────────────

  openCreateDialog(): void {
    this.selectedItem.set(null);
    this.dialogVisible.set(true);
  }

  openEditDialog(item: T): void {
    this.selectedItem.set({ ...item });
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    this.dialogVisible.set(false);
    this.selectedItem.set(null);
  }

  // ─── O'chirish ────────────────────────────────────────────────────────

  confirmDelete(item: T, event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: "Haqiqatan ham o'chirmoqchimisiz?",
      header: 'Tasdiqlash',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Ha',
      rejectLabel: "Yo'q",
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.deleteItem(item),
    });
  }

  protected deleteItem(item: T): void {
    if (!item.id) return;
    this.service
      .delete(item.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.service.showSuccess("Muvaffaqiyatli o'chirildi");
        this.loadData();
      });
  }

  // ─── Saqlash (create/update) ──────────────────────────────────────────

  onSave(formValue: Partial<T>): void {
    const id = this.selectedItem()?.id;
    const request$ = id ? this.service.update(id, formValue) : this.service.create(formValue);

    request$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        const msg = id ? 'Muvaffaqiyatli yangilandi' : "Muvaffaqiyatli qo'shildi";
        this.service.showSuccess(msg);
        this.closeDialog();
        this.loadData();
      },
      error: () => {},
    });
  }
}

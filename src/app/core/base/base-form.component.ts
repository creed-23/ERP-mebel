import { Directive, OnInit, OnDestroy, input, output, signal, inject } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subject, takeUntil, finalize } from 'rxjs';
import { BaseService } from '../services/base.service';

/**
 * BaseFormComponent — Dialog ichidagi form componentlar uchun.
 *
 * Qo'llanilishi:
 *   @Component({ ... })
 *   export class TableFormComponent extends BaseFormComponent<Table, TableService> {
 *     constructor() { super(inject(TableService)); }
 *
 *     protected override buildForm(): FormGroup {
 *       return this.fb.group({
 *         name: ['', Validators.required],
 *         status: ['AVAILABLE'],
 *       });
 *     }
 *   }
 */
@Directive()
export abstract class BaseFormComponent<
  T extends { id?: number | string },
  S extends BaseService<T>,
>
  implements OnInit, OnDestroy
{
  // ─── Inputs / Outputs ─────────────────────────────────────────────────
  item = input<T | null>(null); // edit modeda mavjud item
  visible = input<boolean>(false);
  saved = output<Partial<T>>(); // parent loadData() uchun
  closed = output<void>();

  // ─── State ────────────────────────────────────────────────────────────
  form!: FormGroup;
  readonly submitting = signal(false);
  readonly isEdit = signal(false);

  protected readonly destroy$ = new Subject<void>();

  constructor(protected readonly service: S) {}

  ngOnInit(): void {
    this.form = this.buildForm();
    this.patchFormOnEdit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ─── Override ediladigan metodlar ─────────────────────────────────────

  /** FormGroup qurilishi — subclass implement qilishi shart */
  protected abstract buildForm(): FormGroup;

  /**
   * FormValue → API payloadga o'zgartirish kerak bo'lsa override qiling.
   * Default: formni xuddi o'zi qaytaradi.
   */
  protected preparePayload(value: any): Partial<T> {
    return value as Partial<T>;
  }

  // ─── Ichki ────────────────────────────────────────────────────────────

  private patchFormOnEdit(): void {
    const currentItem = this.item();
    if (currentItem?.id) {
      this.isEdit.set(true);
      this.form.patchValue(currentItem as any);
    } else {
      this.isEdit.set(false);
      this.form.reset();
    }
  }

  // ─── Submit ───────────────────────────────────────────────────────────

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.preparePayload(this.form.value);
    const id = this.item()?.id;
    this.submitting.set(true);

    const request$ = id ? this.service.update(id, payload) : this.service.create(payload);

    request$
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.submitting.set(false)),
      )
      .subscribe({
        next: () => {
          const msg = id ? 'Muvaffaqiyatli yangilandi' : "Muvaffaqiyatli qo'shildi";
          this.service.showSuccess(msg);
          this.saved.emit(payload);
          this.onClose();
        },
        error: () => {},
      });
  }

  onClose(): void {
    this.form.reset();
    this.closed.emit();
  }

  // ─── Template yordamchi metodlar ──────────────────────────────────────

  /** Maydon xato ko'rsatish uchun */
  hasError(controlName: string, errorType = 'required'): boolean {
    const ctrl = this.form.get(controlName);
    return !!(ctrl?.hasError(errorType) && ctrl.touched);
  }

  /** Maydonni olish */
  ctrl(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  /** Saqlash tugmasi labeli */
  get submitLabel(): string {
    return this.submitting() ? 'Saqlanmoqda...' : this.isEdit() ? 'Yangilash' : 'Saqlash';
  }
}

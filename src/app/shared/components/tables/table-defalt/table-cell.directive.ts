import { Directive, Input, TemplateRef } from '@angular/core';

/**
 * Maxsus katak (cell) shabloni.
 *
 * `<app-table>` ichida ishlatiladi: ustun `key` qiymati bilan bog'lanadi,
 * yoki amallar ustuni uchun `actions` kaliti beriladi.
 *
 * Kontekst: `$implicit` = row, `index` = qator tartibi, `value` = row[key].
 *
 * Misol:
 * ```html
 * <app-table [columns]="cols" [data]="rows">
 *   <ng-template appTableCell="status" let-row>
 *     <app-status-badge [status]="row.status" />
 *   </ng-template>
 * </app-table>
 * ```
 */
@Directive({
  selector: '[appTableCell]',
  standalone: true,
})
export class TableCellDirective {
  /** Ustun kaliti, yoki amallar ustuni uchun 'actions' */
  @Input('appTableCell') key = '';

  constructor(public readonly template: TemplateRef<unknown>) {}
}

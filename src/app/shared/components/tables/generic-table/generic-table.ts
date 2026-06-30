import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from "@shared/components/button/button";

export interface TableColumn<T> {
  key?: keyof T;
  label: string;
  type?: 'text' | 'number' | 'separator';
  separatorText?: string; // type === 'separator' bo'lsa shu matn chiqadi
  width?: string; // masalan '120px' yoki '1fr'
  align?: 'left' | 'center' | 'right';
}

let nextTempId = -1;

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule, FormsModule, Button],
  templateUrl: './generic-table.html',
  styleUrls: ['./generic-table.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class GenericTableComponent<T extends Record<string, any>> {
  @Input() columns: TableColumn<T>[] = [];
  @Input() data: T[] = [];
  @Input() idKey: keyof T | null = null;
  @Input() createEmptyRow: () => T = () => ({}) as T;
  @Input() showAddButton = true;
  @Input() showPdfButton = true;
  @Input() title = '';
  /** PDF sarlavhasi ostidagi izoh (masalan kategoriya / sana) */
  @Input() pdfSubtitle = '';

  @Output() rowAdded = new EventEmitter<T>();
  @Output() rowUpdated = new EventEmitter<{ index: number; row: T }>();
  @Output() rowDeleted = new EventEmitter<{ index: number; row: T }>();

  editingIndex: number | null = null;
  editingDraft: Partial<T> = {};

  isAdding = false;
  addDraft: Partial<T> = {};

  trackByIndex(index: number): number {
    return index;
  }

  // ───────────── Edit ─────────────

  startEdit(index: number, row: T): void {
    this.cancelAdd();
    this.editingIndex = index;
    this.editingDraft = { ...row };
  }

  saveEdit(index: number): void {
    if (this.editingIndex === null) return;
    const updated = { ...this.data[index], ...this.editingDraft } as T;
    this.data[index] = updated;
    this.rowUpdated.emit({ index, row: updated });
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editingIndex = null;
    this.editingDraft = {};
  }

  isEditing(index: number): boolean {
    return this.editingIndex === index;
  }

  // ───────────── Add ─────────────

  startAdd(): void {
    this.cancelEdit();
    this.isAdding = true;
    this.addDraft = { ...this.createEmptyRow() };
  }

  saveAdd(): void {
    const newRow = { ...this.createEmptyRow(), ...this.addDraft } as T;

    if (this.idKey && (newRow[this.idKey] === undefined || newRow[this.idKey] === null)) {
      (newRow as any)[this.idKey] = nextTempId--;
    }

    this.data = [...this.data, newRow];
    this.rowAdded.emit(newRow);
    this.cancelAdd();
  }

  cancelAdd(): void {
    this.isAdding = false;
    this.addDraft = {};
  }

  // ───────────── Delete ─────────────

  deleteRow(index: number): void {
    const row = this.data[index];
    this.data = this.data.filter((_, i) => i !== index);
    this.rowDeleted.emit({ index, row });
    if (this.editingIndex === index) this.cancelEdit();
  }

  // ───────────── Helpers ─────────────

  getValue(row: Partial<T>, col: TableColumn<T>): any {
    if (!col.key) return '';
    return row[col.key];
  }

  setDraftValue(draft: Partial<T>, col: TableColumn<T>, value: any): void {
    if (!col.key) return;
    (draft as any)[col.key] = col.type === 'number' ? Number(value) : value;
  }

  // ───────────── PDF yuklab olish (chop etish orqali) ─────────────

  downloadPdf(): void {
    const headCells = this.columns
      .map((col) => {
        const label = col.type === 'separator' ? col.separatorText || '' : col.label;
        return `<th style="text-align:${col.align || 'left'}">${this.escape(label)}</th>`;
      })
      .join('');

    const bodyRows = this.data
      .map((row, i) => {
        const cells = this.columns
          .map((col) => {
            const value =
              col.type === 'separator' ? col.separatorText || 'X' : this.getValue(row, col);
            return `<td style="text-align:${col.align || 'left'}">${this.escape(value ?? '')}</td>`;
          })
          .join('');
        return `<tr><td class="n">${i + 1}</td>${cells}</tr>`;
      })
      .join('');

    const title = this.title || 'Jadval';
    const sub = this.pdfSubtitle || new Date().toLocaleDateString('uz-UZ');

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
      <title>${this.escape(title)}</title>
      <style>
        body{font-family:Arial,sans-serif;padding:32px;color:#111}
        h1{font-size:22px;margin:0 0 4px}
        .sub{font-size:13px;color:#666;margin-bottom:16px}
        table{width:100%;border-collapse:collapse;font-size:13px}
        th,td{padding:8px 14px;border:1px solid #e5e7eb}
        td.n,th.n{text-align:center;color:#999;width:36px}
        thead tr{background:#f3f4f6}
        tbody tr:nth-child(even) td{background:#f9fafb}
        @media print{body{padding:16px}}
      </style></head><body>
      <h1>${this.escape(title)}</h1>
      <div class="sub">${this.escape(sub)}</div>
      <table>
        <thead><tr><th class="n">N</th>${headCells}</tr></thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </body></html>`;

    const win = window.open('', '_blank');
    if (win) {
      win.document.write(html);
      win.document.close();
      setTimeout(() => win.print(), 400);
    }
  }

  private escape(value: any): string {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}

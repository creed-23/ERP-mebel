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
  @Input() title = '';

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
}

import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface TableColumn {
  key: string;
  label: string;
}

export interface TableAction<T = Record<string, any>> {
  type: 'view' | 'edit' | 'delete';
  row: T;
  index: number;
}

@Component({
  selector: 'app-table',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './table-defalt.html',
  styleUrl: './table-defalt.scss',
})
export class TableDefalt implements OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() data: Record<string, any>[] = [];
  @Input() pageSize: number = 5;
  @Input() isView: boolean = false;

  @Output() view = new EventEmitter<TableAction>();
  @Output() edit = new EventEmitter<TableAction>();
  @Output() delete = new EventEmitter<TableAction>();

  currentPage = 1;
  totalPages = 1;
  pagedData: Record<string, any>[] = [];
  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['pageSize']) {
      this.currentPage = 1;
      this.updatePagination();
    }
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.data.length / this.pageSize) || 1;
    this.pages = this.getVisiblePages();
    this.updatePagedData();
  }

  updatePagedData(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedData = this.data.slice(start, start + this.pageSize);
  }

  getVisiblePages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 2;
    const range: number[] = [];

    const left = Math.max(1, current - delta);
    const right = Math.min(total, current + delta);

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    // Bosh va oxir sahifalarni qo'shish
    if (left > 2)
      range.unshift(-1, 1); // -1 = ellipsis
    else if (left === 2) range.unshift(1);

    if (right < total - 1)
      range.push(-2, total); // -2 = ellipsis
    else if (right === total - 1) range.push(total);

    return range;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.pages = this.getVisiblePages();
    this.updatePagedData();
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.data.length);
  }

  onView(row: Record<string, any>, index: number): void {
    this.view.emit({ type: 'view', row, index });
  }

  onEdit(row: Record<string, any>, index: number): void {
    this.edit.emit({ type: 'edit', row, index });
  }

  onDelete(row: Record<string, any>, index: number): void {
    this.delete.emit({ type: 'delete', row, index });
  }
}

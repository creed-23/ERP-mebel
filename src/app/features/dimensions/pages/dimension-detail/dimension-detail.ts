import { Component, ElementRef, ViewChild, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FactoryDataService } from '@core/services/factory-data.service';
import { Button } from '@shared/components/button/button';
import {
  GenericTableComponent,
  TableColumn,
} from '@shared/components/tables/generic-table/generic-table';
import { CatalogItem, DimensionRow, FurnitureCategory } from '@shared/interfaces/factory.interface';
import { PathResources } from '@shared/resources/path_resource';

interface PdfFile {
  name: string;
  size: string;
}

@Component({
  selector: 'app-dimension-detail',
  standalone: true,
  imports: [FormsModule, TranslatePipe, Button, GenericTableComponent],
  templateUrl: './dimension-detail.html',
  styleUrl: './dimension-detail.scss',
})
export class DimensionDetail {
  private data = inject(FactoryDataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private translate = inject(TranslateService);

  @ViewChild('imgInput') imgInput!: ElementRef<HTMLInputElement>;
  @ViewChild('pdfInput') pdfInput!: ElementRef<HTMLInputElement>;

  categories: { value: FurnitureCategory; label: string }[] = [
    { value: 'divan', label: 'FURNITURE.divan' },
    { value: 'armchair', label: 'FURNITURE.armchair' },
    { value: 'bed', label: 'FURNITURE.bed' },
    { value: 'office', label: 'FURNITURE.office' },
    { value: 'tableChair', label: 'FURNITURE.tableChair' },
  ];

  productName = signal('Milano Divan L-shakl');
  category = signal<FurnitureCategory>('divan');
  description = signal("Yumshoq qoplamali L-shakl divan, 3 o'rinli. Premium material.");
  imageUrl = signal<string | null>(null);
  pdfFiles = signal<PdfFile[]>([{ name: 'texnik_chizma.pdf', size: '2.4 MB' }]);

  rows = signal<DimensionRow[]>([]);

  // ─── O'lchamlar jadvali ustunlari (GenericTableComponent) ───
  dimColumns: TableColumn<DimensionRow>[] = [
    { key: 'length', label: 'Uzunlik', type: 'number', align: 'right', width: '110px' },
    { label: '', type: 'separator', separatorText: '×', width: '32px' },
    { key: 'width', label: 'Kengligi', type: 'number', align: 'right', width: '110px' },
    { key: 'height', label: 'Balandligi', type: 'number', align: 'right', width: '110px' },
    { key: 'amount', label: 'Miqdor', type: 'number', align: 'right', width: '90px' },
  ];

  createEmptyRow = (): DimensionRow => ({ id: 0, length: 0, width: 0, height: 0, amount: 1 });

  total = computed(() => this.rows().reduce((s, r) => s + r.amount, 0));
  maxLen = computed(() => Math.max(0, ...this.rows().map((r) => r.length)));
  maxWid = computed(() => Math.max(0, ...this.rows().map((r) => r.width)));
  avgLen = computed(() => {
    const r = this.rows();
    return r.length ? Math.round(r.reduce((s, x) => s + x.length, 0) / r.length) : 0;
  });

  /** PDF sarlavhasi ostidagi izoh: kategoriya · sana */
  pdfSub = computed(
    () => `${this.t('FURNITURE.' + this.category())} · ${new Date().toLocaleDateString('uz-UZ')}`,
  );

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id')) || 1;
    this.data.getCatalog().subscribe((items: CatalogItem[]) => {
      const item = items.find((i) => i.id === id);
      if (item) {
        this.productName.set(item.title);
        this.category.set(item.category);
      }
    });
    this.data.getDimensionRows(id).subscribe((r) => this.rows.set(r));
  }

  t(key: string, params?: object): string {
    return this.translate.instant(key, params);
  }

  back(): void {
    this.router.navigate(['/', PathResources.DIMENSIONS]);
  }

  // ─── Image / PDF upload ──────────────────────────────────
  pickImage(): void {
    this.imgInput.nativeElement.click();
  }
  onImage(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.imageUrl.set(URL.createObjectURL(file));
  }
  pickPdf(): void {
    this.pdfInput.nativeElement.click();
  }
  onPdf(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.pdfFiles.update((list) => [
        ...list,
        { name: file.name, size: `${(file.size / 1024 / 1024).toFixed(1)} MB` },
      ]);
    }
  }
  removePdf(i: number): void {
    this.pdfFiles.update((list) => list.filter((_, idx) => idx !== i));
  }

  // ─── Jadval hodisalari (GenericTableComponent) ───────────
  onRowAdded(row: DimensionRow): void {
    this.rows.update((list) => [...list, row]);
  }
  onRowUpdated(e: { index: number; row: DimensionRow }): void {
    this.rows.update((list) => list.map((r, i) => (i === e.index ? e.row : r)));
  }
  onRowDeleted(e: { index: number; row: DimensionRow }): void {
    this.rows.update((list) => list.filter((_, i) => i !== e.index));
  }
}

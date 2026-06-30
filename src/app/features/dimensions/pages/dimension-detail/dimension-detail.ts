import { Component, ElementRef, ViewChild, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FactoryDataService } from '@core/services/factory-data.service';
import { Button } from '@shared/components/button/button';
import { CatalogItem, DimensionRow, FurnitureCategory } from '@shared/interfaces/factory.interface';
import { PathResources } from '@shared/resources/path_resource';

interface PdfFile {
  name: string;
  size: string;
}

@Component({
  selector: 'app-dimension-detail',
  standalone: true,
  imports: [FormsModule, TranslatePipe, Button],
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
  editingId = signal<number | null>(null);
  editBuf: Partial<DimensionRow> = {};
  deleteConfirm = signal<number | null>(null);
  private nextId = 100;

  total = computed(() => this.rows().reduce((s, r) => s + r.amount, 0));
  maxLen = computed(() => Math.max(0, ...this.rows().map((r) => r.length)));
  maxWid = computed(() => Math.max(0, ...this.rows().map((r) => r.width)));
  avgLen = computed(() => {
    const r = this.rows();
    return r.length ? Math.round(r.reduce((s, x) => s + x.length, 0) / r.length) : 0;
  });

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id')) || 1;
    this.data.getCatalog().subscribe((items: CatalogItem[]) => {
      const item = items.find((i) => i.id === id);
      if (item) {
        this.productName.set(item.title);
        this.category.set(item.category);
      }
    });
    this.data.getDimensionRows(id).subscribe((r) => {
      this.rows.set(r);
      this.nextId = Math.max(0, ...r.map((x) => x.id)) + 1;
    });
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

  // ─── Inline edit ─────────────────────────────────────────
  startEdit(row: DimensionRow): void {
    this.editingId.set(row.id);
    this.editBuf = { ...row };
  }
  saveEdit(): void {
    const id = this.editingId();
    this.rows.update((list) => list.map((r) => (r.id === id ? ({ ...r, ...this.editBuf } as DimensionRow) : r)));
    this.editingId.set(null);
    this.editBuf = {};
  }
  cancelEdit(): void {
    this.editingId.set(null);
    this.editBuf = {};
  }
  addRow(): void {
    const row: DimensionRow = { id: this.nextId, length: 0, width: 0, height: 0, amount: 1 };
    this.rows.update((list) => [...list, row]);
    this.editingId.set(this.nextId);
    this.editBuf = { ...row };
    this.nextId++;
  }
  deleteRow(id: number): void {
    this.rows.update((list) => list.filter((r) => r.id !== id));
    this.deleteConfirm.set(null);
  }

  // ─── PDF (chop etish orqali) ─────────────────────────────
  downloadPdf(): void {
    const rows = this.rows();
    const body = rows
      .map(
        (r, i) => `<tr>
          <td>${i + 1}</td>
          <td><b>${r.length}</b> <span style="color:#999">×</span> <b>${r.width}</b></td>
          <td>${r.height || '—'}</td>
          <td><b>${r.amount}</b> ta</td>
        </tr>`,
      )
      .join('');
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
      <title>${this.productName()}</title>
      <style>
        body{font-family:Arial,sans-serif;padding:32px;color:#111}
        h1{font-size:22px;margin:0 0 4px}
        .sub{font-size:13px;color:#666;margin-bottom:16px}
        table{width:100%;border-collapse:collapse;font-size:13px}
        th,td{padding:8px 14px;border:1px solid #e5e7eb;text-align:left}
        thead tr{background:#f3f4f6}
        tr:nth-child(even) td{background:#f9fafb}
        .total{margin-top:16px;font-weight:700;color:#4f46e5}
        @media print{body{padding:16px}}
      </style></head><body>
      <h1>${this.productName()}</h1>
      <div class="sub">${this.t('FURNITURE.' + this.category())} · ${new Date().toLocaleDateString('uz-UZ')}</div>
      <table>
        <thead><tr><th>N</th><th>Uzunlik × Kengligi (cm)</th><th>Balandligi (cm)</th><th>Miqdor</th></tr></thead>
        <tbody>${body}</tbody>
      </table>
      <div class="total">Jami bo'laklar: ${this.total()} ta</div>
    </body></html>`;
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(html);
      win.document.close();
      setTimeout(() => win.print(), 400);
    }
  }
}

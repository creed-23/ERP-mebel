import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Modal } from '../../modal/modal';
import { Button } from '../../button/button';
import { FileDropzone } from '../../file-dropzone/file-dropzone';
import { FurnitureCategory } from '@shared/interfaces/factory.interface';

@Component({
  selector: 'app-dimension-modal',
  standalone: true,
  imports: [FormsModule, TranslatePipe, Modal, Button, FileDropzone],
  template: `
    <app-modal [open]="open" [title]="'LABELS.ADD_DIMENSION' | translate" [width]="480" (close)="close.emit()">
      <div class="dm">
        <div class="field">
          <label class="input-label">{{ 'DIMENSIONS.NAME' | translate }}</label>
          <input class="input" placeholder="Milano Divan L-shakl" [(ngModel)]="name" />
        </div>

        <div class="field">
          <label class="input-label">{{ 'LABELS.CATEGORY' | translate }}</label>
          <select class="input" [(ngModel)]="category">
            @for (c of categories; track c) {
              <option [value]="c">{{ 'FURNITURE.' + c | translate }}</option>
            }
          </select>
        </div>

        <div class="dm__dims">
          @for (d of dims; track d.key) {
            <div class="field">
              <label class="input-label">{{ d.label | translate }} (cm)</label>
              <input class="input" type="number" placeholder="0" [(ngModel)]="d.value" />
            </div>
          }
        </div>

        <div class="field">
          <label class="input-label">{{ 'DIMENSIONS.PRODUCT_IMAGE' | translate }}</label>
          <app-file-dropzone [files]="files" (add)="files.push($event)" (remove)="files.splice($event, 1)" />
        </div>

        <div class="field">
          <label class="input-label">{{ 'LABELS.NOTE' | translate }}</label>
          <textarea class="input" rows="2" [(ngModel)]="note"></textarea>
        </div>
      </div>

      <div slot="footer" class="modal-actions">
        <app-button [fullWidth]="true" label="COMMON.CANCEL" variant="outline-secondary" (buttonClick)="close.emit()" />
        <app-button [fullWidth]="true" label="COMMON.SAVE" variant="primary" icon="pi-check" (buttonClick)="onSave()" />
      </div>
    </app-modal>
  `,
  styles: `
    .dm { display: flex; flex-direction: column; gap: 16px; padding: 24px; }
    .field { display: flex; flex-direction: column; gap: 6px; }
    .dm__dims { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    textarea.input { resize: none; }
    .modal-actions { display: flex; gap: 12px; padding: 16px 24px; border-top: 1px solid var(--color-border); }
  `,
})
export class DimensionModal {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  categories: FurnitureCategory[] = ['divan', 'armchair', 'tableChair', 'bed', 'office'];
  name = '';
  category: FurnitureCategory = 'divan';
  note = '';
  files: string[] = [];
  dims = [
    { key: 'length', label: 'LABELS.LENGTH', value: null as number | null },
    { key: 'width', label: 'LABELS.WIDTH', value: null as number | null },
    { key: 'height', label: 'LABELS.HEIGHT', value: null as number | null },
  ];

  onSave(): void {
    this.save.emit();
    this.close.emit();
  }
}

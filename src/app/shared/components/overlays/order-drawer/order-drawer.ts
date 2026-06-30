import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Modal } from '../../modal/modal';
import { Button } from '../../button/button';
import { Avatar } from '../../avatar/avatar';
import { FileDropzone } from '../../file-dropzone/file-dropzone';
import { FurnitureCategory } from '@shared/interfaces/factory.interface';

@Component({
  selector: 'app-order-drawer',
  standalone: true,
  imports: [FormsModule, TranslatePipe, Modal, Button, Avatar, FileDropzone],
  template: `
    <app-modal
      variant="drawer"
      [open]="open"
      [title]="'ORDER.TITLE' | translate"
      [width]="560"
      (close)="close.emit()"
    >
      <span slot="icon" class="od__badge"><i class="pi pi-clipboard"></i></span>

      <div class="od">
        <div class="field">
          <label class="input-label">{{ 'ORDER.ORDER_NAME' | translate }}</label>
          <input class="input" placeholder="Milano Divan L-shakl" [(ngModel)]="orderName" />
        </div>

        <div class="od__grid2">
          <div class="field">
            <label class="input-label">{{ 'ORDER.CLIENT_NAME' | translate }}</label>
            <input class="input" placeholder="Aziz Karimov" [(ngModel)]="clientName" />
          </div>
          <div class="field">
            <label class="input-label">{{ 'LABELS.PHONE' | translate }}</label>
            <div class="od__phone">
              <span class="od__cc"><i class="pi pi-phone"></i> +998</span>
              <input placeholder="90 123 45 67" [(ngModel)]="phone" />
            </div>
          </div>
        </div>

        <div class="field">
          <label class="input-label">{{ 'ORDER.MASTER' | translate }}</label>
          <select class="input" [(ngModel)]="master">
            @for (m of masters; track m.initials) {
              <option [value]="m.name">{{ m.name }}</option>
            }
          </select>
          <div class="od__chips">
            @for (m of masters; track m.initials) {
              <span class="od__chip">
                <app-avatar [initials]="m.initials" [size]="20" /> {{ m.name }}
              </span>
            }
          </div>
        </div>

        <div class="od__grid2">
          <div class="field">
            <label class="input-label">{{ 'ORDER.DEADLINE' | translate }}</label>
            <input class="input" type="date" [(ngModel)]="deadline" />
          </div>
          <div class="field">
            <label class="input-label">{{ 'ORDER.FURNITURE_TYPE' | translate }}</label>
            <select class="input" [(ngModel)]="furnitureType">
              @for (c of categories; track c) {
                <option [value]="c">{{ 'FURNITURE.' + c | translate }}</option>
              }
            </select>
          </div>
        </div>

        <div class="field">
          <label class="input-label">{{ 'ORDER.DIMENSIONS' | translate }}</label>
          <div class="od__dims">
            @for (d of dims; track d.key) {
              <div class="field">
                <label class="od__dim-label">{{ d.label | translate }} (cm)</label>
                <input class="input" type="number" placeholder="0" [(ngModel)]="d.value" />
              </div>
            }
          </div>
        </div>

        <div class="field">
          <label class="input-label">{{ 'LABELS.NOTE' | translate }}</label>
          <textarea class="input" rows="3" [placeholder]="'ORDER.NOTE_PLACEHOLDER' | translate" [(ngModel)]="note"></textarea>
        </div>

        <div class="field">
          <label class="input-label">{{ 'ORDER.FILES' | translate }}</label>
          <app-file-dropzone [files]="files" (add)="files.push($event)" (remove)="files.splice($event, 1)" />
        </div>

        <div class="field">
          <label class="input-label">{{ 'ORDER.PRICE' | translate }}</label>
          <div class="od__price">
            <input class="input" type="number" placeholder="0" [(ngModel)]="price" />
            <span class="od__unit">UZS</span>
          </div>
        </div>

        <div class="field">
          <label class="input-label">{{ 'ORDER.PAYMENT_STATUS' | translate }}</label>
          <div class="od__radios">
            @for (p of payments; track p.key) {
              <label class="od__radio">
                <input type="radio" name="payment" [value]="p.key" [(ngModel)]="payment" />
                <span>{{ p.label | translate }}</span>
              </label>
            }
          </div>
        </div>
      </div>

      <div slot="footer" class="modal-actions">
        <app-button [fullWidth]="true" label="COMMON.CANCEL" variant="outline-secondary" (buttonClick)="close.emit()" />
        <app-button [fullWidth]="true" label="COMMON.SAVE" variant="primary" icon="pi-check" (buttonClick)="onSave()" />
      </div>
    </app-modal>
  `,
  styles: `
    .od { display: flex; flex-direction: column; gap: 20px; padding: 24px; }
    .od__badge {
      width: 28px; height: 28px; border-radius: 8px;
      display: inline-flex; align-items: center; justify-content: center;
      background: color-mix(in srgb, var(--color-primary) 12%, transparent);
      color: var(--color-primary);
      i { font-size: 14px; }
    }
    .field { display: flex; flex-direction: column; gap: 6px; }
    .od__grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .od__dims { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; background: var(--color-bg-subtle); border-radius: 12px; padding: 16px; }
    .od__dim-label { font-size: 12px; color: var(--color-text-secondary); }
    textarea.input { resize: none; }

    .od__phone, .od__price { position: relative; display: flex; align-items: stretch; }
    .od__phone {
      border: 1px solid var(--color-border); border-radius: 8px; overflow: hidden; background: var(--color-bg-base);
      input { flex: 1; border: none; outline: none; padding: 8px 12px; background: transparent; color: var(--color-text-primary); font-size: 14px; }
    }
    .od__cc {
      display: flex; align-items: center; gap: 4px; padding: 8px 12px;
      background: var(--color-bg-subtle); border-right: 1px solid var(--color-border);
      font-size: 14px; font-weight: 500; color: var(--color-text-secondary);
    }
    .od__price .od__unit {
      position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
      font-size: 12px; font-weight: 500; color: var(--color-text-secondary);
    }
    .od__chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
    .od__chip {
      display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px;
      background: var(--color-bg-subtle); border: 1px solid var(--color-border); border-radius: 8px;
      font-size: 12px; color: var(--color-text-primary);
    }
    .od__radios { display: flex; gap: 16px; }
    .od__radio { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--color-text-primary); cursor: pointer; }
    .modal-actions { display: flex; gap: 12px; padding: 16px 24px; border-top: 1px solid var(--color-border); }
  `,
})
export class OrderDrawer {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  categories: FurnitureCategory[] = ['divan', 'armchair', 'tableChair', 'bed', 'office'];
  masters = [
    { initials: 'AT', name: 'Alisher Toshmatov' },
    { initials: 'BX', name: 'Bobur Xasanov' },
    { initials: 'SK', name: 'Sardor Karimov' },
  ];
  payments = [
    { key: 'paid', label: 'LABELS.PAID' },
    { key: 'partial', label: 'LABELS.PARTIAL' },
    { key: 'unpaid', label: 'LABELS.UNPAID' },
  ];
  dims = [
    { key: 'length', label: 'LABELS.LENGTH', value: null as number | null },
    { key: 'width', label: 'LABELS.WIDTH', value: null as number | null },
    { key: 'height', label: 'LABELS.HEIGHT', value: null as number | null },
  ];

  orderName = '';
  clientName = '';
  phone = '';
  master = 'Alisher Toshmatov';
  deadline = '';
  furnitureType: FurnitureCategory = 'divan';
  note = '';
  price: number | null = null;
  payment = 'paid';
  files: string[] = [];

  onSave(): void {
    this.save.emit();
    this.close.emit();
  }
}

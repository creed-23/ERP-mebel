import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Modal } from '../../modal/modal';
import { Button } from '../../button/button';

@Component({
  selector: 'app-avans-modal',
  standalone: true,
  imports: [FormsModule, TranslatePipe, Modal, Button],
  template: `
    <app-modal [open]="open" [title]="'AVANS.TITLE' | translate" [width]="440" (close)="close.emit()">
      <div class="avans">
        @if (workerName) {
          <div class="field">
            <label class="input-label">{{ 'LABELS.NAME' | translate }}</label>
            <input class="input" [value]="workerName" readonly />
          </div>
        }
        <div class="field">
          <label class="input-label">{{ 'LABELS.DATE' | translate }}</label>
          <input class="input" type="date" [(ngModel)]="date" />
        </div>
        <div class="field">
          <label class="input-label">{{ 'LABELS.AMOUNT' | translate }} (UZS)</label>
          <input class="input" type="number" placeholder="500 000" [(ngModel)]="amount" />
        </div>
        <div class="field">
          <label class="input-label">{{ 'LABELS.NOTE' | translate }}</label>
          <textarea class="input" rows="3" [(ngModel)]="note"></textarea>
        </div>
      </div>

      <div slot="footer" class="modal-actions">
        <app-button [fullWidth]="true" label="COMMON.CANCEL" variant="outline-secondary" (buttonClick)="close.emit()" />
        <app-button [fullWidth]="true" label="COMMON.SAVE" variant="primary" icon="pi-check" (buttonClick)="onSave()" />
      </div>
    </app-modal>
  `,
  styles: `
    .avans { display: flex; flex-direction: column; gap: 16px; padding: 24px; }
    .field { display: flex; flex-direction: column; gap: 6px; }
    textarea.input { resize: none; }
    .modal-actions { display: flex; gap: 12px; padding: 16px 24px; border-top: 1px solid var(--color-border); }
  `,
})
export class AvansModal {
  @Input() open = false;
  @Input() workerName: string | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ date: string; amount: string; note: string }>();

  date = '';
  amount = '';
  note = '';

  onSave(): void {
    this.save.emit({ date: this.date, amount: this.amount, note: this.note });
    this.close.emit();
  }
}

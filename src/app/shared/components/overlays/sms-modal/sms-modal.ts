import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Modal } from '../../modal/modal';
import { Avatar } from '../../avatar/avatar';
import { Button } from '../../button/button';
import { initials } from '@shared/utils/text.util';

export interface SmsTarget {
  name: string;
  phone: string;
  amount: string;
}

@Component({
  selector: 'app-sms-modal',
  standalone: true,
  imports: [FormsModule, TranslatePipe, Modal, Avatar, Button],
  template: `
    <app-modal [open]="open" [title]="'SMS.TITLE' | translate" [width]="480" (close)="close.emit()">
      <div class="sms">
        @if (target) {
          <div class="sms__target">
            <app-avatar [initials]="ini(target.name)" [size]="40" />
            <div>
              <div class="sms__name">{{ target.name }}</div>
              <div class="sms__phone">{{ target.phone }}</div>
              <div class="sms__amount">{{ target.amount }} UZS</div>
            </div>
          </div>
        }

        <div class="field">
          <label class="input-label">{{ 'SMS.TEXT' | translate }}</label>
          <textarea class="input" rows="5" [(ngModel)]="text"></textarea>
          <div class="sms__meta">
            <span class="sms__draft">{{ 'LABELS.DRAFT_NOTE' | translate }}</span>
            <span [class.over]="text.length > 160">{{ text.length }}/160</span>
          </div>
        </div>

        <label class="sms__copy">
          <input type="checkbox" [(ngModel)]="copy" />
          <span>{{ 'LABELS.RECEIVE_COPY' | translate }}</span>
        </label>
      </div>

      <div slot="footer" class="modal-actions">
        <app-button [fullWidth]="true" label="COMMON.CANCEL" variant="outline-secondary" (buttonClick)="close.emit()" />
        <app-button variant="primary" [fullWidth]="true" label="LABELS.SEND" (buttonClick)="onSend()"
          icon="pi-send" />
      </div>
    </app-modal>
  `,
  styles: `
    .sms { display: flex; flex-direction: column; gap: 20px; padding: 24px; }
    .sms__target {
      display: flex; align-items: center; gap: 12px;
      background: var(--color-bg-subtle); border-radius: 12px; padding: 16px;
    }
    .sms__name { font-size: 14px; font-weight: 600; color: var(--color-text-primary); }
    .sms__phone { font-size: 12px; color: var(--color-text-secondary); }
    .sms__amount { font-size: 14px; font-weight: 700; color: var(--color-danger); margin-top: 2px; }
    .field { display: flex; flex-direction: column; gap: 6px; }
    .sms__meta { display: flex; justify-content: space-between; font-size: 12px; color: var(--color-text-secondary); }
    .sms__meta .over { color: var(--color-danger); }
    .sms__draft { font-style: italic; color: var(--color-text-tertiary); }
    .sms__copy { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--color-text-secondary); cursor: pointer; }
    .modal-actions { display: flex; gap: 12px; padding: 16px 24px; border-top: 1px solid var(--color-border); }
    textarea.input { resize: none; }
  `,
})
export class SmsModal {
  private translate = inject(TranslateService);

  @Input() open = false;
  @Input() set target(value: SmsTarget | null) {
    this._target = value;
    if (value) {
      this.text = this.translate.instant('SMS.TEMPLATE', { name: value.name, amount: value.amount });
    }
  }
  get target(): SmsTarget | null {
    return this._target;
  }
  private _target: SmsTarget | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() send = new EventEmitter<string>();

  text = '';
  copy = false;

  ini = (name: string) => initials(name);

  onSend(): void {
    this.send.emit(this.text);
    this.close.emit();
  }
}

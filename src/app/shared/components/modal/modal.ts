import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Modal — markazlashgan dialog yoki o'ngdan chiqadigan drawer.
 * Kontent: default slot. Footer uchun `[slot=footer]`.
 * Header chap tomonidagi ikona uchun `[slot=icon]`.
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    @if (open) {
      <div class="modal" [class.modal--drawer]="variant === 'drawer'">
        <div class="modal__backdrop" (click)="onClose()"></div>

        <div class="modal__panel" [style.width.px]="width">
          <div class="modal__header">
            <div class="modal__title-wrap">
              <ng-content select="[slot=icon]"></ng-content>
              <h2 class="modal__title">{{ title }}</h2>
            </div>
            <button type="button" class="modal__close" (click)="onClose()" aria-label="Close">
              <i class="pi pi-times"></i>
            </button>
          </div>

          <div class="modal__body">
            <ng-content></ng-content>
          </div>

          <div class="modal__footer">
            <ng-content select="[slot=footer]"></ng-content>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    .modal {
      position: fixed;
      inset: 0;
      z-index: 400;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .modal__backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      animation: fade 0.15s ease;
    }
    .modal__panel {
      position: relative;
      display: flex;
      flex-direction: column;
      max-width: 100%;
      max-height: 90vh;
      background: var(--color-bg-elevated);
      border: 1px solid var(--color-border);
      border-radius: 16px;
      box-shadow: var(--shadow-xl);
      animation: pop 0.18s ease;
    }
    .modal__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      border-bottom: 1px solid var(--color-border);
      flex-shrink: 0;
    }
    .modal__title-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .modal__title {
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text-primary);
      margin: 0;
    }
    .modal__close {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: var(--color-text-secondary);
      cursor: pointer;
      transition: 0.15s;
      &:hover {
        background: var(--color-bg-subtle);
        color: var(--color-text-primary);
      }
    }
    .modal__body {
      overflow-y: auto;
      flex: 1;
    }
    .modal__footer {
      flex-shrink: 0;
      &:empty {
        display: none;
      }
    }

    /* Drawer variant — o'ngdan chiqadi */
    .modal--drawer {
      justify-content: flex-end;
      padding: 0;
      .modal__panel {
        max-height: 100vh;
        height: 100vh;
        border-radius: 0;
        border-right: none;
        border-top: none;
        border-bottom: none;
        animation: slide 0.25s ease;
      }
    }

    @keyframes fade {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes pop {
      from { opacity: 0; transform: translateY(8px) scale(0.98); }
      to { opacity: 1; transform: none; }
    }
    @keyframes slide {
      from { transform: translateX(100%); }
      to { transform: none; }
    }
  `,
})
export class Modal {
  @Input() open = false;
  @Input() title = '';
  @Input() width = 480;
  @Input() variant: 'center' | 'drawer' = 'center';

  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}

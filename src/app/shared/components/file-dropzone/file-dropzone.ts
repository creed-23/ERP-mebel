import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * FileDropzone — fayl tanlash/drag-drop maydoni + tanlangan fayllar chiplari.
 */
@Component({
  selector: 'app-file-dropzone',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <div class="dz">
      <div class="dz__area" (click)="picker.click()">
        <div class="dz__icon"><i class="pi pi-upload"></i></div>
        <p class="dz__text">
          {{ 'ORDER.DROP_FILES' | translate }}
          <span class="dz__link">{{ 'ORDER.CHOOSE' | translate }}</span>
        </p>
        <p class="dz__hint">{{ 'ORDER.FILE_HINT' | translate }}</p>
      </div>

      <input #picker type="file" hidden (change)="onPick($event)" />

      @if (files.length) {
        <div class="dz__list">
          @for (f of files; track $index) {
            <span class="dz__chip">
              <i class="pi pi-file"></i> {{ f }}
              <button type="button" (click)="remove.emit($index)"><i class="pi pi-times"></i></button>
            </span>
          }
        </div>
      }
    </div>
  `,
  styles: `
    .dz { display: flex; flex-direction: column; gap: 8px; }
    .dz__area {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 24px;
      border: 2px dashed var(--color-border);
      border-radius: 12px;
      cursor: pointer;
      transition: 0.15s;
      &:hover {
        border-color: color-mix(in srgb, var(--color-primary) 50%, transparent);
        background: var(--color-bg-overlay);
      }
    }
    .dz__icon {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: var(--color-bg-subtle);
      color: var(--color-text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dz__text { font-size: 14px; color: var(--color-text-secondary); text-align: center; margin: 0; }
    .dz__link { color: var(--color-primary); font-weight: 500; }
    .dz__hint { font-size: 12px; color: var(--color-text-tertiary); margin: 0; }
    .dz__list { display: flex; flex-wrap: wrap; gap: 8px; }
    .dz__chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      font-size: 12px;
      border-radius: 9999px;
      background: var(--color-bg-subtle);
      border: 1px solid var(--color-border);
      color: var(--color-text-secondary);
      button {
        border: none;
        background: none;
        color: inherit;
        cursor: pointer;
        display: inline-flex;
        &:hover { color: var(--color-danger); }
      }
    }
  `,
})
export class FileDropzone {
  @Input() files: string[] = [];
  @Output() add = new EventEmitter<string>();
  @Output() remove = new EventEmitter<number>();

  @ViewChild('picker') picker!: ElementRef<HTMLInputElement>;

  onPick(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.add.emit(file.name);
    input.value = '';
  }
}

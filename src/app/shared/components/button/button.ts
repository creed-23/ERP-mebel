import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export type ButtonVariant =
  | 'primary'
  | 'primary-active'
  | 'secondary'
  | 'secondary-active'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-danger'
  | 'ghost'
  | 'ghost-active'
  | 'tab'
  | 'tab-active'
  | 'link';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input() label = '';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() fullWidth = false;

  @Output() buttonClick = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit();
    }
  }

  get classes(): string[] {
    return [
      'app-btn',
      `app-btn--${this.variant}`,
      `app-btn--${this.size}`,
      !this.label && this.icon ? 'app-btn--icon-only' : '',
      this.fullWidth ? 'app-btn--full' : '',
    ].filter(Boolean);
  }
}

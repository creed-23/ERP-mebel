import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
export type InputSize = 'sm' | 'md' | 'lg' | '';
export type InputType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'date'
  | 'phone'
  | 'file'
  | 'textarea';
@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, TranslatePipe, CommonModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class CustomInput {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: InputType = 'text';
  @Input() size: InputSize = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() icon = '';
  @Input() customClass: string | string[] = '';
  @Output() valueChange = new EventEmitter<string>();

  value: any = '';
  isPasswordVisible = false;

  constructor() {}

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  get currentInputType(): string {
    if (this.type === 'password') {
      return this.isPasswordVisible ? 'text' : 'password';
    }
    return this.type;
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event) {
    let value = (event.target as HTMLInputElement).value;

    if (this.type === 'phone') {
      // Faqat raqam qoldiradi
      value = value.replace(/[^0-9]/g, '');

      // Maksimal 9 ta raqam
      value = value.slice(0, 9);

      // Formatlash
      if (value.length > 2) {
        value = value.replace(/(\d{2})(\d{0,3})(\d{0,2})(\d{0,2})/, (_, p1, p2, p3, p4) =>
          [p1, p2, p3, p4].filter(Boolean).join(' '),
        );
      }

      (event.target as HTMLInputElement).value = value;
    }

    this.value = value;

    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }

  get inputClasses(): string[] {
    const classes = ['app-input', `input-${this.size}`];
    if (this.disabled) classes.push('disabled');
    if (this.readonly) classes.push('readonly');

    if (this.customClass) {
      const extra = Array.isArray(this.customClass)
        ? this.customClass
        : this.customClass.split(' ');
      classes.push(...extra);
    }
    return classes;
  }
}

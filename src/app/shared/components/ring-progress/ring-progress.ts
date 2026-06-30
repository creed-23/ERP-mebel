import { Component, Input, computed, signal } from '@angular/core';

/**
 * RingProgress — doiraviy progress (SVG).
 * `color` CSS rang (masalan var(--color-primary)).
 */
@Component({
  selector: 'app-ring-progress',
  standalone: true,
  template: `
    <svg [attr.width]="size" [attr.height]="size" class="ring">
      <circle
        class="ring__track"
        [attr.cx]="size / 2"
        [attr.cy]="size / 2"
        [attr.r]="radius()"
        fill="none"
        [attr.stroke-width]="strokeWidth"
      />
      <circle
        [attr.cx]="size / 2"
        [attr.cy]="size / 2"
        [attr.r]="radius()"
        fill="none"
        [attr.stroke]="color"
        [attr.stroke-width]="strokeWidth"
        [attr.stroke-dasharray]="circumference()"
        [attr.stroke-dashoffset]="offset()"
        stroke-linecap="round"
      />
    </svg>
  `,
  styles: `
    .ring {
      transform: rotate(-90deg);
    }
    .ring__track {
      stroke: var(--color-border);
    }
  `,
})
export class RingProgress {
  @Input() set value(v: number) {
    this._value.set(v);
  }
  private _value = signal(0);

  @Input() size = 56;
  @Input() strokeWidth = 5;
  @Input() color = 'var(--color-primary)';

  radius = computed(() => (this.size - this.strokeWidth) / 2);
  circumference = computed(() => 2 * Math.PI * this.radius());
  offset = computed(() => this.circumference() - (this._value() / 100) * this.circumference());
}

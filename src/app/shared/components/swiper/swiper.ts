import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SwiperImage {
  src: string;
  alt?: string;
  caption?: string;
}

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './swiper.html',
  styleUrls: ['./swiper.scss'],
})
export class Swiper implements OnInit, OnChanges, OnDestroy {
  @Input() images: SwiperImage[] = [];
  @Input() autoplay = false;
  @Input() autoplayInterval = 4000;
  @Input() loop = true;
  @Input() showArrows = true;
  @Input() showDots = true;
  @Input() aspectRatio = '16/9';
  @Output() slideChange = new EventEmitter<number>();

  @ViewChild('track', { static: true }) trackRef!: ElementRef<HTMLDivElement>;

  activeIndex = 0;

  // drag holati
  isDragging = false;
  dragStartX = 0;
  dragDeltaX = 0;
  containerWidth = 0;

  private autoplayTimer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnChanges(): void {
    if (this.activeIndex >= this.images.length) {
      this.activeIndex = 0;
    }
    this.restartAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  // ───────────── Navigatsiya ─────────────

  goTo(index: number): void {
    if (!this.images.length) return;

    if (this.loop) {
      this.activeIndex = (index + this.images.length) % this.images.length;
    } else {
      this.activeIndex = Math.min(Math.max(index, 0), this.images.length - 1);
    }

    this.slideChange.emit(this.activeIndex);
    this.restartAutoplay();
  }

  next(): void {
    this.goTo(this.activeIndex + 1);
  }

  prev(): void {
    this.goTo(this.activeIndex - 1);
  }

  isFirst(): boolean {
    return this.activeIndex === 0;
  }

  isLast(): boolean {
    return this.activeIndex === this.images.length - 1;
  }

  // ───────────── Autoplay ─────────────

  private startAutoplay(): void {
    if (!this.autoplay || this.images.length < 2) return;
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => this.next(), this.autoplayInterval);
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  private restartAutoplay(): void {
    if (this.autoplay) this.startAutoplay();
  }

  onMouseEnter(): void {
    this.stopAutoplay();
  }

  onMouseLeave(): void {
    if (!this.isDragging) this.restartAutoplay();
  }

  // ───────────── Drag / Swipe (sichqoncha + barmoq) ─────────────

  onPointerDown(event: PointerEvent): void {
    if (this.images.length < 2) return;
    this.isDragging = true;
    this.dragStartX = event.clientX;
    this.dragDeltaX = 0;
    this.containerWidth = this.trackRef.nativeElement.parentElement?.clientWidth || 1;
    this.stopAutoplay();
    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging) return;
    this.dragDeltaX = event.clientX - this.dragStartX;
  }

  onPointerUp(): void {
    if (!this.isDragging) return;
    this.isDragging = false;

    const threshold = this.containerWidth * 0.15; // ~15% siljisa, slayd almashadi
    if (this.dragDeltaX > threshold) {
      this.prev();
    } else if (this.dragDeltaX < -threshold) {
      this.next();
    } else {
      this.restartAutoplay();
    }

    this.dragDeltaX = 0;
  }

  /** Track elementiga translateX qiymatini hisoblaydi (drag paytida ham silliq harakat) */
  getTrackTransform(): string {
    const baseOffset = -this.activeIndex * 100;
    const dragPercent = this.containerWidth ? (this.dragDeltaX / this.containerWidth) * 100 : 0;
    return `translateX(${baseOffset + dragPercent}%)`;
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '@shared/components/button/button';
import { BadgeComponent } from '@shared/components/ui/badge';

export interface ProductDimensions {
  width: number; // cm
  length: number; // cm
  height: number; // cm
}

export interface Product {
  id: number | string;
  name: string;
  category: string;
  imageUrl?: string;
  isNew?: boolean;
  dimensions: ProductDimensions;
  pdfUrl?: string;
  hasImage?: boolean;
}

@Component({
  selector: 'app-img-card',
  imports: [CommonModule, Button, BadgeComponent],
  templateUrl: './img-card.html',
  styleUrl: './img-card.scss',
})
export class ImgCard {
  @Input({ required: true }) product!: Product;
  @Input() route: (string | number)[] = [];

  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();
  @Output() download = new EventEmitter<Product>();
  @Output() viewPdf = new EventEmitter<Product>();
  @Output() viewImage = new EventEmitter<Product>();

  private readonly router = inject(Router);

  onEdit(): void {
    this.edit.emit(this.product);
  }

  onDelete(): void {
    this.delete.emit(this.product);
  }

  onDownload(): void {
    this.download.emit(this.product);
  }

  onViewPdf(): void {
    this.viewPdf.emit(this.product);
  }

  onViewImage(): void {
    this.viewImage.emit(this.product);
  }
  onRouter(): void {
    this.router.navigate(this.route);
  }
}

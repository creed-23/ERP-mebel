import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ImgCard, Product } from '@shared/components/cards/img-card/img-card';
import { PathResources } from '@shared/resources/path_resource';

@Component({
  selector: 'app-mebel-sizes',
  imports: [ImgCard, CommonModule],
  templateUrl: './mebel-sizes.html',
  styleUrl: './mebel-sizes.scss',
})
export class MebelSizes {
  public readonly PathResources = PathResources;
  products: Product[] = [
    {
      id: 1,
      name: 'Office Table',
      category: 'Tables',
      imageUrl:
        'https://img.freepik.com/free-psd/wooden-cabinet-with-two-doors-black-legs-modern-design-home-furniture-storage-solution_632498-27779.jpg?semt=ais_hybrid',
      isNew: true,
      pdfUrl: 'assets/table.pdf',
      hasImage: true,
      dimensions: {
        width: 120,
        length: 60,
        height: 75,
      },
    },
    {
      id: 2,
      name: 'Office Table',
      category: 'Tables',
      imageUrl:
        'https://img.freepik.com/free-psd/wooden-cabinet-with-two-doors-black-legs-modern-design-home-furniture-storage-solution_632498-27779.jpg?semt=ais_hybrid',
      isNew: true,
      pdfUrl: 'assets/table.pdf',
      hasImage: true,
      dimensions: {
        width: 120,
        length: 60,
        height: 75,
      },
    },
    {
      id: 2,
      name: 'Office Table',
      category: 'Tables',
      imageUrl:
        'https://img.freepik.com/free-psd/wooden-cabinet-with-two-doors-black-legs-modern-design-home-furniture-storage-solution_632498-27779.jpg?semt=ais_hybrid',
      isNew: true,
      pdfUrl: 'assets/table.pdf',
      hasImage: true,
      dimensions: {
        width: 120,
        length: 60,
        height: 75,
      },
    },
    {
      id: 2,
      name: 'Office Table',
      category: 'Tables',
      imageUrl:
        'https://img.freepik.com/free-psd/wooden-cabinet-with-two-doors-black-legs-modern-design-home-furniture-storage-solution_632498-27779.jpg?semt=ais_hybrid',
      isNew: true,
      pdfUrl: 'assets/table.pdf',
      hasImage: true,
      dimensions: {
        width: 120,
        length: 60,
        height: 75,
      },
    },
    {
      id: 2,
      name: 'Office Table',
      category: 'Tables',
      imageUrl:
        'https://img.freepik.com/free-psd/wooden-cabinet-with-two-doors-black-legs-modern-design-home-furniture-storage-solution_632498-27779.jpg?semt=ais_hybrid',
      isNew: true,
      pdfUrl: 'assets/table.pdf',
      hasImage: true,
      dimensions: {
        width: 120,
        length: 60,
        height: 75,
      },
    },
  ];

  onEdit(product: Product): void {
    console.log('Edit:', product);
  }

  onDelete(product: Product): void {
    console.log('Delete:', product);
  }

  onDownload(product: Product): void {
    console.log('Download:', product);
  }

  onViewPdf(product: Product): void {
    console.log('View PDF:', product);
  }

  onViewImage(product: Product): void {
    console.log('View Image:', product);
  }
}

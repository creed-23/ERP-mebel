import { Component, signal } from '@angular/core';
import {
  GenericTableComponent,
  TableColumn,
} from '@shared/components/tables/generic-table/generic-table';
import { Swiper, SwiperImage } from '@shared/components/swiper/swiper';
import { Button } from "@shared/components/button/button";
interface DimensionRow {
  id: number;
  length: number;
  width: number;
  amount: number;
}
@Component({
  selector: 'app-size-detail',
  imports: [GenericTableComponent, Swiper, Button],
  templateUrl: './size-detail.html',
  styleUrl: './size-detail.scss',
})
export class SizeDetail {
  columns: TableColumn<DimensionRow>[] = [
    { key: 'length', label: 'Length', type: 'number', align: 'right', width: '120px' },
    { label: '', type: 'separator', separatorText: 'X', width: '32px' },
    { key: 'width', label: 'Width', type: 'number', align: 'right', width: '120px' },
    { key: 'amount', label: 'Amount', type: 'number', align: 'right', width: '120px' },
  ];

  rows: DimensionRow[] = [
    { id: 1, length: 289, width: 310, amount: 4 },
    { id: 2, length: 289, width: 300, amount: 2 },
    { id: 3, length: 690, width: 285, amount: 4 },
    { id: 4, length: 800, width: 350, amount: 2 },
    { id: 5, length: 700, width: 700, amount: 1 },
    { id: 6, length: 700, width: 330, amount: 2 },
    { id: 7, length: 700, width: 252, amount: 1 },
    { id: 8, length: 342, width: 240, amount: 1 },
    { id: 9, length: 690, width: 347, amount: 2 },
    { id: 10, length: 800, width: 400, amount: 2 },
    { id: 11, length: 700, width: 700, amount: 1 },
    { id: 12, length: 700, width: 380, amount: 2 },
    { id: 13, length: 700, width: 302, amount: 1 },
  ];

  createEmptyRow = (): DimensionRow => ({
    id: 0,
    length: 0,
    width: 0,
    amount: 1,
  });

  onAdded(row: DimensionRow) {
    console.log("Qator qo'shildi:", row);
  }

  onUpdated(event: { index: number; row: DimensionRow }) {
    console.log('Qator tahrirlandi:', event);
  }

  onDeleted(event: { index: number; row: DimensionRow }) {
    console.log("Qator o'chirildi:", event);
  }
  images: SwiperImage[] = [
    { src: 'https://picsum.photos/id/10/1200/700', alt: 'Tabiat 1', caption: "Tog' ko'li" },
    { src: 'https://picsum.photos/id/20/1200/700', alt: 'Tabiat 2', caption: 'Yashil dala' },
    { src: 'https://picsum.photos/id/30/1200/700', alt: 'Tabiat 3', caption: 'Qoyalar' },
    { src: 'https://picsum.photos/id/40/1200/700', alt: 'Tabiat 4' },
  ];

  onSlideChange(index: number) {
    console.log('Faol slayd:', index);
  }
}

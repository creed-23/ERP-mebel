import { Component, Input } from '@angular/core';
import { Button } from '@shared/components/button/button';

export interface OvertimeItem {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  time: string;
}

@Component({
  selector: 'app-overtime-list',
  imports: [Button],
  templateUrl: './overtime-list.html',
  styleUrl: './overtime-list.scss',
})
export class OvertimeList {
  @Input() data: OvertimeItem[] = [];
  
}

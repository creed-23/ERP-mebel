import { Component } from '@angular/core';
import {
  Calendar,
  Master,
  MasterSchedule,
  ScheduleEntry,
} from '@shared/components/calendar/calendar';
import { IconCard } from '@shared/components/cards/icon-card/icon-card';
import { OvertimeItem, OvertimeList } from '@shared/components/lists/overtime-list/overtime-list';

@Component({
  selector: 'app-master-detail',
  imports: [Calendar, IconCard, OvertimeList],
  templateUrl: './master-detail.html',
  styleUrl: './master-detail.scss',
})
export class MasterDetail {
  masters: Master[] = [{ id: 1, name: 'Asilbek Toshmatov', color: '#3b82f6' }];

  // Endi object emas — array. Har bir element: { date, masterId, record }
  schedule: ScheduleEntry[] = [
    { date: '2026-06-05', masterId: 1, record: { in: '09:00', out: '19:00' } },
    { date: '2026-06-06', masterId: 1, record: { in: '09:00', out: '19:00' } },
    { date: '2026-06-07', masterId: 1, record: { in: '09:00', out: '19:00' } },
    { date: '2026-06-08', masterId: 1, record: { in: '09:00', out: '19:00' } },
    { date: '2026-06-09', masterId: 1, record: { in: '09:00', out: '19:00' } },
    { date: '2026-06-10', masterId: 1, record: { in: '09:00', out: '19:00' } },
    { date: '2026-06-11', masterId: 1, record: { in: '09:14', out: '19:00' } },
    { date: '2026-06-13', masterId: 1, record: { in: '09:00', out: '19:00' } },
    { date: '2026-06-15', masterId: 1, record: { in: '09:00', out: '19:00' } },
    { date: '2026-06-18', masterId: 1, record: { in: '10:00', out: '19:00' } },

    // Kelmagan kunni shunday belgilaysiz (record: null):
    // { date: '2026-06-12', masterId: 1, record: null },
  ];
  items: OvertimeItem[] = [
    {
      id: 1,
      title: 'Mijoz bilan uchrashuv',
      date: '24.06.2026',
      startTime: '18:00',
      endTime: '20:00',
      location: 'Toshkent shahri, Chilonzor',
      time: '2 soat',
    },
    {
      id: 2,
      title: "Mebel o'rnatish nazorati",
      date: '25.06.2026',
      startTime: '17:30',
      endTime: '21:00',
      location: 'Toshkent shahri, Yunusobod',
      time: '3.5 soat',
    },
    {
      id: 3,
      title: 'Ombor inventarizatsiyasi',
      date: '26.06.2026',
      startTime: '19:00',
      endTime: '22:00',
      location: 'Sergeli tumani',
      time: '3 soat',
    },
    {
      id: 4,
      title: 'Yetkazib berish jarayonini tekshirish',
      date: '27.06.2026',
      startTime: '18:00',
      endTime: '23:00',
      location: 'Olmazor tumani',
      time: '5 soat',
    },
  ];
}

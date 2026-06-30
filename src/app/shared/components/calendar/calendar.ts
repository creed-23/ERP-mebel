import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

export interface Master {
  id: number;
  name: string;
  color: string;
}

export interface AttendanceRecord {
  in: string; // '09:05'
  out: string; // '19:00'
}

/**
 * Endi schedule — object emas, ARRAY.
 * Har bir element bir kun + bir usta uchun bitta yozuv.
 * record: null = kelmadi (absent)
 */
export interface ScheduleEntry {
  date: string; // 'YYYY-MM-DD', masalan '2026-06-05'
  masterId: number;
  record: AttendanceRecord | null;
}

export type MasterSchedule = ScheduleEntry[];

export type AttendanceStatus = 'ok' | 'late' | 'absent';

export interface MasterAttendance {
  master: Master;
  record: AttendanceRecord | null;
  status: AttendanceStatus;
  lateMinutes: number;
  earlyLeaveMinutes: number;
}

export interface CalendarDay {
  day: number;
  key: string;
  isOtherMonth: boolean;
  dayStatus: 'ok' | 'late' | 'absent' | 'mixed' | 'none';
  attendances: MasterAttendance[];
}

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar implements OnInit {
  @Input() masters: Master[] = [];

  /** Endi array: { date, masterId, record }[] */
  @Input() schedule: MasterSchedule = [];

  // Ish vaqti sozlamalari
  @Input() workStartHour = 9;
  @Input() workStartMinute = 0;
  @Input() workEndHour = 19;
  @Input() workEndMinute = 0;
  @Input() lateThresholdMin = 15; // necha daqiqadan kech = kechikdi

  readonly MONTHS = [
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'Iyun',
    'Iyul',
    'Avgust',
    'Sentabr',
    'Oktabr',
    'Noyabr',
    'Dekabr',
  ];
  readonly DAYS = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];

  currentYear!: number;
  currentMonth!: number;
  today!: Date;
  selectedKey: string | null = null;
  calendarDays: CalendarDay[] = [];

  get monthTitle(): string {
    return `${this.MONTHS[this.currentMonth]} ${this.currentYear}`;
  }

  get selectedDay(): CalendarDay | null {
    return this.calendarDays.find((d) => d.key === this.selectedKey) ?? null;
  }

  get selectedDateLabel(): string {
    if (!this.selectedKey) return '';
    const [y, m, d] = this.selectedKey.split('-');
    return `${parseInt(d)}-${this.MONTHS[parseInt(m) - 1]}, ${y}`;
  }

  get selectedBadge(): { text: string; type: string } | null {
    const day = this.selectedDay;
    if (!day) return null;
    switch (day.dayStatus) {
      case 'ok':
        return { text: "Barchasi o'z vaqtida", type: 'ok' };
      case 'late':
        return { text: 'Kechikish bor', type: 'late' };
      case 'absent':
        return { text: 'Hech kim kelmadi', type: 'absent' };
      case 'mixed':
        return { text: 'Aralash', type: 'mixed' };
      default:
        return null;
    }
  }

  get workStartLabel(): string {
    return `${String(this.workStartHour).padStart(2, '0')}:${String(this.workStartMinute).padStart(2, '0')}`;
  }

  get workEndLabel(): string {
    return `${String(this.workEndHour).padStart(2, '0')}:${String(this.workEndMinute).padStart(2, '0')}`;
  }

  ngOnInit(): void {
    this.today = new Date();
    this.currentYear = this.today.getFullYear();
    this.currentMonth = this.today.getMonth();
    this.buildCalendar();
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else this.currentMonth--;
    this.buildCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else this.currentMonth++;
    this.buildCalendar();
  }

  selectDay(day: CalendarDay): void {
    if (day.isOtherMonth) return;
    this.selectedKey = day.key;
  }

  isToday(day: CalendarDay): boolean {
    return (
      !day.isOtherMonth &&
      day.day === this.today.getDate() &&
      this.currentMonth === this.today.getMonth() &&
      this.currentYear === this.today.getFullYear()
    );
  }

  getStatusLabel(status: AttendanceStatus): string {
    return { ok: '✓ Keldi', late: '⚠ Kechikdi', absent: '✗ Kelmadi' }[status];
  }

  buildCalendar(): void {
    const days: CalendarDay[] = [];
    const first = new Date(this.currentYear, this.currentMonth, 1);
    let startDow = first.getDay();
    startDow = startDow === 0 ? 6 : startDow - 1;
    const dim = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const pdim = new Date(this.currentYear, this.currentMonth, 0).getDate();
    const pM = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
    const pY = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;

    for (let i = 0; i < startDow; i++)
      days.push(this.makeDay(pdim - startDow + 1 + i, pY, pM, true));
    for (let d = 1; d <= dim; d++)
      days.push(this.makeDay(d, this.currentYear, this.currentMonth, false));
    const rem = (startDow + dim) % 7 === 0 ? 0 : 7 - ((startDow + dim) % 7);
    const nM = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
    const nY = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
    for (let d = 1; d <= rem; d++) days.push(this.makeDay(d, nY, nM, true));

    this.calendarDays = days;
  }

  private makeDay(d: number, y: number, m: number, other: boolean): CalendarDay {
    const key = this.toKey(y, m, d);
    const wsMin = this.workStartHour * 60 + this.workStartMinute;
    const weMin = this.workEndHour * 60 + this.workEndMinute;

    // Shu kunga tegishli barcha yozuvlarni array'dan filter qilamiz
    const dayEntries = this.schedule.filter((e) => e.date === key);

    const attendances: MasterAttendance[] = this.masters
      .filter((master) => dayEntries.some((e) => e.masterId === master.id))
      .map((master) => {
        const entry = dayEntries.find((e) => e.masterId === master.id)!;
        const rec = entry.record;

        if (!rec)
          return {
            master,
            record: null,
            status: 'absent' as const,
            lateMinutes: 0,
            earlyLeaveMinutes: 0,
          };

        const inMin = this.toMins(rec.in);
        const outMin = this.toMins(rec.out);
        const status: AttendanceStatus = inMin > wsMin + this.lateThresholdMin ? 'late' : 'ok';
        return {
          master,
          record: rec,
          status,
          lateMinutes: Math.max(0, inMin - wsMin),
          earlyLeaveMinutes: Math.max(0, weMin - outMin),
        };
      });

    const sts = attendances.map((a) => a.status);
    let dayStatus: CalendarDay['dayStatus'] = 'none';
    if (sts.length) {
      if (sts.every((s) => s === 'absent')) dayStatus = 'absent';
      else if (sts.every((s) => s === 'ok')) dayStatus = 'ok';
      else if (sts.some((s) => s === 'late') && !sts.some((s) => s === 'absent'))
        dayStatus = 'late';
      else dayStatus = 'mixed';
    }

    return { day: d, key, isOtherMonth: other, dayStatus, attendances };
  }

  private toMins(t: string): number {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  }

  toKey(y: number, m: number, d: number): string {
    return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  }
}

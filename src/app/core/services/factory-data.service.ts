import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  AttendanceItem,
  CatalogItem,
  Debtor,
  DebtorMini,
  DimensionRow,
  KanbanColumns,
  OrderRow,
  RevenuePoint,
  SalaryRow,
  SeriesPoint,
  WeeklyOrderPoint,
  WorkshopRow,
} from '@shared/interfaces/factory.interface';

/**
 * FactoryDataService — MOCK.
 * Barcha ekranlar uchun namuna ma'lumotlar. Har bir metod
 * Observable qaytaradi (tarmoq kechikishi bilan), shuning uchun
 * backend tayyor bo'lganda faqat shu metodlar ichi almashtiriladi.
 */
@Injectable({ providedIn: 'root' })
export class FactoryDataService {
  private wrap<T>(data: T, ms = 350): Observable<T> {
    return of(data).pipe(delay(ms));
  }

  // ─── Charts ────────────────────────────────────────────────
  getRevenueDynamics(): Observable<RevenuePoint[]> {
    return this.wrap([
      { month: 'Yan', received: 42, completed: 38 },
      { month: 'Fev', received: 35, completed: 32 },
      { month: 'Mar', received: 51, completed: 47 },
      { month: 'Apr', received: 48, completed: 44 },
      { month: 'May', received: 62, completed: 55 },
      { month: 'Iyu', received: 58, completed: 52 },
    ]);
  }

  getOrdersByWorkshop(): Observable<SeriesPoint[]> {
    return this.wrap([
      { label: 'Yotoq xona', value: 82 },
      { label: 'Oshxona', value: 67 },
      { label: 'Yashash xona', value: 91 },
      { label: 'Ofis', value: 43 },
      { label: 'Bolalar', value: 41 },
    ]);
  }

  getWeeklyOrders(): Observable<WeeklyOrderPoint[]> {
    return this.wrap([
      { day: 'Du', completed: 8, created: 5 },
      { day: 'Se', completed: 12, created: 7 },
      { day: 'Ch', completed: 6, created: 3 },
      { day: 'Pa', completed: 10, created: 8 },
      { day: 'Ju', completed: 15, created: 6 },
      { day: 'Sha', completed: 9, created: 4 },
    ]);
  }

  // ─── Owner ─────────────────────────────────────────────────
  getWorkshops(): Observable<WorkshopRow[]> {
    return this.wrap([
      { id: 1, name: 'Yotoq xona sexi', workers: 18, orders: 42, revenue: '28,400,000', status: 'done' },
      { id: 2, name: 'Oshxona sexi', workers: 14, orders: 38, revenue: '22,100,000', status: 'inProgress' },
      { id: 3, name: 'Yashash xona sexi', workers: 22, orders: 56, revenue: '35,800,000', status: 'done' },
      { id: 4, name: 'Ofis mebel sexi', workers: 11, orders: 28, revenue: '18,600,000', status: 'pending' },
      { id: 5, name: 'Bolalar xona sexi', workers: 9, orders: 21, revenue: '14,200,000', status: 'inProgress' },
    ]);
  }

  // ─── Workshop ──────────────────────────────────────────────
  getKanban(): Observable<KanbanColumns> {
    return this.wrap({
      new: [
        { id: 'ZK-041', title: 'Yotoq garnitur 3 qavat', avatar: 'AT', deadline: '28 Iyu', priority: 'high' },
        { id: 'ZK-042', title: "Divan L-shakl 2.4m", avatar: 'BX', deadline: '30 Iyu', priority: 'medium' },
        { id: 'ZK-043', title: 'Ofis stoli + jixoz', avatar: 'SK', deadline: '02 Iyul', priority: 'low' },
        { id: 'ZK-044', title: "Kreslo to'plami ×6", avatar: 'MN', deadline: '05 Iyul', priority: 'medium' },
      ],
      inProgress: [
        { id: 'ZK-035', title: 'Bolalar karavoti 160×200', avatar: 'AT', deadline: '25 Iyu', priority: 'high' },
        { id: 'ZK-036', title: 'TV unit 2.8m eman', avatar: 'DY', deadline: '26 Iyu', priority: 'medium' },
        { id: 'ZK-037', title: "Oshxona garnituri to'liq", avatar: 'RQ', deadline: '24 Iyu', priority: 'high' },
        { id: 'ZK-038', title: 'Kutish xona divani', avatar: 'BX', deadline: '27 Iyu', priority: 'low' },
      ],
      checking: [
        { id: 'ZK-029', title: '5 xonali uy garnituri', avatar: 'SK', deadline: '23 Iyu', priority: 'high' },
        { id: 'ZK-030', title: 'Restoran stol ×12', avatar: 'MN', deadline: '22 Iyu', priority: 'medium' },
        { id: 'ZK-031', title: 'Yotoq garnituri premium', avatar: 'AT', deadline: '21 Iyu', priority: 'high' },
      ],
      done: [
        { id: 'ZK-021', title: 'Mehmonxona divani', avatar: 'DY', deadline: '18 Iyu', priority: 'medium' },
        { id: 'ZK-022', title: 'Oshxona garnituri mini', avatar: 'RQ', deadline: '17 Iyu', priority: 'low' },
        { id: 'ZK-023', title: 'Ofis kreslo ×10', avatar: 'BX', deadline: '15 Iyu', priority: 'medium' },
      ],
    });
  }

  getAttendance(): Observable<AttendanceItem[]> {
    return this.wrap([
      { name: 'Alisher T.', avatar: 'AT', time: '09:14', came: true },
      { name: 'Bobur X.', avatar: 'BX', time: '09:02', came: true },
      { name: 'Sardor K.', avatar: 'SK', time: '09:31', came: true },
      { name: 'Dilshod Y.', avatar: 'DY', time: null, came: false },
      { name: 'Rustam Q.', avatar: 'RQ', time: '08:58', came: true },
      { name: 'Mansur N.', avatar: 'MN', time: '09:45', came: true },
      { name: 'Jasur B.', avatar: 'JB', time: null, came: false },
      { name: 'Firdavs T.', avatar: 'FT', time: '09:20', came: true },
      { name: 'Laziz O.', avatar: 'LO', time: '09:05', came: true },
      { name: "Ulug'bek M.", avatar: 'UM', time: null, came: false },
      { name: 'Sherzod A.', avatar: 'SA', time: '09:11', came: true },
      { name: 'Nodir R.', avatar: 'NR', time: '09:33', came: true },
    ]);
  }

  getWorkshopDebtors(): Observable<DebtorMini[]> {
    return this.wrap([
      { name: 'Aziz Karimov', phone: '+998 90 123 45 67', amount: '4,500,000', deadline: '20.06.2024' },
      { name: 'Nodira Xoliqova', phone: '+998 91 234 56 78', amount: '1,800,000', deadline: '25.06.2024' },
      { name: 'Jamshid Toshev', phone: '+998 93 345 67 89', amount: '6,200,000', deadline: '15.06.2024' },
      { name: 'Behruz Rahimov', phone: '+998 97 567 89 01', amount: '3,300,000', deadline: '18.06.2024' },
    ]);
  }

  // ─── Worker ────────────────────────────────────────────────
  getWorkerOrders(): Observable<OrderRow[]> {
    return this.wrap([
      { id: 'ZK-035', client: 'Aziz Karimov', deadline: '25.06.2024', status: 'inProgress' },
      { id: 'ZK-029', client: 'Nodira Xoliqova', deadline: '23.06.2024', status: 'checking' },
      { id: 'ZK-021', client: 'Jamshid Toshev', deadline: '18.06.2024', status: 'done' },
      { id: 'ZK-015', client: 'Malika Yusupova', deadline: '12.06.2024', status: 'done' },
      { id: 'ZK-041', client: 'Behruz Rahimov', deadline: '28.06.2024', status: 'new' },
      { id: 'ZK-038', client: 'Eldor Qodirov', deadline: '27.06.2024', status: 'inProgress' },
    ]);
  }

  // ─── Catalog / Dimensions ──────────────────────────────────
  getCatalog(): Observable<CatalogItem[]> {
    return this.wrap([
      { id: 1, title: 'Milano Divan L-shakl', category: 'divan', w: 260, d: 160, h: 88, badge: 'Yangi' },
      { id: 2, title: 'Royal Kreslo Premium', category: 'armchair', w: 90, d: 95, h: 105, badge: null },
      { id: 3, title: 'Palazzo Yotoq 160×200', category: 'bed', w: 160, d: 200, h: 140, badge: 'Top' },
      { id: 4, title: 'Business Ofis Stoli', category: 'office', w: 160, d: 80, h: 75, badge: null },
      { id: 5, title: "Venezia Stol-stul To'plam", category: 'tableChair', w: 120, d: 80, h: 76, badge: 'Yangi' },
      { id: 6, title: "Comfort Divan 3-o'rinlik", category: 'divan', w: 220, d: 95, h: 85, badge: null },
    ]);
  }

  getDimensionRows(_catalogId: number): Observable<DimensionRow[]> {
    return this.wrap([
      { id: 1, length: 289, width: 310, height: 88, amount: 4 },
      { id: 2, length: 289, width: 300, height: 88, amount: 2 },
      { id: 3, length: 690, width: 285, height: 88, amount: 4 },
      { id: 4, length: 800, width: 350, height: 45, amount: 2 },
      { id: 5, length: 700, width: 700, height: 45, amount: 1 },
      { id: 6, length: 700, width: 330, height: 45, amount: 2 },
      { id: 7, length: 700, width: 252, height: 38, amount: 1 },
      { id: 8, length: 342, width: 240, height: 38, amount: 1 },
      { id: 9, length: 690, width: 347, height: 38, amount: 2 },
      { id: 10, length: 800, width: 400, height: 22, amount: 2 },
      { id: 11, length: 700, width: 700, height: 22, amount: 1 },
      { id: 12, length: 700, width: 380, height: 22, amount: 2 },
      { id: 13, length: 700, width: 302, height: 22, amount: 1 },
    ]);
  }

  // ─── Salary ────────────────────────────────────────────────
  getSalaries(): Observable<SalaryRow[]> {
    return this.wrap([
      { id: 1, name: 'Alisher Toshmatov', days: 24, hours: 192, rate: '12,500', salary: '2,400,000', avans: '400,000', qoldiq: '2,000,000' },
      { id: 2, name: 'Bobur Xasanov', days: 22, hours: 176, rate: '11,000', salary: '1,936,000', avans: '300,000', qoldiq: '1,636,000' },
      { id: 3, name: 'Sardor Karimov', days: 25, hours: 200, rate: '13,000', salary: '2,600,000', avans: '500,000', qoldiq: '2,100,000' },
      { id: 4, name: 'Dilshod Yuldashev', days: 18, hours: 144, rate: '10,000', salary: '1,440,000', avans: '200,000', qoldiq: '1,240,000' },
      { id: 5, name: 'Rustam Qodirov', days: 24, hours: 192, rate: '14,000', salary: '2,688,000', avans: '600,000', qoldiq: '2,088,000' },
      { id: 6, name: 'Mansur Normatov', days: 23, hours: 184, rate: '11,500', salary: '2,116,000', avans: '350,000', qoldiq: '1,766,000' },
      { id: 7, name: 'Jasur Botirov', days: 20, hours: 160, rate: '10,500', salary: '1,680,000', avans: '250,000', qoldiq: '1,430,000' },
      { id: 8, name: 'Firdavs Tursunov', days: 24, hours: 192, rate: '12,000', salary: '2,304,000', avans: '400,000', qoldiq: '1,904,000' },
    ]);
  }

  // ─── Debtors ───────────────────────────────────────────────
  getDebtors(): Observable<Debtor[]> {
    return this.wrap([
      { id: 1, name: 'Aziz Karimov', phone: '+998 90 123 45 67', amount: '4,500,000', deadline: '20.06.2024', overdue: true, status: 'danger' },
      { id: 2, name: 'Nodira Xoliqova', phone: '+998 91 234 56 78', amount: '1,800,000', deadline: '25.06.2024', overdue: false, status: 'warning' },
      { id: 3, name: 'Jamshid Toshev', phone: '+998 93 345 67 89', amount: '6,200,000', deadline: '15.06.2024', overdue: true, status: 'danger' },
      { id: 4, name: 'Malika Yusupova', phone: '+998 94 456 78 90', amount: '950,000', deadline: '28.06.2024', overdue: false, status: 'warning' },
      { id: 5, name: 'Behruz Rahimov', phone: '+998 97 567 89 01', amount: '3,300,000', deadline: '18.06.2024', overdue: true, status: 'danger' },
      { id: 6, name: 'Nilufar Sobirov', phone: '+998 99 678 90 12', amount: '2,100,000', deadline: '30.06.2024', overdue: false, status: 'pending' },
      { id: 7, name: 'Eldor Qodirov', phone: '+998 90 789 01 23', amount: '5,700,000', deadline: '12.06.2024', overdue: true, status: 'danger' },
      { id: 8, name: 'Zulfiya Hamidova', phone: '+998 91 890 12 34', amount: '1,200,000', deadline: '22.06.2024', overdue: true, status: 'danger' },
      { id: 9, name: 'Ravshan Mirzayev', phone: '+998 93 901 23 45', amount: '800,000', deadline: '02.07.2024', overdue: false, status: 'done' },
    ]);
  }
}

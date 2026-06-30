// =============================================
// Factory domain models (Mebel fabrikasi)
// Backend hali tayyor emas — bu modellar mock service'lar
// tomonidan ishlatiladi, keyinchalik real API'ga ulanadi.
// =============================================

export type Role = 'owner' | 'workshop' | 'worker';

export type OrderStatus = 'new' | 'inProgress' | 'checking' | 'done' | 'pending' | 'cancelled';

export type DebtStatus = 'danger' | 'warning' | 'pending' | 'done';

export type FurnitureCategory = 'divan' | 'armchair' | 'tableChair' | 'bed' | 'office';

export interface AuthUser {
  id: number;
  name: string;
  /** avatar uchun bosh harflar, masalan "JT" */
  initials: string;
  phone: string;
  role: Role;
}

export interface LoginRequest {
  phone: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

// ─── Dashboard ─────────────────────────────────────────────
export interface StatCardData {
  icon: string; // primeicons class
  iconColor: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'teal';
  value: string;
  /** i18n key yoki tayyor matn */
  label: string;
  subValue?: string;
  trend?: string;
  trendUp?: boolean;
}

export interface SeriesPoint {
  label: string;
  value: number;
}

export interface RevenuePoint {
  month: string;
  received: number;
  completed: number;
}

export interface WeeklyOrderPoint {
  day: string;
  completed: number;
  created: number;
}

export interface WorkshopRow {
  id: number;
  name: string;
  workers: number;
  orders: number;
  revenue: string;
  status: OrderStatus;
}

export interface KanbanCard {
  id: string;
  title: string;
  avatar: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
}

export interface KanbanColumns {
  new: KanbanCard[];
  inProgress: KanbanCard[];
  checking: KanbanCard[];
  done: KanbanCard[];
}

export interface AttendanceItem {
  name: string;
  avatar: string;
  time: string | null;
  came: boolean;
}

export interface OrderRow {
  id: string;
  client: string;
  deadline: string;
  status: OrderStatus;
}

export interface DebtorMini {
  name: string;
  phone: string;
  amount: string;
  deadline: string;
}

// ─── Salary ────────────────────────────────────────────────
export interface SalaryRow {
  id: number;
  name: string;
  days: number;
  hours: number;
  rate: string;
  salary: string;
  avans: string;
  qoldiq: string;
}

// ─── Debtors ───────────────────────────────────────────────
export interface Debtor {
  id: number;
  name: string;
  phone: string;
  amount: string;
  deadline: string;
  overdue: boolean;
  status: DebtStatus;
}

// ─── Dimensions / Catalog ──────────────────────────────────
export interface CatalogItem {
  id: number;
  title: string;
  category: FurnitureCategory;
  w: number;
  d: number;
  h: number;
  badge: string | null;
}

export interface DimensionRow {
  id: number;
  length: number;
  width: number;
  height: number;
  amount: number;
}

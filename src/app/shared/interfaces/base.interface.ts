// =============================================
// API Response Models
// =============================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // current page (0-indexed)
  first: boolean;
  last: boolean;
}

export interface PageRequest {
  page?: number;
  size?: number;
  sort?: string; // e.g. 'createdAt,desc'
  search?: string;
}

export interface SelectOption<T = number> {
  label: string;
  value: T;
}

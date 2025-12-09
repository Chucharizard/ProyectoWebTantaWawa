// API Response Types
export interface ApiResponse<T> {
  data?: T;
  mensaje?: string;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  message: string;
  error?: string;
  statusCode?: number;
}

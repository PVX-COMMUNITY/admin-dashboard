export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginatedMeta;
}

export interface PaginatedMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface Member {
  id: string;
  name: string;
  donation: number;
  number: string;
}

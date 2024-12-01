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
  uuid: string;
  name: string;
  donation: number;
  number: string;
}

export interface Birthday {
  uuid: string;
  date: number;
  month: number;
  year: number;
  place: string;
  name: string;
}

export interface Group {
  name: string;
  uuid: string;
  link: string;
  commands_disabled: string[];
}

export interface Blacklist {
  number: string;
  uuid: string;
  reason: string;
  admin: string;
}

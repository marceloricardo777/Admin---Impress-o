export interface UserObjectResponse {
  page: number;
  user: any;
}

export interface UserListItemAdmin {
  key: number;
  user_nome: string;
  user_id: string;
  user_email: string;
  user_createdAt: Date;
  user_updateAt: Date;
  user_active: boolean;
  user_level: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
}

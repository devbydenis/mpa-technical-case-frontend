export interface Column<T> {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  render?: (row: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  total: number;
  page: number;
  rowsPerPage: number;
  loading?: boolean;
  emptyMessage?: string;
  keyExtractor: (row: T) => string | number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (limit: number) => void;
}
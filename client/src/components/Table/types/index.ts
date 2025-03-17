import { DataGridProps } from '@mui/x-data-grid';

type ColumnDefinition = {
  field: string;
  headerName: string;
  width?: number;
  flex?: number;
  type?: 'string' | 'number' | 'date' | 'boolean' | 'actions';
  valueFormatter?: (value: any) => string;
  renderCell?: (params: any) => React.ReactNode;
  editable?: boolean;
};

type TableProps = DataGridProps & {
  columns: ColumnDefinition[];
  rows: any[];
  sortingField: string;
  href?: string;
  label: string;
  isLoading: boolean;
  rowModesModel?: any;
  setRowModesModel?: any;
  setRows?: any;
  icon?: React.ReactNode;
  onClick?: () => void;
  buttons?: string[];
  buttonActions?: { [key: string]: () => void };
  actionHandlers?: { [key: string]: (id: string) => void };
};

export type { ColumnDefinition, TableProps };

'use client';

import TableToolbar from '@/components/Table/CustomToolbar';
import { generateColumns } from '@/components/Table/GenerateColumns';
import { TableProps } from '@/components/Table/types';
import { DataGrid } from '@mui/x-data-grid';
import ContainerTable from './ContainerTable';
import NoRow from './NoRow';

const Table = ({
  columns: columnDefs,
  isLoading,
  rowModesModel,
  rows,
  sortingField,
  icon,
  buttons = ['add', 'columns', 'export'],
  label,
  buttonActions = {},
  actionHandlers = {},
  onClick,
  ...rest
}: TableProps) => {
  const getLabel = (button: string) => {
    if (button === 'add') return label || 'Adicionar';
    if (button === 'columns') return 'Ajustar Colunas';
    if (button === 'export') return 'Exportar';
    return label;
  };

  const columns = generateColumns(columnDefs, actionHandlers);

  return (
    <ContainerTable>
      <DataGrid
        {...rest}
        rows={rows}
        columns={columns}
        rowModesModel={rowModesModel}
        editMode="row"
        loading={isLoading}
        filterMode="client"
        pageSizeOptions={[10, 25, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          sorting: {
            sortModel: [{ field: sortingField, sort: 'asc' }],
          },
        }}
        slots={{
          noRowsOverlay: NoRow,
          toolbar: () => (
            <TableToolbar
              href={rest.href}
              onClick={onClick}
              label={label}
              icon={icon}
              buttons={buttons}
              getLabel={getLabel}
              buttonActions={buttonActions}
            />
          ),
        }}
        slotProps={{
          loadingOverlay: {
            variant: 'linear-progress',
            noRowsVariant: 'linear-progress',
          },
        }}
        sx={{ '--DataGrid-overlayHeight': '18.75rem' }}
      />
    </ContainerTable>
  );
};

export default Table;

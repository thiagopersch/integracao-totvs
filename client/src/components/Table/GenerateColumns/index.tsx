import { Delete, Edit } from '@mui/icons-material';
import { GridColDef } from '@mui/x-data-grid';
import MenuActionsDataGrid from '../MenuActionsDataGrid';
import { ColumnDefinition } from '../types';

export const generateColumns = (
  columnDefs: ColumnDefinition[],
  actionHandlers: { [key: string]: (id: string) => void } = {}, // Recebe os manipuladores
): GridColDef[] => {
  const baseColumns = columnDefs.map((col) => {
    const baseCol: GridColDef = {
      field: col.field,
      headerName: col.headerName,
      width: col.width || 150,
      flex: col.flex || 1,
      editable: col.editable || false,
    };

    if (col.type === 'boolean') {
      baseCol.renderCell = (params: any) =>
        params.value ? (
          <span style={{ color: 'green' }}>Ativado</span>
        ) : (
          <span style={{ color: 'red' }}>Desativado</span>
        );
    }

    if (col.type === 'date' && col.valueFormatter) {
      baseCol.valueFormatter = ({ value }: { value: any }) =>
        col.valueFormatter!(value);
    }

    if (col.renderCell) {
      baseCol.renderCell = col.renderCell;
    }

    return baseCol;
  });

  if (Object.keys(actionHandlers).length > 0) {
    baseColumns.push({
      field: 'actions',
      headerName: 'Ações',
      width: 100,
      renderCell: (params: any) => (
        <MenuActionsDataGrid
          actions={[
            ...(actionHandlers['edit']
              ? [
                  {
                    label: 'Editar',
                    icon: <Edit />,
                    tooltip: 'Editar',
                    onClick: () => actionHandlers['edit'](params.row.id),
                  },
                ]
              : []),
            ...(actionHandlers['delete']
              ? [
                  {
                    label: 'Excluir',
                    icon: <Delete />,
                    tooltip: 'Excluir',
                    color: 'error.main',
                    onClick: () => actionHandlers['delete'](params.row.id),
                  },
                ]
              : []),
          ]}
        />
      ),
    });
  }

  return baseColumns;
};

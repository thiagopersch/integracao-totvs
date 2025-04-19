import { useEffect, useMemo, useState } from 'react';

type MenuAction = {
  label: string;
  icon?: React.ReactNode;
  tooltip?: string;
  onClick: (row: any) => void;
  color?: string;
};

export type ColumnDef<T> = {
  accessorKey: string;
  header: string;
  width?: string;
  cell?: (props: { row: { original: T } }) => React.ReactNode;
};

export type DynamicTableProps<T> = {
  columns: ColumnDef<T>[];
  rows: T[];
  className?: string;
  isLoading?: boolean;
  addAction?: () => void;
  actions?: MenuAction[];
};

export default function useTableHook({
  columns,
  rows,
}: DynamicTableProps<any>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  };

  // Filtra as linhas com base na busca global e nos filtros de coluna
  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch = searchTerm
        ? columns.some((col) => {
            const value = getNestedValue(row, col.accessorKey)
              ?.toString()
              .toLowerCase();
            return value?.includes(searchTerm.toLowerCase());
          })
        : true;

      const matchesFilters = Object.entries(filters).every(
        ([key, filterValue]) => {
          if (!filterValue) return true;
          const value = getNestedValue(row, key)?.toString().toLowerCase();
          return value?.includes(filterValue.toLowerCase());
        },
      );

      return matchesSearch && matchesFilters;
    });
  }, [rows, searchTerm, filters, columns]);

  // Calcula a paginação
  const totalRows = filteredRows.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredRows.slice(start, end);
  }, [filteredRows, page, rowsPerPage]);

  // Ajusta a página se ela ficar fora do intervalo válido
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    } else if (page < 1) {
      setPage(1);
    }
  }, [page, totalPages]);

  // Obtém valores únicos para uma coluna (para o diálogo de filtro)
  const getUniqueValues = (accessorKey: string) => {
    const values = new Set(
      rows.map((row) => getNestedValue(row, accessorKey)?.toString()),
    );
    return Array.from(values).filter(Boolean);
  };

  // Adiciona coluna de ações se prop actions for passada

  // Funções de navegação da paginação
  const goToFirstPage = () => setPage(1);
  const goToPreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const goToLastPage = () => setPage(totalPages);

  return {
    searchTerm,
    filteredRows,
    totalRows,
    totalPages,
    paginatedRows,
    filters,
    openFilter,
    page,
    rowsPerPage,
    setSearchTerm,
    setFilters,
    setOpenFilter,
    setPage,
    setRowsPerPage,
    getUniqueValues,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
    getNestedValue,
  };
}

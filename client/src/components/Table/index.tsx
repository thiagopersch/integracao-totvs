import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Search,
} from 'lucide-react';
import MenuActions from './MenuActions';
import useTableHook, { DynamicTableProps } from './useTableHook';

const DynamicTable = <T,>({
  columns,
  rows,
  className,
  isLoading,
  actions,
  addAction,
}: DynamicTableProps<T>) => {
  const {
    filters,
    searchTerm,
    openFilter,
    page,
    rowsPerPage,
    filteredRows,
    totalPages,
    paginatedRows,
    totalRows,
    getNestedValue,
    setSearchTerm,
    setFilters,
    setOpenFilter,
    setPage,
    setRowsPerPage,
    goToFirstPage,
    goToLastPage,
    goToPreviousPage,
    goToNextPage,
    getUniqueValues,
  } = useTableHook({ columns, rows });

  const tableColumns = actions
    ? [
        ...columns,
        {
          accessorKey: 'actions',
          header: '',
          width: 'auto',
          cell: ({ row }: { row: { original: T } }) => (
            <MenuActions
              actions={actions.map((action) => ({
                ...action,
                onClick: () => action.onClick(row.original),
              }))}
            />
          ),
        },
      ]
    : columns;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Input de busca */}
      <div className="flex items-center justify-between mt-4 md:flex-col md:gap-4 md:w-full">
        <div className="flex items-center gap-2 md:w-full">
          <Input
            placeholder="Pesquise aqui..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[20rem] md:w-full"
            icon={<Search className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
        {addAction && (
          <div className="flex items-center gap-2 md:w-full">
            <Button
              onClick={addAction}
              className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-white dark:hover:bg-neutral-300 dark:text-black"
            >
              Adicionar
            </Button>
          </div>
        )}
      </div>

      {/* Tabela */}
      <Table>
        <TableHeader>
          <TableRow>
            {tableColumns.map((column) => (
              <TableHead
                key={column.accessorKey}
                style={{ width: column.width }}
                className="relative group"
              >
                {column.header ? (
                  <div className="flex items-center w-full">
                    <span className="font-bold text-neutral-700 dark:text-white">
                      {column.header}
                    </span>
                    <Dialog
                      open={openFilter === column.accessorKey}
                      onOpenChange={(open) =>
                        setOpenFilter(open ? column.accessorKey : null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Filter className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Filtrar por {column.header}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <Input
                            placeholder={`Filtrar ${column.header}...`}
                            value={filters[column.accessorKey] || ''}
                            onChange={(e) =>
                              setFilters((prev) => ({
                                ...prev,
                                [column.accessorKey]: e.target.value,
                              }))
                            }
                          />
                          <div className="max-h-48 overflow-y-auto">
                            {getUniqueValues(column.accessorKey).map(
                              (value) => (
                                <div
                                  key={value}
                                  className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white cursor-pointer"
                                  onClick={() =>
                                    setFilters((prev) => ({
                                      ...prev,
                                      [column.accessorKey]: value,
                                    }))
                                  }
                                >
                                  <span>{value}</span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : (
                  column.header
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={tableColumns.length}
                className="text-center py-4 text-muted-foreground dark:text-neutral-50"
              >
                Carregando...
              </TableCell>
            </TableRow>
          ) : paginatedRows.length > 0 ? (
            paginatedRows.map((row, index) => (
              <TableRow
                key={(row as any).id || index}
                className="hover:bg-gray-100 dark:hover:bg-neutral-800"
              >
                {tableColumns.map((column) => (
                  <TableCell
                    key={column.accessorKey}
                    style={{ width: column.width }}
                  >
                    {column.cell
                      ? column.cell({ row: { original: row } })
                      : getNestedValue(row, column.accessorKey) || '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={tableColumns.length}
                className="text-center py-5 text-muted-foreground dark:text-neutral-50"
              >
                Nenhum dado encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Paginação */}
      {totalRows > 0 && (
        <div className="flex items-center justify-between py-4 md:flex-col">
          <div className="flex items-center gap-2 md:pb-4">
            <span className="text-sm text-muted-foreground">
              Mostrando {Math.min((page - 1) * rowsPerPage + 1, totalRows)}-
              {Math.min(page * rowsPerPage, totalRows)} de {totalRows}
            </span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => {
                setRowsPerPage(Number(value));
                setPage(1);
              }}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 25, 50].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToFirstPage}
              disabled={page === 1}
              aria-label="Ir para a primeira página"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousPage}
              disabled={page === 1}
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Página {page} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={page === totalPages || totalPages === 0}
              aria-label="Próxima página"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToLastPage}
              disabled={page === totalPages || totalPages === 0}
              aria-label="Ir para a última página"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;

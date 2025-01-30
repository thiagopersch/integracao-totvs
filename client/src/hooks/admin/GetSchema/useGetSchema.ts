import getSchema from '@/requests/queries/totvs/getSchema';
import { dataservers } from '@/utils/dataservers';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectChangeEvent } from '@mui/material';
import { GridColDef, useGridApiRef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

type Schema = z.infer<typeof schema> & {
  rows: any[];
};

export default function useGetSchema() {
  const apiRef = useGridApiRef();
  const [columns, setColumns] = useState<GridColDef[]>([
    { field: 'name', headerName: 'Nome do campo no DB', width: 150 },
    { field: 'caption', headerName: 'Nome do campo no TOTVS', width: 150 },
    { field: 'type', headerName: 'Tipo do campo', width: 150 },
    { field: 'default', headerName: 'Valor default', width: 150 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [primaryKeys, setPrimaryKeys] = useState<string>('');
  const [tables, setTables] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const {
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
    control,
    register,
    watch,
    setValue,
    handleSubmit,
  } = useForm<Schema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      dataServerName: '',
      username: '',
      password: '',
      tbc: '',
      contexto: 'CODCOLIGADA=1',
      rows: [],
    },
  });

  const rows = watch('rows');

  const handleExpandedTable = () => {
    apiRef.current.autosizeColumns({
      includeHeaders: true,
      includeOutliers: true,
      expand: true,
    });
  };

  useEffect(() => {
    handleExpandedTable;
  }, [handleExpandedTable]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const onSubmit = async (data: Schema) => {
    const { dataServerName, username, password, tbc, contexto } = data;
    const dataServerCode = dataServerName;

    try {
      const result = await getSchema(
        dataServerCode,
        username,
        password,
        tbc,
        contexto,
      );

      const { extractedData, primaryKeys } = result;

      setTables(extractedData);
      setPrimaryKeys(primaryKeys);

      if (extractedData.length > 0) {
        const firstTable = extractedData[0];
        const newRows = firstTable.fields.map((field: any, index: number) => ({
          id: index,
          name: field.name,
          caption: field.caption,
          type: field.type,
          default: field.default,
        }));

        setValue('rows', newRows);
        setSelectedTable(firstTable.tableName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTableChange = (event: SelectChangeEvent<string>) => {
    const tableName = event.target.value as string;
    const selectedTable = tables.find((table) => table.tableName === tableName);

    if (selectedTable) {
      const newRows = selectedTable.fields.map((field: any, index: number) => ({
        id: index,
        name: field.name,
        caption: field.caption,
        type: field.type,
        default: field.default,
      }));

      setValue('rows', newRows);
      setSelectedTable(tableName);
    }
  };

  const handleDataserverChange = (event: SelectChangeEvent<string>) => {
    const dataServerName = event.target.value as string;
    setValue('dataServerName', dataServerName);
  };

  const filteredOptions = dataservers.filter(
    (dataserver: any) =>
      dataserver?.name ||
      dataserver?.label ||
      dataserver?.code ||
      dataserver.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return {
    apiRef,
    columns,
    rows,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    filteredOptions,
    selectedTable,
    searchTerm,
    showPassword,
    primaryKeys,
    tables,
    control,
    errors,
    setSearchTerm,
    register,
    handleSubmit,
    watch,
    setValue,
    setShowPassword,
    handleExpandedTable,
    handleClickShowPassword,
    handleMouseDownPassword,
    onSubmit,
    handleTableChange,
    handleDataserverChange,
  };
}

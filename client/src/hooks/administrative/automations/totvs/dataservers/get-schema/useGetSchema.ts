import useCrud from '@/hooks/useCrud';
import { findAll } from '@/lib/api/registers/tbc';
import getSchema from '@/lib/api/totvs/getSchema';
import { TBC } from '@/types/tbc';
import { dataservers } from '@/utils/dataservers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

type Schema = z.infer<typeof schema> & {
  rows?: Array<{
    name: string;
    caption: string;
    type: string;
    default: string;
  }>;
};

export default function useGetSchema() {
  const [searchTerm, setSearchTerm] = useState('');
  const [primaryKeys, setPrimaryKeys] = useState<string>('');
  const [tables, setTables] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const form = useForm<Schema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      contexto: 'CODCOLIGADA=1',
      dataServerName: '',
      tbcId: '',
    },
  });

  const { items: tbcOptions, isLoading: isLoadingTbc } = useCrud<TBC, TBC, TBC>(
    {
      queryKey: ['listTbc'],
      listFn: async () => {
        const tbcs = await findAll();
        return tbcs.filter((tbc) => tbc.status); // Filter for active TBCs
      },
      getFn: async (id: string) => {
        throw new Error('Not implemented');
      },
      createFn: async (data: TBC) => {
        throw new Error('Not implemented');
      },
      updateFn: async (id: string, data: TBC) => {
        throw new Error('Not implemented');
      },
      deleteFn: async (id: string) => {
        throw new Error('Not implemented');
      },
      deleteConfirmation: {
        title: '',
        message: '',
      },
      queryOptions: {
        enabled: true,
        staleTime: 5 * 60 * 1000, // 5 minutes cache
      },
    },
  );

  const rows = form.watch('rows');

  const onSubmit = async (data: Schema) => {
    const { dataServerName, tbcId, contexto } = data;
    const dataServerCode = dataServerName;

    try {
      const result = await getSchema(dataServerCode, tbcId, contexto);

      const { extractedData, primaryKeys } = result.data;

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

        form.setValue('rows', newRows);
        setSelectedTable(firstTable.tableName);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTableChange = (tableName: string) => {
    const selectedTable = tables.find((table) => table.tableName === tableName);

    if (selectedTable) {
      const newRows = selectedTable.fields.map((field: any, index: number) => ({
        id: index,
        name: field.name,
        caption: field.caption,
        type: field.type,
        default: field.default,
      }));

      form.setValue('rows', newRows);
      setSelectedTable(tableName);
    }
  };

  const filteredOptions = dataservers.filter(
    (dataserver: any) =>
      dataserver?.name ||
      dataserver?.label ||
      dataserver?.code ||
      dataserver.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return {
    rows,
    filteredOptions,
    selectedTable,
    searchTerm,
    primaryKeys,
    tables,
    tbcOptions,
    isLoadingTbc,
    form,
    setSearchTerm,
    onSubmit,
    handleTableChange,
  };
}

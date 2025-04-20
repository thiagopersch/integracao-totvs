'use client';

import Column from '@/components/Columns';
import CTA from '@/components/CTA';
import DynamicTable from '@/components/Table';
import Text from '@/components/Text';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Wrapper from '@/components/Wrapper';
import useGetSchema from '@/hooks/administrative/automations/totvs/dataservers/get-schema/useGetSchema';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { useState } from 'react';

export default function GetSchemaPage() {
  const {
    filteredOptions,
    tables,
    primaryKeys,
    selectedTable,
    handleTableChange,
    onSubmit,
    tbcOptions,
    form,
    isLoadingTbc,
    rows,
  } = useGetSchema();

  const [open, setOpen] = useState(false);

  const columns = [
    { accessorKey: 'name', header: 'Nome do campo no DB', width: 'auto' },
    { accessorKey: 'caption', header: 'Nome do campo no TOTVS', width: 'auto' },
    { accessorKey: 'type', header: 'Tipo do campo', width: 'auto' },
    { accessorKey: 'default', header: 'Valor default', width: 'auto' },
  ];

  return (
    <Wrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Column cols={3}>
            <FormField
              control={form.control}
              name="dataServerName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Dataserver</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'h-[3rem] w-full justify-between',
                            !field.value && 'text-muted-foreground',
                            fieldState.error &&
                              'border-red-500 dark:border-red-400',
                          )}
                        >
                          {field.value
                            ? filteredOptions.find(
                                (option) => option.code === field.value,
                              )?.name
                            : 'Selecione um dataserver'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 dark:opacity-100" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Pesquisar..." />
                        <CommandList>
                          <CommandEmpty className="text-center p-10 text-sm text-muted-foreground font-normal">
                            Nenhum resultado encontrado.
                          </CommandEmpty>
                          <CommandGroup className="w-full">
                            {filteredOptions.map((option) => (
                              <CommandItem
                                key={option.code}
                                value={option.name}
                                onSelect={() => {
                                  field.onChange(option.code);
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'h-4 w-4',
                                    field.value === option.code
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {option.code} - {option.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tbcId"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>TBC</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={form.formState.isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger error={!!fieldState.error}>
                        <SelectValue placeholder="Selecione um TBC" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tbcOptions.map((tbc) => (
                        <SelectItem key={tbc.id} value={tbc.id ?? ''}>
                          {tbc.name} - {tbc.client?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contexto"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Contexto</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      error={!!fieldState.error}
                      placeholder="Contexto"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Column>

          <CTA className="mt-4">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="mx-auto"
              variant="default"
              size="lg"
            >
              <Search className="mr-2 h-4 w-4" />
              Consultar
            </Button>
          </CTA>
        </form>
      </Form>

      {tables.length > 0 && form.formState.isSubmitted && (
        <div className="mt-8">
          <div className="flex flex-row items-center md:flex-col md:justify-center md:text-center gap-4 mb-4">
            <Select value={selectedTable} onValueChange={handleTableChange}>
              <SelectTrigger className="w-[30dvw] md:w-full">
                <SelectValue placeholder="Selecione a tabela" />
              </SelectTrigger>
              <SelectContent>
                {tables.map((table) => (
                  <SelectItem key={table.tableName} value={table.tableName}>
                    {table.tableName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div>
              <Text className="font-semibold">Chaves Primárias: </Text>
              <Text className="text-muted-foreground">{primaryKeys}</Text>
            </div>
          </div>
          <DynamicTable
            columns={columns}
            rows={rows ?? []}
            isLoading={form.formState.isSubmitting}
          />
        </div>
      )}
    </Wrapper>
  );
}

'use client';

import Column from '@/components/Columns';
import CTA from '@/components/CTA';
import DynamicTable from '@/components/Table';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Wrapper from '@/components/Wrapper';
import { useReadView } from '@/hooks/administrative/automations/dataservers/read-view/useReadView';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { Clipboard, Search } from 'lucide-react';
import { useRef, useState } from 'react';

const ReadViewPage = () => {
  const {
    handleClickShowPassword,
    handleMouseDownPassword,
    handleReadView,
    rows,
    form,
  } = useReadView();

  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const columns = [
    { accessorKey: 'id', header: 'ID', width: 'auto' },
    { accessorKey: 'APLICACAO', header: 'Sistema', width: 'auto' },
    { accessorKey: 'NOMESISTEMA', header: 'Nome do sistema', width: 'auto' },
    { accessorKey: 'CODCOLIGADA', header: 'Coligada', width: 'auto' },
    { accessorKey: 'NOMEFANTASIA', header: 'Nome da coligada', width: 'auto' },
    { accessorKey: 'CODSENTENCA', header: 'Código', width: 'auto' },
    { accessorKey: 'TITULO', header: 'Nome da sentença', width: 'auto' },
    {
      accessorKey: 'SENTENCA',
      header: 'SQL',
      width: 'auto',
      cell: ({ row }: { row: any }) => {
        const sentenca = row.original?.SENTENCA || '';
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => sentenca && navigator.clipboard.writeText(sentenca)}
            title={sentenca || 'Nenhum SQL disponível'}
            disabled={!sentenca}
          >
            <Clipboard className="h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'DTULTALTERACAO',
      header: 'Data Última Alteração',
      width: 'auto',
    },
    {
      accessorKey: 'USRULTALTERACAO',
      header: 'Usuário Última Alteração',
      width: 'auto',
    },
  ];

  return (
    <Wrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleReadView)}>
          <Column cols={3}>
            <FormField
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder="Digite o usuário"
                      error={fieldState.error?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        disabled={form.formState.isSubmitting}
                        error={fieldState.error?.message}
                        placeholder="Digite a senha"
                        ref={passwordInputRef}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => {
                          handleClickShowPassword(passwordInputRef);
                          setShowPassword(!showPassword);
                        }}
                        onMouseDown={(event) => handleMouseDownPassword(event)}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon className="h-4 w-4" />
                        ) : (
                          <VisibilityIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tbc"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>TBC</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      placeholder="Digite o TBC"
                      error={fieldState.error?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Column>

          <Column cols={2}>
            <FormField
              control={form.control}
              name="filtro"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Filtro</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      error={fieldState.error?.message}
                      placeholder="Digite o filtro"
                      required
                    />
                  </FormControl>
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
                      error={fieldState.error?.message}
                      placeholder="Digite o contexto"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Column>
          <CTA>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="mx-auto mt-4"
              variant="default"
              size="lg"
            >
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Button>
          </CTA>
        </form>
      </Form>

      {rows && form.formState.isSubmitSuccessful && (
        <div className="mt-6">
          <DynamicTable
            columns={columns}
            rows={rows}
            isLoading={form.formState.isLoading}
          />
        </div>
      )}
    </Wrapper>
  );
};

export default ReadViewPage;

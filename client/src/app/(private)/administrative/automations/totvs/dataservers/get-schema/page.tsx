'use client';

import * as S from '@/app/(private)/administrative/styles';
import useGetSchema from '@/hooks/administrative/automations/totvs/dataservers/get-schema/useGetSchema';
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';

const GetSchemaPage = () => {
  const {
    apiRef,
    columns,
    control,
    errors,
    filteredOptions,
    tables,
    isSubmitted,
    isSubmitting,
    primaryKeys,
    rows,
    selectedTable,
    showPassword,
    handleClickShowPassword,
    handleExpandedTable,
    handleMouseDownPassword,
    handleSubmit,
    handleTableChange,
    onSubmit,
    register,
    setSearchTerm,
  } = useGetSchema();

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.InputSentences>
          <Controller
            name="dataServerName"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth required variant="filled">
                <Autocomplete
                  id="dataServerName"
                  disablePortal
                  options={filteredOptions.map((option, index) => ({
                    ...option,
                    key: option.code || `option-${index}`,
                  }))}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.code === value.code
                  }
                  value={
                    filteredOptions.find(
                      (option) => option.code === field.value,
                    ) || null
                  }
                  onChange={(_event, newValue) => {
                    if (newValue) {
                      field.onChange(newValue.code);
                      setSearchTerm(newValue.name);
                    } else {
                      field.onChange('');
                    }
                  }}
                  onInputChange={(_event, newInputValue) =>
                    setSearchTerm(newInputValue)
                  }
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      {...props}
                      sx={{
                        display: 'flex',
                        flexDirection: {
                          xs: 'column',
                          sm: 'row',
                        },
                        justifyContent: {
                          xs: 'center !important',
                          sm: 'normal !important',
                        },
                        alignItems: 'normal !important',
                      }}
                    >
                      <Typography color="inherit" sx={{ fontWeight: 'bold' }}>
                        {option.label}
                      </Typography>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Dataserver"
                      variant="filled"
                      error={errors.dataServerName !== undefined}
                      helperText={errors.dataServerName?.message}
                      required
                      disabled={isSubmitting}
                    />
                  )}
                />
              </FormControl>
            )}
          />
          <TextField
            type="text"
            id="contexto"
            label="Contexto"
            variant="filled"
            {...register('contexto')}
            disabled={isSubmitting}
            helperText={errors.contexto?.message}
            error={errors.contexto !== undefined}
            required
            fullWidth
          />
        </S.InputSentences>
        <S.InputSentences>
          <TextField
            type="text"
            id="username"
            label="Usuário"
            variant="filled"
            {...register('username')}
            disabled={isSubmitting}
            helperText={errors.username?.message}
            error={errors.username !== undefined}
            required
            fullWidth
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            id="password"
            label="Senha"
            variant="filled"
            {...register('password')}
            disabled={isSubmitting}
            helperText={errors.password?.message}
            error={errors.password !== undefined}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
            fullWidth
          />
          <TextField
            type="text"
            id="tbc"
            label="TBC"
            variant="filled"
            disabled={isSubmitting}
            helperText={errors.tbc?.message}
            error={errors.tbc !== undefined}
            {...register('tbc')}
            required
            fullWidth
          />
        </S.InputSentences>
        <S.Actions>
          <S.CTA
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
            startIcon={<SearchIcon />}
          >
            Buscar
          </S.CTA>
        </S.Actions>
      </S.Form>
      {tables.length > 0 && isSubmitted && (
        <>
          <Box
            sx={{
              my: '2rem',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              gap: '1rem',
            }}
          >
            <FormControl variant="filled" sx={{ width: '30rem' }}>
              <InputLabel id="table-select-label">Tabela(s)</InputLabel>
              <Select
                labelId="table-select-label"
                value={selectedTable}
                onChange={handleTableChange}
                label="Tabela(s)"
              >
                {tables.map((table) => (
                  <MenuItem key={table.tableName} value={table.tableName}>
                    {table.tableName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography
              variant="button"
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              Chaves primárias do dataserver:{' '}
              <Typography
                variant="caption"
                color="primary.dark"
                sx={{ fontWeight: 'bold' }}
              >
                {primaryKeys}
              </Typography>
            </Typography>
          </Box>
          {/* <Table
            rows={rows}
            columns={columns}
            isLoading={isSubmitting}
            apiRef={apiRef}
            onClick={handleExpandedTable}
            density="compact"
            autoHeight
            sortingField="name"
            label="Ajustar colunas"
            icon={<TuneIcon />}
          /> */}
        </>
      )}
    </S.Wrapper>
  );
};

export default GetSchemaPage;

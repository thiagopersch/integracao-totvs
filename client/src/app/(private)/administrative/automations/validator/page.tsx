'use client';

import Loading from '@/app/loading';
import { Editor } from '@monaco-editor/react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { JSHINT } from 'jshint';
import { useState } from 'react';

export default function CodeValidator() {
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState<any[]>([]);

  const validateCode = () => {
    try {
      JSHINT(code, {
        esversion: 6, // Habilita suporte a ES6
        unused: true, // Verifica variáveis não utilizadas
        eqeqeq: true, // Exige o uso de === e !==
        curly: true, // Exige chaves {} em estruturas de controle
        undef: true, // Verifica variáveis não definidas
        browser: true, // Define variáveis globais do navegador (como 'document')
      });

      if (JSHINT.errors.length > 0) {
        setErrors(JSHINT.errors.filter((err: any) => err !== null));
      } else {
        setErrors([]);
      }
    } catch (error) {
      setErrors([
        {
          message: 'Erro de sintaxe no código.',
          column: 0,
          line: 0,
          reason: 'Erro de sintaxe no código.',
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col items-center w-screen p-10">
      <Typography
        variant="h5"
        component={'span'}
        className="text-2xl font-semibold"
        gutterBottom
      >
        Validador de Código JavaScript
      </Typography>
      <Card className="w-full p-4 mb-8" variant="outlined">
        <CardContent className="space-y-4">
          <Editor
            height="55dvh"
            language="javascript"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code ?? ''}
            loading={<Loading />}
            onChange={(value: string | undefined) => setCode(value ?? '')}
            options={{
              automaticLayout: true,
              formatOnType: true,
              formatOnPaste: true,
              wordWrap: 'on',
              wrappingIndent: 'indent',
            }}
          />
          <Box className="p-4 flex justify-center items-center">
            <Button variant="contained" color="primary" onClick={validateCode}>
              Validar Código
            </Button>
          </Box>
        </CardContent>
      </Card>
      <div className="w-full max-w-2xl">
        {errors.length === 0 ? (
          <Alert severity="success" className="flex items-center p-4">
            Nenhum erro encontrado!
          </Alert>
        ) : (
          errors.map((err, index) => (
            <Alert
              key={index}
              severity="error"
              className="flex items-center p-4 mt-2"
            >
              {err.reason}
            </Alert>
          ))
        )}
      </div>
    </div>
  );
}

'use client';

import Loading from '@/app/loading';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Editor } from '@monaco-editor/react';
import { JSHINT } from 'jshint';
import { useState } from 'react';

export default function CodeValidator() {
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState<any[]>([]);

  const validateCode = () => {
    try {
      JSHINT(code, {
        esversion: 6,
        unused: true,
        eqeqeq: true,
        curly: true,
        undef: true,
        browser: true,
      });

      setErrors(JSHINT.errors.filter((err: any) => err !== null));
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
    <div className="flex flex-col items-center w-full p-10">
      <h1 className="text-2xl font-semibold mb-8">
        Validador de Código JavaScript
      </h1>
      <Card className="w-full mb-8">
        <CardContent className="space-y-4 pt-6">
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
          <div className="flex justify-center items-center">
            <Button onClick={validateCode}>Validar Código</Button>
          </div>
        </CardContent>
      </Card>
      <div className="w-full max-w-2xl">
        {errors.length === 0 ? (
          <Alert variant="success">
            <AlertDescription>Nenhum erro encontrado!</AlertDescription>
          </Alert>
        ) : (
          errors.map((err, index) => (
            <Alert key={index} variant="destructive" className="mt-2">
              <AlertDescription>{err.reason}</AlertDescription>
            </Alert>
          ))
        )}
      </div>
    </div>
  );
}

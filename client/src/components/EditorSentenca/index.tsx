import Loading from '@/app/loading';
import { Editor, EditorProps } from '@monaco-editor/react';

type EditorSentencaProps = {
  value: string | undefined;
  language?: string;
  height?: string;
  onChange?: (value: string) => void;
} & EditorProps;

const EditorSentenca = ({
  value,
  onChange,
  language = 'sql',
  height = '55vh',
  ...props
}: EditorSentencaProps) => {
  return (
    <Editor
      height={height}
      language={language}
      defaultLanguage={language}
      theme="vs-dark"
      loading={<Loading />}
      value={value}
      {...props}
      options={{
        readOnly: true,
        minimap: { enabled: true },
        fontSize: 14,
        fontFamily: 'JetBrains Mono, monospace',
        fontWeight: '700',
        fontLigatures: true,
        lineHeight: 22,
        tabSize: 2,
        formatOnPaste: true,
        formatOnType: true,
        autoIndent: 'full',
        autoClosingBrackets: 'languageDefined',
        autoClosingQuotes: 'languageDefined',
        autoClosingOvertype: 'auto',
        autoSurround: 'languageDefined',
        autoClosingDelete: 'auto',
        acceptSuggestionOnEnter: 'smart',
        acceptSuggestionOnCommitCharacter: true,
        suggestOnTriggerCharacters: true,
        suggestSelection: 'first',
        quickSuggestions: { other: true, comments: true, strings: true },
        quickSuggestionsDelay: 10,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        wrappingStrategy: 'advanced',
        wrappingIndent: 'indent',
      }}
    />
  );
};
export default EditorSentenca;

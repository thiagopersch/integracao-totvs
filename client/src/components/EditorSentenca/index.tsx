import { Editor, EditorProps } from '@monaco-editor/react';

type EditorSentencaProps = {
  value: string;
  onChange?: (value: string) => void;
} & EditorProps;

const EditorSentenca = ({ value, onChange }: EditorSentencaProps) => {
  return (
    <Editor
      width="100%"
      height="50dvh"
      language="sql"
      theme="vs-dark"
      value={value}
      onChange={onChange}
      options={{
        automaticLayout: true,
        formatOnType: true,
        formatOnPaste: true,
        wrappingIndent: 'indent',
      }}
    />
  );
};
export default EditorSentenca;

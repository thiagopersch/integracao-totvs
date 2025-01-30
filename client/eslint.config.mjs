import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    env: {
      browser: true,
      node: true,
      es2021: true, // Adicionado para suporte a ES2021
    },
    parser: "@typescript-eslint/parser",
    root: true,
    extends: [
      "next",
      "next/core-web-vitals",
      "plugin:storybook/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
      "plugin:react/recommended", // Adicionado para melhores práticas com React
    ],
    settings: {
      babel: {
        rootMode: "upward",
      },
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {}, // Adicionado para melhor resolução de imports TypeScript
      },
    },
    rules: {
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Adicionado para evitar warnings de variáveis não utilizadas
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@mui/*/*/*"],
        },
      ],
      "prefer-arrow-callback": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false, // Alterado para false para garantir ordenação de membros
          memberSyntaxSortOrder: ["single", "all", "multiple", "none"],
          allowSeparatedGroups: true,
        },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/**", // Adicionado para tratar imports internos
              group: "internal",
            },
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "react/prop-types": "off", // Desativado pois TypeScript já faz essa verificação
      "react/react-in-jsx-scope": "off", // Desativado pois não é necessário a partir do React 17
      "react/jsx-uses-react": "off", // Desativado pois não é necessário a partir do React 17
    },
  },
];

export default eslintConfig;

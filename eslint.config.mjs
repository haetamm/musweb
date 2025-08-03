import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import prettier from "eslint-plugin-prettier"
import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  ...compat.extends("next", "next/core-web-vitals", "prettier"),
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
    },
    plugins: {
      prettier,
      react,
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: "es5",
          endOfLine: "lf",
        },
      ],
      "react/prop-types": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "no-console": "off",
      "react-hooks/exhaustive-deps": "warn",
      'react-hooks/exhaustive-deps': 'off',
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default config;
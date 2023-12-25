/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: 'lf',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^types$',
    '^@/app/types/(.*)$',
    '^@/app/config/(.*)$',
    '^@/app/lib/(.*)$',
    '^@/app/hooks/(.*)$',
    '',
    '^@/app/components/ui/(.*)$',
    '^@/app/components/(.*)$',
    '^@/app/styles/(.*)$',
    '',
    '^@/app/pages/(.*)$',
    '',
    '^[./]',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  tailwindAttributes: ['tw'],
  tailwindFunctions: ['cva'],
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};

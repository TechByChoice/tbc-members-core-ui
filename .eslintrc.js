/** @type {import('eslint').Linter.Config } */
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
    env: {
        browser: true,
        commonjs: true,
        jest: false,
        node: true,
    },
    settings: {},
    overrides: [
        { files: '*.d.ts', rules: { strict: [ 'error', 'never' ] } },
        {
            files: [ '.eslintrc.js', 'jest.config.js', 'vite.config.mjs' ],
            rules: {
                'sort-keys': 'off',
                'array-bracket-newline': 'off',
                'array-element-newline': 'off',
                'object-curly-newline': 'off',
            },
        },
    ],
    plugins: [],
    extends: [ 'eslint:recommended', 'plugin:react/recommended' ],
    rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'react/prop-types': 'off',
        'newline-per-chained-call': [ 'warn', { ignoreChainWithDepth: 2 }],
        'array-bracket-newline': [ 'warn', { multiline: true, minItems: 4 }],
        'array-bracket-spacing': [ 'warn', 'always', { objectsInArrays: false }],
        'array-element-newline': [ 'warn', { multiline: true, minItems: 3 }],
        'eqeqeq': [ 'error', 'smart' ],
        'indent': [ 'warn', 4, { SwitchCase: 1 }],
        'no-eval': 'error',
        'no-var': 'error',
        'no-unused-vars': 'off',
        'no-empty-pattern': 'off',
        'object-curly-newline': [
            'warn',
            { ObjectExpression: { multiline: true, minProperties: 4 }, ObjectPattern: { multiline: true, minProperties: 4 }, ImportDeclaration: 'never' },
        ],
        'sort-keys': 'off',
    },
};

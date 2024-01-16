import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        react({ include: [ '**/*.jsx', '**/*.tsx' ] }),
    ],
    resolve: { alias: { '@': resolve('.', '/src') } },
    server: {
        port: 3000,
        watch: {
            ignored: [
                './node_modules/**',
                '.git/**',
                '**/vendor/**',
            ],
            usePolling: true,
        },
    },
    build: {
        target: 'esnext',
        outDir: 'dist',
        include: [
            './src/**/*.jsx',
            './src/**/*.js',
            './src/**/*.tsx',
            './src/**/*.ts',
            './src/index.css',
            './index.html'
        ],
        rollupOptions: {
            external: [],
            treeshake: 'recommended',
            input: {
                main: resolve('.', '/index.html'),
            },
        },
    },
});

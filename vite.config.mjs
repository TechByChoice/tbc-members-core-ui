import react from '@vitejs/plugin-react';
import {resolve} from 'node:path';
import {defineConfig} from 'vite';
import federation from "@originjs/vite-plugin-federation";

// Check if the current mode is production
const isProd = process.env.NODE_ENV === 'production';
export default defineConfig({
    plugins: [
        react({include: ['**/*.jsx', '**/*.tsx']}),
        federation({
            name: 'hostApp',
            filename: 'remoteEntry.js',
            remotes: {
                open_doors: isProd ? 'https://opendoors.techbychoice.org/assets/remoteEntry.js' : 'http://localhost:4000/dist/assets/remoteEntry.js',
                talent_choice: isProd ? 'https://talentchoice.techbychoice.org/assets/remoteEntry.js' : 'http://localhost:3000/dist/assets/remoteEntry.js'
            },
            shared: ['react', 'react-dom', 'react-router-dom'],
        }),
    ],
    resolve: {alias: {'@': resolve('.', '/src')}},
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
        // modulePreload: false,
        // minify: false,
        // cssCodeSplit: false,
        // sourcemap: true,
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

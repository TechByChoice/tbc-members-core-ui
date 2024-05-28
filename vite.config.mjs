import react from '@vitejs/plugin-react';
import {resolve} from 'node:path';
import {defineConfig} from 'vite';
import federation from "@originjs/vite-plugin-federation";

// Ensure federation settings and dynamic loading are set up in a browser-compatible way
const getFederationPlugin = () => {
    const isProd = process.env.NODE_ENV === 'production';

    const loadRemoteEntry = (url) => {
        return new Promise((resolve, reject) => {
            if (typeof document === 'undefined') {
                reject(new Error('Cannot load remote entries server-side'));
                return;
            }

            const script = document.createElement('script');
            script.src = url;
            script.type = 'module';
            script.crossOrigin = 'use-credentials';
            script.onload = () => resolve(url);
            script.onerror = () => reject(new Error('Failed to load ' + url));
            document.head.appendChild(script);
        });
    };

    return federation({
        name: 'hostApp',
        filename: 'remoteEntry.js',
        remotes: {
            open_doors: isProd ? new Promise(resolve => loadRemoteEntry('https://opendoors.techbychoice.org/assets/remoteEntry.js').then(resolve)) : 'http://localhost:4000/dist/assets/remoteEntry.js',
            talent_choice: isProd ? new Promise(resolve => loadRemoteEntry('https://talentchoice.techbychoice.org/assets/remoteEntry.js').then(resolve)) : 'http://localhost:3000/dist/assets/remoteEntry.js'
        },
        shared: ['react', 'react-dom', 'react-router-dom'],
    });
};

export default defineConfig({
    plugins: [
        react({include: ['**/*.jsx', '**/*.tsx']}),
        getFederationPlugin(),
    ],
    resolve: {
        alias: {
            '@': resolve('.', '/src'),
        }
    },
    server: {
        port: 3000,
        watch: {
            ignored: ['./node_modules/**', '.git/**', '**/vendor/**'],
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
            input: {main: resolve('.', '/index.html')},
        },
    },
});

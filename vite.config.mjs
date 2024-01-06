import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
// import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
    plugins: [
        react({ include: [ '**/*.jsx' ] }),
        /*
        federation({
            name: 'remote-app', // name of the fed group...
            filename: 'remoteEntry.js', // default file name
            // Modules to expose
            exposes: {'./Button': './src/components/Button.jsx',},
            shared: ['react','react-dom'] // libs/deps to be shared
        })
        */
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

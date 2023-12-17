import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { resolve } from 'node:path';

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
    resolve: {alias: {'@': resolve('.', '/src'),},},
    server: {
        watch: {
            ignored: [
                '**/vendor/**',
                './public/**',
                './app/**',
                './storage/**',
                '.git/**',
                './node_modules/**'
            ],
            usePolling: true,
        },
        proxy: { '/app': 'http://localhost' },
    },
    build: {
        target: 'esnext',
        outDir: '..dist',
        include: [
            './src/**/*.jsx',
            './src/**/*.js',
            './src/index.css',
            './src/index.html'
        ],
        output: {
            // format: 'umd',
            // name: 'MyLibrary',
            // globals: {
            //     react: 'React',
            //     'react-dom': 'ReactDOM',
            //     preact: 'preact',
            //     alpinejs: 'alpinejs',
            // },
        },

        rollupOptions: {
            external: [], //'react', 'react-dom', 'preact', 'alpinejs'],
            treeshake: 'recommended',
            input: {
                main: resolve('.', '/src/index.html'),
                // './src/index.css',
                // './src/index.html',
            },
            // output: {
            // format: 'iife',
            // esModule: false,
            // },
        },
    },
});

const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const Dotenv = require('dotenv-webpack');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const path = require('path');

const deps = require('./package.json').dependencies;
module.exports = (_, argv) => {
    const isEnvDevelopment = argv.mode === 'development';
    const isEnvProduction = argv.mode === 'production';

    // common function to get style loaders
    const getStyleLoaders = (cssOptions, preProcessor) => {};
    // style files regexes
    const cssRegex = /\.css$/;
    const cssModuleRegex = /\.module\.css$/;
    const sassRegex = /\.(scss|sass)$/;
    const sassModuleRegex = /\.module\.(scss|sass)$/;

    return {
        // const envFile = argv.mode === 'development' ? '.env.development' : '.env.production';
        output: {
            publicPath: isEnvDevelopment ? 'http://localhost:3000/' : '/', // Use a different public path in production if needed
            // path: path.resolve(__dirname, 'dist'), // Ensure output directory is set, especially for production
            filename: '[name].[contenthash].js', // Use content hashing for better caching
            clean: true, // Clean the output directory before each build
        },

        resolve: {
            alias: {
                parchment: path.resolve(__dirname, 'node_modules/parchment/src/parchment.ts'),
                // 'quill$': path.resolve(__dirname, 'node_modules/quill/quill.js'),
            },
            extensions: [
                '.tsx',
                '.ts',
                '.jsx',
                '.js',
                '.json',
                '.svg'
            ],
        },

        devServer: {
            port: 3000,
            historyApiFallback: true,
        },

        module: {
            rules: [
                {
                    test: /\.m?js/,
                    type: 'javascript/auto',
                    resolve: {fullySpecified: false,},
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {name: '[path][name].[ext]',},
                        },
                    ],
                },
                {
                    test: /\.(css|s[ac]ss)$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader' 
                    ],
                },
                // "postcss" loader applies autoprefixer to our CSS.
                // "css" loader resolves paths in CSS and adds assets as dependencies.
                // "style" loader turns CSS into JS modules that inject <style> tags.
                // In production, we use MiniCSSExtractPlugin to extract that CSS
                // to a file, but in development "style" loader enables hot editing
                // of CSS.
                // By default we support CSS Modules with the extension .module.css
                {
                    test: cssRegex,
                    // exclude: cssModuleRegex,
                    // exclude: [ /node_modules(?!\/quill)/ ],
                    use: getStyleLoaders({
                        importLoaders: 1,
                        sourceMap: isEnvProduction ? isEnvDevelopment : isEnvDevelopment,
                        modules: {mode: 'icss',},
                    }),
                    // Don't consider CSS imports dead code even if the
                    // containing package claims to have no side effects.
                    // Remove this when webpack adds a warning or an error for this.
                    // See https://github.com/webpack/webpack/issues/6571
                    sideEffects: true,
                },
                // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
                // using the extension .module.css
                {
                    test: cssModuleRegex,
                    use: getStyleLoaders({
                        importLoaders: 1,
                        sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
                        modules: {
                            mode: 'local',
                            getLocalIdent: getCSSModuleLocalIdent,
                        },
                    }),
                },
                {
                    test: /\.(ts|tsx|js|jsx)$/,
                    exclude: [ /node_modules/ ],
                    // exclude: [/node_modules(?!\/quill)/],
                    use: {
                        loader: 'babel-loader',
                        options: {presets: [ '@babel/preset-env', '@babel/preset-react' ],},
                    },
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {minimize: true,},
                        },
                    ],
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                },
            ],
        },

        plugins: [
            new ModuleFederationPlugin({
                name: 'host',
                filename: 'remoteEntry.js',
                remotes: {open_doors: 'open_doors@http://localhost:8080/remoteEntry.js',},
                exposes: {},
                shared: {
                    ...deps,
                    react: {
                        singleton: true,
                        requiredVersion: deps.react,
                    },
                    'react-dom': {
                        singleton: true,
                        requiredVersion: deps['react-dom'],
                    },
                },
            }),
            new HtmlWebPackPlugin({template: './src/index.html',}),
            new Dotenv({path: '.env',}),
        ],
        devtool: isEnvDevelopment ? 'eval-source-map' : 'none',
    };
};

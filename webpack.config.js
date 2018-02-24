// This config merges common and environment depending configurations
const webpack = require('webpack');
const path = require('path');
const Merge = require('webpack-merge');
const {CheckerPlugin} = require('awesome-typescript-loader');
const OfflinePlugin = require('offline-plugin');

// Configuration shared by production and developement
const commonConfig = {
    output: {
        publicPath: '/',
        path: path.resolve('dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        modules: ['src', 'node_modules'],
        symlinks: false,
    },
    module: {
        loaders: [
            // Transpile TypeScript and new javascript syntax into older
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                include: path.resolve('src')
            },

            // Load styles
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
				include: path.resolve('src')
            },
            {
                test: /\.scss$/,
                loaders: ['css-loader', 'sass-loader'],
				include: path.resolve('src')
            },

            // Load fonts
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff",
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff",
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream",
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml",
            },

        ]
    },
    plugins: [
        new CheckerPlugin(),

        // Ensure module names stay the same
        new webpack.HashedModuleIdsPlugin(),

        // Chunk with all node_moduels dependencies
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
            minChunks: function(module){
                return module.context && module.context.includes("node_modules");
            }
        }),

        // Chunk with webpack runtime (ensure hashes stay the same)
        new webpack.optimize.CommonsChunkPlugin({
            name: ['manifest'],
            minChunks: Infinity
        }),
    ]
};

module.exports = function (env) {
    // Get environment specific config
    let environmentConfig = {};
    if(env && env.target === 'production') {
        environmentConfig = require('./webpack.production.js');
    } else {
        environmentConfig = require('./webpack.development.js');
    }

    if(typeof environmentConfig === 'function') {
        environmentConfig = environmentConfig(env)
    }

    // Merge and return
    const merged = Merge(commonConfig, environmentConfig);
    merged.plugins.push(
        // ServiceWorker and AppCache for offline use (should be last...)
        new OfflinePlugin({
            responseStrategy: 'cache-first',
            appShell: '/',
            updateStrategy: 'changed',
            autoUpdate: 1000 * 60 * 5,
            safeToUseOptionalCaches: true,
            caches: {
                main: [':rest:'],
                additional: [],
                optional: [':externals:'],
            },
            externals: ['**/wp-content/**'],
            excludes: [
                '**/.*',
                '**/*.map',
                '**/*.gz',
                '**/wp-json/**',
                '**/sw.js'
            ],
            ServiceWorker: {
                events: true,
            }
        })
    );
    return merged;
};

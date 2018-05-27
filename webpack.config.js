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
                test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
                loader: 'file-loader',
                query: {
                    name: 'fonts/[name].[ext]?[sha512:hash:base36:10]'
                }
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
                // Entries are resolved as globs against all webpack assets
                main: [':rest:'],
                additional: [],
                optional: [
                    // Only cache the file types the browser loads
                    'fonts/**',
                    // Wordpress images
                    /https:\/\/.*?\/wp-content\/uploads\/.*/,
                ],
            },
            excludes: [
                '**/.*',
                '**/*.map',
                '**/*.gz',
                '**/wp-json/**',
                '**/sw.js',
                '**/subdomains/**',
            ],
            ServiceWorker: {
                events: true,
                navigationPreload: {
                    test: (url) => {
                        if(url.hostname !== 'go-craft.com') {
                            console.log('SW: not caching because of hostname:', url);
                            return false;
                        }
                        if(url.pathname && url.pathname.indexOf('/subdomains') === 0 && url.pathname.indexOf('/subdomains/wordpress/wp-content') !== 0) {
                            console.log('SW: not caching because it is a subdomain:', url);
                            return false;
                        }
                        return true;
                    }
                }
            }
        })
    );
    return merged;
};

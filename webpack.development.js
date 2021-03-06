const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?https://localhost:3000', // WebpackDevServer host and port
        'webpack/hot/only-dev-server',
        'index.tsx'
    ],
    output: {
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
    },
    devtool: 'cheap-module-eval-source-map',
    // TODO replace webpack-dev-server with webpack-server: https://github.com/webpack-contrib/webpack-serve
    devServer: {
        port: 3000,
        historyApiFallback: true,
        inline: true,
        hot: true,
        https: true,
        stats: {
            modules: false,
            chunks: false,
            children: false,
            chunkModules: false,
            hash: false,
        },
        host: '0.0.0.0',
        disableHostCheck: true,
        watchOptions: {
            ignored: /node_modules/,
        },
    },
    module: {
        loaders: [
            // Load and optimize images
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    {
                        loader: 'file-loader',
                        query: {
                            name: 'images/[name].[ext]?[sha512:hash:base36:10]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            bypassOnDebug: true,
                            mozjpeg: {
                                progressive: false,
                                quality: 75,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 0,
                            },
                            pngquant: {
                                speed: 10,
                            },
                        },
                    }
                ],
				include: path.resolve('src')
            },
        ]
    },
    plugins: [
        // Build index.html (insert bundles into template)
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: 'dependency',
        }),

        // Setup hot module replacement
        new webpack.HotModuleReplacementPlugin(),

        // Print more readable module names in the browser console on HotModuleReplacement updates
        new webpack.NamedModulesPlugin(),

        // Don't emit hot update when there are errors
        new webpack.NoEmitOnErrorsPlugin(),

        // Native notifications on build completion
        new WebpackNotifierPlugin(),
    ]
};

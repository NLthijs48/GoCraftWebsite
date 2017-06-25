const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
        'webpack/hot/only-dev-server',
        'index.tsx'
    ],
    devtool: 'eval',
    devServer: {
        port: 3000,
        historyApiFallback: true,
        inline: true,
        hot: true,
        stats: {
            modules: false,
            chunks: false,
            children: false,
            chunkModules: false,
            hash: false,
        },
        host: '0.0.0.0',
        disableHostCheck: true,
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
                            name: '[path][name].[ext]?[sha512:hash:base36:10]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: false,
                                quality: 75,
                                bypassOnDebug: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 0,
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 10,
                            },
                        },
                    }
                ]
            },
        ]
    },
    plugins: [
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

// This config merges common and environment depending configurations

const path = require('path');
const Merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CheckerPlugin} = require('awesome-typescript-loader');

// Configuration shared by production and developement
const commonConfig = {
    output: {
        filename: 'app.js',
        sourceMapFilename: 'app.js.map',
        publicPath: '/',
        path: path.resolve('dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        modules: ['src', 'node_modules'],
    },
    module: {
        loaders: [
            // Transpile TypeScript and new javascript syntax into older
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                include: path.resolve('src')
            },

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
                                progressive: true,
                                quality: 75,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 4,
                            },
                        },
                    }
                ]
            },

            // Load styles
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.scss$/,
                loaders: ['css-loader', 'sass-loader'],
            },

            // Load fonts
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?mimetype=image/svg+xml"
            },

        ]
    },
    plugins: [
        // Build index.html (insert bundles into template)
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: 'dependency'
        }),
        new CheckerPlugin(),
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
    return Merge(commonConfig, environmentConfig);
};

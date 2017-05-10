// This cofnig merges common and environment depending configurations

const path = require('path');
const Merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Configuration shared by production and developement
const commonConfig = {
    output: {
        filename: 'app.js',
        sourceMapFilename: '[name].map',
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
                loaders: ['babel-loader', 'ts-loader'],
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
                loader: 'style-loader!css-loader'
            },

            // Load fonts
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'url-loader'
            },
        ]
    },
    plugins: [
        // Build index.html (insert bundles into template)
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: 'dependency'
        }),
    ]
};

module.exports = function (env) {
    // Get environment specific config
    let environmentConfig = {};
    if(env === 'production') {
        environmentConfig = require('./webpack.production.js');
    } else {
        environmentConfig = require('./webpack.development.js');
    }

    // Merge and return
    return Merge(commonConfig, environmentConfig);
};

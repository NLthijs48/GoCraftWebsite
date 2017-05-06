// This cofnig merges common and environment depending configurations

const Merge = require('webpack-merge');
const path = require('path');

// Configuration shared by production and developement
const commonConfig = {
    output: {
        filename: 'app.js',
        sourceMapFilename: '[name].map',
        publicPath: '/dist/',
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
                            name: '[path][name].[ext]?[sha512:hash:base64:10]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 4,
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 3,
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
        /* Add this some time
         new HtmlWebpackPlugin({
         template: 'src/index.html',
         chunksSortMode: 'dependency'
         })
         */
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

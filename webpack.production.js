const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

module.exports = function(env) {
    let plugins = [
        // Cleanup 'dist' directory before building new files
        new CleanWebpackPlugin(['dist'], {}),

        // Compatibility with Webpack 1.0 loaders
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        // Set environment (a bunch of plugins and npm libraries use this)
        // Later developement-only code is stripped by UglifyJs
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        // Minimize javascript bundle, cleanup unused code, etc.
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true,
            },
            compress: {
                screw_ie8: true,
                warnings: false,
            },
            comments: false,
            sourceMap: true,
        }),

        // Copy .htaccess file to dist
        new CopyWebpackPlugin([
            {from: '.htaccess'}
        ]),
    ];

    // Build and generate reports about it
    if (env && env.analyze) {
        plugins.push(
            // Visualize bundle contents
            new Visualizer()
        )
    }

    return {
        entry: [
            'index.tsx'
        ],
        plugins: plugins,
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
                                    progressive: true,
                                    quality: 75,
                                },
                                gifsicle: {
                                    interlaced: true,
                                },
                                optipng: {
                                    optimizationLevel: 7,
                                },
                                pngquant: {
									// Currenlty breaks on Ubuntu
                                    enabled: false,
									speed: 4,
                                    quality: '65-80',
                                },
                            },
                        }
                    ]
                },
            ],
        },
        devtool: 'source-map',
    }
};

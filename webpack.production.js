const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        'index.tsx'
    ],
    plugins: [
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
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false,
            sourceMap: true,
        }),

        // Copy .htaccess file to dist
        new CopyWebpackPlugin([
            {from: '.htaccess'}
        ]),
    ]
};

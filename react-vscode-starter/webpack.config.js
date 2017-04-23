const path = require('path');
const webpack = require('webpack');

// load the web server settings from package.json
const devServerConfig = require('./package.json').devServer;

// used to copy content from the src folder to the dist folder
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// configure the environment object for development mode
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

// configure source and distribution folder paths
const srcFolder = 'src';
const srcFolderPath = path.join(__dirname, srcFolder);
const jsFolderPath = path.join(srcFolderPath, 'js');

// export webpack configuration
module.exports = {

    // root folder for entry point files
    context: jsFolderPath,    

    // entry points for the three bundles, order does not matter
    entry: {
        'app': ['babel-polyfill', 'whatwg-fetch', './app.js'],
    },

    // allows us to require modules using
    // import { someExport } from './my-module';
    // instead of
    // import { someExport } from './my-module.ts';
    // with the extensions in the list, it can be omitted from the import
    // root is an absolute path to the folder containing our application modules
    resolve: {
        extensions: ['.js', '.json'], // order matters, resolves left to right
        modules: [ jsFolderPath, path.join(__dirname, 'node_modules') ]
    },


    module: {
        rules: [
            // process all JavaScript files through the Babel preprocessor
            // this enables support for ES2017 and earlier including modules
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'latest'],
                        plugins: ['transform-class-properties', 'transform-flow-strip-types']
                    }
                }],
            },
            // transpiles global SASS stylesheets
            // loader order is executed right to left
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        // configuration for the postcss loader which modifies CSS after
                        // processing
                        options: {
                            // autoprefixer plugin for postcss adds vendor specific prefixing for
                            // non-standard or experimental css properties
                            plugins: [ require('autoprefixer') ]
                        }
                    },
                    'sass-loader',
                ],
            },
        ],
    },

    plugins: [
        // copy image files, and the index.html file directly when they are changed
        new CopyWebpackPlugin([
            {
                from: path.join(srcFolderPath, 'images'),
                to: 'images',
            },
        ]),
        // configure the file to have the bundle script elements injected
        // this is almost always the main html for the initial loading of 
        // the site
        new HtmlWebpackPlugin({
            template: path.join(srcFolderPath, 'index.html')
        }),
        // setup environment variables 
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
            },
        }),

        // provide the fetch API for browsers which do not native support it
        // new webpack.ProvidePlugin({
        //     'Promise': 'es6-promise',
        //     'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        // }),        
    ],

    // out file settings
    // path points to web server content folder where the web server will serve the files from
    // publicPath is the path to the files from the perspective of the web browser requesting
    // the files from the web server, this is used to insert the script elements into the index.html
    // file
    // file name is the name of the files, where [name] is the name of each entry point
    output: {
        path: path.join(__dirname, devServerConfig.contentBase),
        publicPath: '/',
        filename: '[name].js'
    },

    // use the webpack dev server to serve up the web application
    devServer: devServerConfig,

    // use full source maps
    // this specific setting value is required to set breakpoints in the TypeScript
    // in the web browser for development
    // other source map settings do not allow debugging in browser and vscode
    devtool: 'source-map',
};
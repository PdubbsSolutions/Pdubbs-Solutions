const fs = require('fs');
const path = require('path');
const WindiCSSPlugin = require('windicss-webpack-plugin');

module.exports = {
    mode: 'production',
    target: 'web',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/dist/',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'), // Adjusted contentBase
            publicPath: '/public/',
            serveIndex: true, // Optionally, serve an index.html
        },
        compress: true, // Moved from contentBase
        port: 80,
        host: '0.0.0.0',
        open: true,
        historyApiFallback: true, // For handling Single Page Apps (SPA)
        watchFiles: {
            paths: [path.join(__dirname, 'src/**/*')],
            options: {
                usePolling: true,
            }
        },
    },
    resolve: {
        alias: {
            globalThis: path.resolve(__dirname, 'source/repos/Pdubbs-final'),
            '@src': path.resolve(__dirname, '/src'),
            '@public': path.resolve(__dirname, 'public'),
            '@app': path.resolve(__dirname, 'app.js'),
            '@static': path.resolve(__dirname, '/src/static')
        },
        extensions: ['.js', '.mjs', '.json', '.php', '.html', '.css']
    },
    plugins: [
        new WindiCSSPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.php$/,
                use: ['php-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    }
};

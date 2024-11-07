const path = require('path');
const firebaseConfig = require('./firebaseConfig.js');

module.exports = {
    devServer: {
        host: 'localhost',
        port: 5000
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // Use 'dist' folder for bundling output
        filename: 'bundle.js',
        libraryTarget: 'commonjs'
    },
    resolve: {
        alias: {
            firebaseapp: path.resolve(__dirname, 'source/repos/Pdubbs-final'),
            '@src': path.resolve(__dirname, 'src'),
            '@public': path.resolve(__dirname, 'public'),
            '@app': path.resolve(__dirname, 'public/app'),
            '@static': path.resolve(__dirname, 'src/static')
        },
        extensions: ['.js', '.mjs', '.json']
    },
    mode: 'development',
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
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    }
};

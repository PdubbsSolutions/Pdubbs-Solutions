const path = require('path');
const WindiCSSPlugin = require('windicss-webpack-plugin');

module.exports = {
    mode: 'development',  // Set this to 'production' when building for production
    devServer: {
        host: 'localhost',
        port: 5000
    },
    entry: './src/app.js',  // Modify as per your entry point
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new WindiCSSPlugin()
            
    ],
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

const path = require('path');
const PhpWebpackPlugin = require('php-webpack-plugin');
const WindiCSSPlugin = require('windicss-webpack-plugin');

module.exports = {
    entry: {
        main: 'index.php',
        app: 'app.js',
    },
    plugins: [
        [new WindiCSSPlugin()],
        new PhpWebpackPlugin({
        }),
        new PhpWebpackPlugin({
            entryPoint: 'null',
            filename: 'scriptlists.php'
        }),
    ]
}

const newLocal = 'public/app';
module.exports = {
    devServer: {
        host: 'localhost',
        port: 5000
    },
    output: {
        path: path.resolve(__dirname, 'public'), // Use 'dist' folder for bundling output
        filename: 'bundle.js',
        libraryTarget: 'commonjs'
    },
    resolve: {
        alias: {
            globalThis: path.resolve(__dirname, 'source/repos/Pdubbs-final'),
            '@src': path.resolve(__dirname, 'src'),
            '@public': path.resolve(__dirname, 'public'),
            '@app': path.resolve(__dirname, 'app.js'),
            '@static': path.resolve(__dirname, 'static')
        },
        extensions: ['.js', '.mjs', '.json', 'php', 'html', 'css']
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

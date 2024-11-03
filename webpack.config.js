const path = require('path');

module.exports = {
    entry: './public/app/static/index.mjs',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public', 'app'),
        clean: true // Optional: clean the output directory before each build
    },
    resolve: {
        alias: {
            firebaseapp: path.resolve(__dirname, 'C:\Users\PW Admin Solutions\source\repos\Pdubbs-final') // Use forward slashes for paths
        },
        extensions: ['.js', '.mjs', '.json']
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    }
};

// Import Firebase configuration at the end
const firebaseConfig = require('./firebaseConfig.js');

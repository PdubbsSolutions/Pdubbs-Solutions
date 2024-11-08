const path = require('path');
const WindiCSSPlugin = require('windicss-webpack-plugin');

module.exports = {
    mode: 'production',
    target: 'web',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'static'), // Updated to static, contentBase is deprecated
        },
        contentBase: path.join (__dirname, 'src'),
        compress: true,
        port: 8080,
        host: '0.0.0.0',
        open: true,
        historyApiFallback: true,
        watchFiles: {
            paths: [path.join(__dirname, 'src/**/*')],
            options: {
                usePolling: true,
            },
        },
        server: {
            type: 'https',
            options:{
                key: fs.readFileSync(path.join(__dirnames,  'src\ utils\request.pem')),
                cert: fs.readFileSync(path.join(__dirname, 'src\ utils\etc\cert.txt')),
            }
        }
    },
    resolve: {
        fallback: {
            fs: false,
            net: false,
            tls: false,
            http: false,
            https: false,
            zlib: false,
            stream: false,
            crypto: false,
            path: false,
            os: false,
            assert: false,
            buffer: false,
            util: false,
            child_process: false,
            /* Add more as needed */
        },
        alias: {
            globalThis: path.resolve(__dirname, 'source/repos/Pdubbs-final'),
            '@src': path.resolve(__dirname, 'src'), // Adjusted to correct relative path
            '@public': path.resolve(__dirname, 'public'),
            '@app': path.resolve(__dirname, 'app.js'),
            '@static': path.resolve(__dirname, 'src/static'),
        },
        extensions: ['.js', '.mjs', '.json', '.php', '.html', '.css'],
    },
    plugins: [
        new WindiCSSPlugin(),
    ],
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
                test: /\.php$/,
                use: ['php-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
};

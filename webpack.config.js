const { IPv4 } = require('ipaddr.js');
const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
    app: './src/app.js',
    user: './src/user.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.mjs$/,
        include: /src/,
        type: 'javascript/auto',
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      options:"local-IPv4"
    },
    compress: true,
    port: 5000,
    open: true,
    host: true,
  },
};

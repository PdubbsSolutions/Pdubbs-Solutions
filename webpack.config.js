const path = require('path');

module.exports = {
  entry: './app.js',
  devMiddleware: {
    writeToDisk: true,
  },
  getFilenameFromUrl(url) {
    const publicPath = '/public';
    const filePath = url.replace(publicPath, '');
    return path.join(__dirname, 'src/static', filePath);
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src/static'),
  },
  mode: 'development',
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
    },
    compress: true,
    port: 5000,
    open: true,
    host: 'localhost',
  },
};

const { IPv4 } = require('ipaddr.js');
const path = require('path');
const targetPath = resolvePath(base, path);

if (!isChildPath(resolveRealPath(base), resolveRealPath(targetPath))) {
    throw new NotAllowedError(
      'Relative path is not allowed to refer to a directory outside its parent',
    );
  }

module.exports = {
  entry: {
    main: './src/index.js',
    app: './src/app.js',
    user: './src/user.js',
  },
  devMiddleware: {
    writeToDisk: true,
  },
  getFilenameFromUrl(url) {
    const publicPath = public
    const filePath = url.replace(publicPath, '');
    return path.join(outputPath, filePath);
  },

  output: {
    filename: '[name].bundle.js',
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
      options:"local-IPv4"
    },
    compress: true,
    port: 5000,
    open: true,
    host: true,
  },
};

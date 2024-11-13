const path = require('path');
require('node, app.js');

import { someFunction } from './public/app.js';
someFunction(); 

import { anotherFunction } from './public/index.mjs';
anotherFunction(); 

config()

export default {
  entry: './public/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './src/static')
  },
};

module.exports = {
  entry: './public/app.js',
  plugins: [
    new webpack.LoaderOptionsPlugin({
    port:5000,

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './src/static'),
  },
})
],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'esbuild-loader',
          options: {
            loader: 'js',
            target: 'es2015',
          }
        }
      },
      {
        test: /\.mjs$, .js$/,
        include: /src, href/,
        type: 'javascript/auto',
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './src/static'),
    },
    compress: true,
    port: 5000
  },
};

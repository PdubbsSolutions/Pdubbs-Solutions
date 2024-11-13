const path = require('path');
require('node, app.js');
import webpack from webpack;
import pkg from 'webpack';
const { webpack } = pkg;
import { someFunction } from './src/app.js';
someFunction(); 

import { anotherFunction } from './src/index.mjs';
anotherFunction(); 

export default {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './src/static')
  },
};

module.exports = {
  entry: './src/app.js',
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

require('webpack-cli');
require('webpack');
require('path');
require('./public');
require('./server.js');
require('./src')

import { cli } from 'webpack';
import { someFunction } from './public/app.cjs/index.js';
someFunction(); 

import { anotherFunction } from './public/index.cjs';
import path from 'path-browserify';
anotherFunction(); 

config(webpack-cli);

export default {
  entry: './public/app.cjs',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './src/static')
  },
};

module.exports = {
  entry: './public/app.cjs',
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

const path = require('path');

module.exports = {
   entry: './public/app/static/js/index.mjs',
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public')
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
}
const firebaseConfig = require('./firebaseConfig.js');

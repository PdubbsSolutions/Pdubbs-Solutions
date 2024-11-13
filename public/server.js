import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from './webpack.config.js';

const app = express();
const compiler = webpack(config);

app.use(
   webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
   })
);

app.listen(5000, () => {
   console.log('App is running on http://localhost:5000');
});
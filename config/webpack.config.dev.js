const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const path = require('path');
const webpack = require('webpack');
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "8888";

module.exports = merge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill',
    './src/index',
  ],
  devServer: {
    contentBase: ('src'),
    hot: true,
    host: HOST,
    port: PORT
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
      noInfo: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
});

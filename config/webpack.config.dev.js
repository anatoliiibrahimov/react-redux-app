const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill',
    './src/index',
  ],
  devServer: {
    contentBase: ('src'),
    hot: true
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
        enforce: 'pre',
        test: /\.js?$/,
        include: path.join(__dirname, '../src'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
});

const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV' : JSON.stringify('production')
};

module.exports = merge (commonConfig, {
  devtool: 'source-map',
  entry: [
    './src/index.js'
  ],
  devServer: {
    contentBase: ('dist')
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new UglifyJSPlugin(),
    new ExtractTextPlugin({
      filename: "styles.css",
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'Production'
    }),
    new CleanWebpackPlugin(['dist'], {
      root: process.cwd()
    })
  ],
  module: {
    rules: [
      {
        test: /.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
          publicPath: "/dist"
       })
      },
    ]
  }
});

const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const path = require('path');
const webpack = require('webpack');

module.exports = merge (commonConfig, {
  target: 'node',
  externals: [nodeExternals()],
  devtool: "inline-cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      }
    ]
  }
});

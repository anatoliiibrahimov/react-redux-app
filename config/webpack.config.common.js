const path = require('path');

module.exports = {
  target: 'web',
  devServer: {
    inline: true,
    host: "localhost",
    historyApiFallback: true,
    port: "8888"
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: { 
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(process.cwd(), 'src'),
      path.join(process.cwd(), 'config'),
      path.join(process.cwd(), 'node_modules'),
      "node_modules",
    ],
  },
  module: {
    rules: [
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 5000, mimetype: 'application/octet-stream'
        }
      },
      {
        test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader", options: {
                sourceMap: true
            }
        }, {
            loader: "sass-loader", options: {
                sourceMap: true
            }
        }]
      }
    ]
  }
}

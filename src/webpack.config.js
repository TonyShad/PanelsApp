/* global require */

const ExtractTextPlugin = require('extract-text-webpack-plugin'),
  extractCSS = new ExtractTextPlugin("[name].css"),
  path = require('path');
module.exports = {
  entry: './panel.js',
  mode: 'development',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        query: {
            plugins: [
              'transform-decorators-legacy',
              'transform-class-properties'
            ],
            presets: [
              'react',
              'es2015',
              'stage-0'
            ]
        },
        test: /\.jsx?$/u
      },
      {
        test: /\.less$/u,
        use: [
            'style-loader',
            'css-loader',
            'less-loader'
        ]
      },
      {
        exclude: /node_modules/u,
        loader: "eslint-loader",
        test: /\.jsx?$/u
      },
      {loaders: extractCSS.extract("style-loader", 'css-loader'),
test: /\.css$/u},
      {loader: "html-loader",
test: /\.html$/u}
    ]
  },
  output: {
    filename: 'panel.bundle.js',
    path: path.resolve(__dirname, '../')
  }
};

const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  node: {
    fs: 'empty',
    child_process: 'empty',
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: './' },
          },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: 'url-loader',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public/static'),
    filename: 'main.js',
  },
};

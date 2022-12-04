/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js', // we don't need contenthash in dev mode
    path: path.resolve(__dirname, './dist'),
    publicPath: '',
    // clean: {
    //   dry: true,
    //   keep: /\.css/
    // }
  },
  mode: 'development',
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
    devMiddleware: {
      index: 'index.html',
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpeg|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024, // if file size < 3 kilobytes, it'll use inline
          },
        },
      },
      {
        test: /\.txt/,
        type: 'asset/source',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader', // we can use style-load instead
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ['handlebars-loader'],
      },
    ],
  },
  plugins: [
    // new TerserPlugin(),   we don't need to minify our code in dev mode
    // new MiniCssExtractPlugin({
    //   filename: 'styles.[contenthash].css',
    // }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        path.join(process.cwd(), 'build/**/*'),
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'hello world lalala',
      template: 'src/index.hbs',
      description: 'Some description',
    }),
  ],
};

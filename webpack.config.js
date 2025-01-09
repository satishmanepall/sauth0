/** @format */
const webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');
const { DefinePlugin } = require('webpack');
require('dotenv').config();

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'samsauth0.js',
    
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env.MONGO_URI': JSON.stringify(process.env.MONGO_URI),
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.ADMIN_APP_URI': JSON.stringify(process.env.ADMIN_APP_URI),

      

    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/, // regex to match modules to ignore
      contextRegExp: /moment$/, // context for which modules should be ignored
    })
  ],
};

// const makeWebpackConfig = require('./webpack-make-config');

// module.exports = makeWebpackConfig({
//   nodemonPluginArgs: {
//     script: 'dist/consults-service.bundle.js',

//   },
//   webpackConfigOptions: {
//     entry: {
//       'consults-service': './src/index.js'
//     },
//   },
//   output: {
//         path: path.resolve(__dirname, 'public'),
//         filename: 'admin.js'
//       },
// });

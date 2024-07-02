const path = require('path')
const serverlessWebpack = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  devtool: 'inline-cheap-module-source-map',
  entry: serverlessWebpack.lib.entries,
  mode: 'production',
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'ts-loader',
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, '.webpack'),
        path.resolve(__dirname, '.serverless'),
        path.resolve(__dirname, 'test')
      ],
      options: {
        transpileOnly: true
      }
    }
    ],
  },
  node: false,
  externals: [nodeExternals()],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        keep_classnames: true,
        keep_fnames: true,
        
      }
    }
    )],
  },
  resolve: {
    extensions: ['.mjs', '.ts', '.js', '.json'],
    alias: {
      '@domain': path.resolve(__dirname, 'src/domain'),
      '@application': path.resolve(__dirname, 'src/application'),
      '@infra': path.resolve(__dirname, 'src/infra')
    }
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ],
  target: 'node',
};
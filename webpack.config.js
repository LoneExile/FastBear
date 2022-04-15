const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
      popup: './src/popup-page/popup.tsx',
      contentscript: './src/contentscript.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [{ 
        test: /\.(js|jsx|ts(x?))$/, 
        exclude: /node_modules/,
        use: {
            loader: 'ts-loader',
            options: {
                // presets : ['@babel/preset-env', '@babel/preset-react']
            }
        }
    }],
  },
  plugins: [new HtmlWebpackPlugin({
      template: './src/popup-page/popup.html',
      filename: 'popup.html',
      chunks: ['popup']
  }),
  new CopyPlugin({
    patterns: [
      { from: "public", to: "."},
    ],
  }),
  new CleanWebpackPlugin()
],
};
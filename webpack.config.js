const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/build/index.html`,
  filename: 'index.html',
  inject: 'body',
});

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./app/Index.jsx'],
  output:{
    path: path.resolve(__dirname,'build'),
    filename: 'bundle.js'
  },
  resolve:{
    modules:['browser', 'node_modules', 'main'],
    extensions:['.js', '.jsx']
  },
  module:{
    rules: [
            // {
            //     test: /\.jsx?$/,
            //     enforce: 'pre',
            //     include: path.resolve(__dirname, 'app'),
            //     loader: 'eslint-loader'
            // },
            {
              loader:'babel-loader',
              test: /\.jsx?$/,
              include: path.resolve(__dirname, 'app')
            },
            {
              loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
              }),
              test: /\.css$/
            },
            {
              test: /\.scss$/,
              use: [{
                  loader: "style-loader" // creates style nodes from JS strings
              }, {
                  loader: "css-loader?modules" // translates CSS into CommonJS
              }, {
                  loader: "sass-loader" // compiles Sass to CSS
              }]
            }
    ]
  },
  node: {
fs: 'empty'
},
  devServer:{
    port:3030,
    contentBase:'./build',
    inline:true
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new ExtractTextPlugin('assets/bundle.css')
  ]
}

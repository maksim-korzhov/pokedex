var HtmlWebpackPlugin = require('html-webpack-plugin') // для работы с html
var ExtractTextPlugin = require('extract-text-webpack-plugin') // для отделения css в отдельный файл
var path = require('path');

module.exports = {
  entry: {
    index: './src/index.jsx'
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          publicPath: '/dist/',
          filename: '[name].[ext]'
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
    // Настройки сервера разработки
  devServer: {
    contentBase: '/dist/',
    compress: true, // gzip all files
    host: '159.203.117.100',
    port: 9090,
    stats: 'errors-only', // не показывать весь лог, только ошибки,
    open: true, // Всегда открывать в новом окне,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Starter',
      hash: true,
      chunks: ['index'],
      template: './index.html'
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  ]
}

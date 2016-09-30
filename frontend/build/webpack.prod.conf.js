/**
 * Production環境
 * webpack設定
 */

var webpack = require('webpack')
var config = require('./webpack.base.conf')

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// whether to generate source map for production files.
// disabling this can speed up the build.
var SOURCE_MAP = true

config.devtool = SOURCE_MAP ? 'source-map' : false

// css系はextract-loaderで別ファイル出力かけるので
// ローダーの編集にしてもぐちゃぐちゃくそわろいつか直す
// generate loader string to be used with extract text plugin
function generateExtractLoaders (loaders) {
  return loaders.map(function (loader) {
    return loader + '-loader' + (SOURCE_MAP ? '?sourceMap' : '')
  }).join('!')
}
config.module.loaders.shift()
config.module.loaders.shift()
config.module.loaders.push([
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', generateExtractLoaders(['css']))
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style-loader', generateExtractLoaders(['css', 'sass']))
  }
])

// プラグイン設定
config.plugins = (config.plugins || []).concat([
  // http://vuejs.github.io/vue-loader/workflow/production.html
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  // ES2015で書かれたコードをUglifyJsが読めない。。。
  // 対応中の新しいやつもあるんだけど未完成気味でちょっと怖い
  // 公開するようなときには完成してそうだからそれまでは圧縮やめ
  // new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     warnings: false
  //   }
  // }),
  new webpack.optimize.OccurenceOrderPlugin(),
  // extract css into its own file
  new ExtractTextPlugin('[name].[contenthash].css'),
  // generate dist index.html with correct asset hash for caching.
  // you can customize output by editing /src/index.html
  // see https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
    filename: '../dist/index.html',
    template: 'src/index.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    }
  })
])

module.exports = config

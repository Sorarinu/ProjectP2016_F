var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    preLoaders:[
      {
        test: /\.jade$/,
        loader: 'jade-html'
      },
      // {
      //   test: /\.ts(x?)$/,
      //   exclude: /node_modules/,
      //   include: __dirname,
      //   loader: 'tslint'
      // }
    ],

    loaders: [
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      },
      {
        test: /\.jade$/,
        loader: 'raw'
      },
      {
        test: /\.html$/,
        loader: "html-loader?minimize=false"
      },
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file',
        query: {
          name: '[name].[ext]?[hash]'
        }
      },
      { test : /\.woff$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test : /\.woff2$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test : /\.eot$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test : /\.ttf$/, loader: 'url-loader?mimetype=application/font-woff' }
    ]
  },
  resolve: {
    extensions: ["", ".ts", ".tsx", ".js"]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}

/**
 * Webpackの共通設定ファイル. モジュールのローダとか
 */

var path = require('path')

module.exports = {
    entry:{
        app: './src/main.ts'
    },
    output:{
        path: path.resolve(__dirname,'../dist'),
        filename: '[name].js'
    },
    resolve:{
        extensions: ['', '.js', '.ts'],
        alias: {
            'src':path.resolve(__dirname, '../src')
        }
    },
    resolveLoader:{
        root: path.join(__dirname ,'node_modules')
    },
    module:{
        preLoaders:[
            {
                test: /\.jade$/,
                loader: 'jade-html'
            }
            // ,
            // {
            //   test: /\.ts(x?)$/,
            //   exclude: /node_modules/,
            //   include: __dirname,
            //   loader: 'tslint'
            // }
        ],

        loaders: [
            //production側の設定でごにょごにょするので
            //これより上に要素かかないでください
            //あと編集しないでください
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.scss$/,
                loader: "style!css!sass"
            },
            //ごにょごにょする領域はここまで
            //下は適当に
            {
                test: /\.jade$/,
                loader: 'raw'
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel!eslint',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash:7]'
                }
            },
            { test : /\.woff$/, loader: 'url-loader?mimetype=application/font-woff' },
            { test : /\.woff2$/, loader: 'url-loader?mimetype=application/font-woff' },
            { test : /\.eot$/, loader: 'url-loader?mimetype=application/font-woff' },
            { test : /\.ttf$/, loader: 'url-loader?mimetype=application/font-woff' }
        ]

    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    },
    ts: {
        experimentalDecorators: true
    }
}

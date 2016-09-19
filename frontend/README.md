# Bookmark-sorter
> ブックマークを整理できるイケてるＡＰＰ

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [動かす！！](#%E5%8B%95%E3%81%8B%E3%81%99%EF%BC%81%EF%BC%81)
  - [Nodeをインストール](#node%E3%82%92%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)
  - [黒画面で以下を叩く！](#%E9%BB%92%E7%94%BB%E9%9D%A2%E3%81%A7%E4%BB%A5%E4%B8%8B%E3%82%92%E5%8F%A9%E3%81%8F%EF%BC%81)
  - [サイトにアクセス](#%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AB%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9)
  - [開発IDE](#%E9%96%8B%E7%99%BAide)
- [アプリケーション構成？説明？](#%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E6%A7%8B%E6%88%90%EF%BC%9F%E8%AA%AC%E6%98%8E%EF%BC%9F)
  - [使ってる物とか](#%E4%BD%BF%E3%81%A3%E3%81%A6%E3%82%8B%E7%89%A9%E3%81%A8%E3%81%8B)
  - [アプリケーションの構成](#%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E6%A7%8B%E6%88%90)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<img src="http://bookandsons.com/wp/wp-content/uploads/2015/08/bookmark3.jpg" height=350px></img>



## 動かす！！
> ソフト動かしてみようよ　起動だけなら５分でできるよ

### Nodeをインストール  
もしまだ入ってないなら入れよう  
 * Windows？　[node-download](https://nodejs.org/en/) ここで最新落としてインストーラー叩けばいいよ  
 * Linuxとかのじょうつよさんはもうはいってるよね(´・ω・`)

### 黒画面で以下を叩く！
> 一応:cwd は bm-sorterだよ？

``` bash
# 依存ソフトウェアをインストールするよ
npm install

# typescriptの型定義ファイルを入れるよ
typings install

# 開発環境でサーバーを起動するよ
npm run dev
```

### サイトにアクセス  
怒られてなければあなたのＰＣでサーバーが起動してコンテンツがサーブされてるはずだよ！  
このＵＲＬでアクセスできるよ！！
[Bookmark-sorter](http://localhost:8080/)

### 開発IDE
typescript使ってるのはIDEでがりがり補完させるためでもあるよ,IDEとして[Webstorm](https://www.jetbrains.com/webstorm/)とかインストールするといいかもね. これ有償のソフトだけど学生なら無料で使えるよ　かなり優秀　まぁ好きに


## アプリケーション構成？説明？
書きなぐった駄文だけどここ読んでくれればどうなってるかわかると思います.  
自分も構成理解の為に書いていくよ

### 使ってる物とか
> 挙げた要素まったくわからんって感じなら読んで,リンク先見て,それからググってさらに記事読んで

* [vuejs](https://jp.vuejs.org/)   
今回使ってるＪＳフレームワークだよ,非常に簡素だからすぐに覚えられると思うよ  
ドキュメンテーションは日本語だから読めばすぐわかるかな  
加えて[vue-router](http://router.vuejs.org/ja/index.html)とあとbootstrapのコンポーネントを実現する[vue-strap](https://yuche.github.io/vue-strap/)も使ってるよ

* [typescript](https://www.typescriptlang.org/)  
AltJSと呼ばれるJavaScriptのすごいやつの１種だよ. 大体ＪａｖａＳｃｒｉｐｔって適当に書いてるとぐちゃぐちゃになっていくし人が書く言語じゃないよねってなって[AltJS](http://sterfield.co.jp/designer/javascript%E3%81%AE%E4%BB%A3%E6%9B%BF%E8%A8%80%E8%AA%9E%E3%81%A8%E3%81%AA%E3%82%8Baltjs%E3%81%AE%E4%BB%A3%E8%A1%A85%E3%81%A4/)っていうJavaScriptを生成する目的の言語群が出てきたん. typescriptは型が追加されてコンパイラチェックとか安全になった上,IDEでめっちゃ補完が効いて,さらにES2016に近い仕様でそのうえAngular2が正式採用したことで最近とても熱い言語だよ　今プロジェクトのコードは基本これで書いていくよ

* [jade](http://blog.mismithportfolio.com/web/20160117jadebeginner)  
リンク先を読めば5分で使えるようになるよ！　要はHTMLをさくっとシンプルに書くものだよ.  
htmlってタグ長いし閉じタグわすれてたりするしクラス指定するのは面倒だし生で書くとか私はやりたくないな(´・ω・｀)  
シンプルに書く以外にほかにももっと便利な機能があるんだけど今回は基本HTMLをシンプルに書くために使ってくよ.

* [sass](http://qiita.com/ritukiii/items/67b3c50002b48c6186d6)  
cssのすげーやつだよ.リンク先の最強機能とかかいてあるのを見れば何ができるかわかると思うよ.　cssが書けるなら10分で書けるようになるよ

* [webpack](http://qiita.com/yosisa/items/61cfd3ede598e194813b)  
上にあげたtypescriptとかjadeとかsassてのは普通じゃブラウザで実行できないよ.ブラウザはhtmlを表示してjavascriptが走るものだからね.  
そのためにこのwebpackでこれらをコンパイルしたりしてひとまとめのjavascriptにまとめあげるんよ あとはこの出力されたjsファイルを読めば全部適用されるって仕組み（すごく適当）.  
詳しくは全然分かってないけど大量の機能があります.


### アプリケーションの構成
* /src : 主に書いてくのはここのフォルダ
 * /assets  
 画像とか置く,vendorは外部提供のファイル
 * /compoents  
 vueのコンポーネント作ってそれ単位でまとめていく、それぞれ中にはそのコンポーネントのtsとテンプレートのjadeとスタイルのscssを配置
 * app.html + app.ts  
 アプリケーションのトップレベルになるコンポーネント
 * app.scss  
 アプリケーション全体にかかわるレイアウトを設定する用
 * route-config.ts  
 Vueルータの設定ファイル
* index.html  
 サーバーが真っ先にサーブしてるのはこのファイル中でビルドされたjsを呼んで機能を全部呼び出してるよ
* package.json  
 アプリケーションの依存関係とかいろいろ記述するファイル
* webpack.config.js  
 webpackの設定ファイル　ビルド設定とかね　かなりグダグダな書き方になってるのでそのうち治します(lintとか無効にしちゃったし...)

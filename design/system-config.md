# システム構成

* サーバーサイド
  * PHP (Laravel)　
  * ページの類似度求めるのなんか（pythonで動かすならphp側から呼ぶのかな）
  * DB (MySQLがいいな・・・)

SPAになるのでサーバー側は基本クライアント側で必要になるAPI作る感じで  
JSON受け取ってJSON返す子


* クライアントサイド

SPAを実現するのに必要な構成があればOK

とりあえず個人的に熱いからAngular2で以下の構成したいんだけど
 * JSフレームワークは[Angular2](https://angular.io/)(type-script)
 * CSSフレームワークとしてBootstrapを使用(自分で書くやつはscss使う)
 * ボタンとかのコンポーネント用にng-bootstrap(Angular2用のbootstrapコンポーネント)
 * Webpack

ただ
* Angular2とかAltJSとかの学習コストは高い
* ほかの人が見たとき感覚でまったくわからんとなるのもあれ

そんなんで悩み中,ガチガチやらず簡単なので行こうぜ感もある.JQueryだけでひたすら書きますはさすがに大変だと思うけど,一番内容大きいところになるだろうしよく考えて決めたい.

[JSフレームワークまとめ](http://qiita.com/RyutaYoshi/items/35627978de3764fa4451)　いますぐググっただけの記事だけど載せておく.

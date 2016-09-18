# モデルというか使うデータと内容

## ユーザー
User
* user_id : string
* password : string
* (admin) 管理者フラグ　いる？


## ブックマーク
> フォルダもブックマークも同じオブジェクトで

Bookmark
* id: integer
* title: string (タイトル（ページ名）)
* detail: string (詳細)
* reg_date: datetime (ブックマークに登録された時間)
* folder: boolean (フォルダか)　
* bookmark: Array (フォルダならブックマークを持つ 木階層やな)
* url: string (ブックマークのＵＲＬ)


ここまでクライアント側で使うデータ
この辺のデータがＪＳＯＮオブジェクトで貰えればいいです


# DBどうすんの？
* ユーザーのPKはidとか作るかuser_idをPKにしてもいい
* パスワードはＤＢ側では当然hashで
* created_atとかupdated_atとかを必要なら追加していく

## ブックマークの木階層どうする？
拡張ＲＤＢ以外を使うとかＯＲマッパがなんとかしてくれるとかあるかもしれない  
SQL叩いたりするならこのへん？ＲＤＢで木階層を実現する方法
* [隣接リストモデル](http://blog.neo.jp/dnblog/index.php?module=Blog&action=Entry&blog=pg&entry=3955&rand=15db1)
* [入れ子構造モデル](http://www.geocities.jp/mickindex/database/db_tree_ns.html)
* [経路列挙モデル](http://www.geocities.jp/mickindex/database/db_tree_pe.html)
* [入れ子区間モデル](http://gihyo.jp/dev/serial/01/sql_academy2/000601)

まぁお任せ、クライアント側はＪＳＯＮオブジェクトで送って貰えればいいので

## ブックマークのユーザー割り当てどうする?
アカウント作らなくてもサービス使えるようにしたい,アカウントないならセッションＩＤを元に外部キーにするとかでまとめて,アカウント作ってあるならユーザーのidを外部キーにするとかでまとめよ

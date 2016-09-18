# クライアント-サーバー間リクエストのフォーマット

フォーマット決まったらここに書いてく

# サインアップ
* メソッド:POST
* URL:未定
* パラメータ:
 * user_id :string
 * password :string
* 応答:JSON
 * status : string  
 "OK" or "NG"
 * message :string  
 詳細を適当にわかりやすく　そのままＡｌｅｒｔで表示します

例
 ```json
 {
   "status" : "OK",
   "message" : "[user_id] created"
 }
 ```
 ```json
 {
   "status" : "NG",
   "message" : "パスワードが短いですよ？"
 }
 ```



# サインイン
* メソッド:GET
* URL:未定
* パラメータ:
 * user_id : string
 * password :string
* 応答:JSON
 * status : string  
 "OK" or "NG"
 * message : string

 サインアップと同じ感じでお願いします


# サインアウト
* status : string  
"OK" or "NG"
* message : string

サインアップと同じ感じでお願いします


* メソッド:GET
* URL:未定
* パラメータ: なし
* 応答: JSON


# Bookmarkファイルアップロード
* メソッド:POST
* URL:未定
* enc-type:multipart/form-data
* 送る物:ブックマークのブラウザからエクスポートしたファイル
* 応答: 解析されて標準化されたブックマークデータと応答 JSONで

こんな感じで statusがＮＧならbookmarkはnullでいいよ
```json
{
  "status" : "OK" ,
  "message" : "File loaded",　
  "bookmark" : [{
    "id" : "1",
    "title" : "Programming",
    "detail" : "プログラミング関連ページ",
    "reg_date" : "2006/01/22 20:20:12",
    "folder" : "true",
    "bookmark": [
      {
        "id" : "2",
        "title" : "Effective Java",
        "detail" : "JavaでプログラミングをするすべてのSE必読の書籍",
        "reg_date":"2014/03/11 10:10:10",
        "folder": "false",
        "url": "https://www.amazon.co.jp/dp/4621066056"
      },
      {
        "id" : "3",
        "title": "リーダブルコード",
        "detail" : "より良いコードを書くためのシンプルで実践的なテクニック",
        "reg_date" : "2014/03/11 10:10:10",
        "folder" : "false",
        "url" : "https://www.amazon.co.jp/dp/4873115655"
      },
      {
        "id" : "4",
        "title": "Androidまとめ",
        "detail" : "",
        "reg_date" : "2016/03/22 10:10:10",
        "folder" : "true",
        "bookmark" : [
          {
            こんな感じで
          }
        ]
      },
    ]

  }]
}


```

# Bookmarkファイルエクスポート
* メソッド:GET
* URL:未定
* パラメータ:
 * browser_type: string  
 エクスポートしてほしいブラウザの種類　firefoxとかchoromeとかsafariとか
* 応答
 * ファイルが送られてこればいい


# Bookmark情報 CRUD

## 作成
* メソッド:POST
* URL:未定
* パラメータ: JSON




# 類似度検出

# API Server
各種APIを提供するサーバ（？）

## あばうと
* PHP 5.6
* Laravel 5.1
* Windowsでも構築できるけど面倒

## 最初にやること

### Composerパッケージインストール
`composer install`

### npmパッケージインストール
`npm install`

## 起動の仕方
`php artisan serve`  
http://localhost:8000/ にアクセスするとLaravelのトップページが出る  

## APIアクセス
起動した状態で、`http://localhost:8000/api/v1/~~~~~~~`にリクエストぶん投げる  
するとJsonがぶん投げられる  
各種URLは、app/http/routes.phpなどを参照してね

## .env（都度追記）
```
APP_ENV=local
APP_DEBUG=false
APP_KEY=SomeRandomString

DB_CONNECTION=mysql
DB_HOST=nxtg-t.net
DB_DATABASE=bm_sorter
DB_USERNAME=bm_sorter
DB_PASSWORD=bm_sorter

SLACK_WEBHOOK_URI=https://hooks.slack.com/services/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
SLACK_CHANNEL=#bm_slack_bot
SLACK_USERNAME=田胡先生

EXPORT_MODE=file
```

## License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

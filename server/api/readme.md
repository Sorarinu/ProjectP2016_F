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

## License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

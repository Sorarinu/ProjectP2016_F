/**
 * サービスクラス
 */
class Service {

    /**
     * API提供のURL
     */
    private BASE_URL = 'http://localhost:8080';

    /**
     * APIパスを絶対パスへと解決します.
     * @param apiPath API呼び出しのURL
     */
    resolvePath(apiPath : string) : string {
        //正規化とかあるけど自前用意したurlを使うだけなのでこれだけで
        return this.BASE_URL + apiPath;
    }
}

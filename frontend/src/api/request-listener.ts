/**
 * リクエストの結果リスナー
 */
interface IRequestListener {

    /**
     * リクエストが成功したとき呼ばれる
     * サーバーからのレスポンスでstatus ok が帰ってきたとき
     * @param data
     */
    ok: (data : any) => void;

    /**
     * リクエストが（実処理に失敗）したとき呼ばれる
     * サーバーからのレスポンスでstatus ng が帰ってきたとき
     * @param message
     */
    ng: (message : string) => void;

    /**
     * リクエストが失敗したとき
     */
    failed: (message : string) => void;

}

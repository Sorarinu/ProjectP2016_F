/**
 * リクエストの結果リスナー
 */
interface RequestListener {

    /**
     * リクエストが成功したとき呼ばれる
     * サーバーからのレスポンスでstatus ok が帰ってきたとき
     * @param data
     */
    ok: (data: any) => void;

    /**
     * リクエストが失敗したとき
     */
    failed: (message: string) => void;
}

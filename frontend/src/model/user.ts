/**
 * ユーザー情報モデル
 */
export class User implements Validation {

    /**
     * ユーザーEmail
     */
    email: string;

    /**
     * ユーザーパスワード
     */
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    validate() {
        return [
            User.passwordValidate(this.password) ,
            User.emailValidate(this.email) ,
        ].every((x: boolean) => x);
    }

    /**
     * パスワードが有効かチェック
     * 有効なパスワードは6文字以上の文字列です.
     * @param password
     * @returns {boolean}
     */
    static passwordValidate(password: string): boolean {
        // Passwordは6文字以上
        return password.length >= 6;
    }

    /**
     * Emailが有効かチェック.
     * 形式が合っているか正規表現でチェックするだけです.
     * @param email
     * @returns {boolean}
     */
    static emailValidate(email: string) : boolean {
        // 発狂する人がいるかもしれないのでけっこうしっかりした正規表現をチョイス
        let emailRegExp = /^(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:"(?:\\[^\r\n]|[^\\"])*")))\@(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:\[(?:\\\S|[\x21-\x5a\x5e-\x7e])*\])))$/;
        return emailRegExp.test(email);
    }

}

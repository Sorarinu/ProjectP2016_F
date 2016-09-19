export class User implements IValidation {
    email : string;
    password : string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    validate() {
        return [
            User.passwordValidate(this.password) ,
            User.emailValidate(this.email) ,
        ].every(x => x);
    }

    static passwordValidate(password: string) : boolean {
        // Passwordは6文字以上
        return password.length >= 6 ;
    }

    static emailValidate(email: string) : boolean {
        // 発狂する人がいるかもしれないのでけっこうしっかりした正規表現をチョイス
        var emailRegExp = /^(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:"(?:\\[^\r\n]|[^\\"])*")))\@(?:(?:(?:(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+)(?:\.(?:[a-zA-Z0-9_!#\$\%&'*+/=?\^`{}~|\-]+))*)|(?:\[(?:\\\S|[\x21-\x5a\x5e-\x7e])*\])))$/;
        return emailRegExp.test(email);
    }

}

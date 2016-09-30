/**
 * Bookmarkデータモデル
 */
class Bookmark implements IValidation {

    id : number;
    parentId : number;
    title : string;
    detail : string;
    url : string;
    regDate : Date;
    folder : boolean;
    bookmark : Bookmark[];

    constructor () {
        this.id = null;
        this.parentId = null;
        this.title = '';
        this.detail = '';
        this.url = '';
        this.regDate = new Date();
        this.folder = false;
        this.bookmark = null;
    }

    validate() {
        return false;
    }

}

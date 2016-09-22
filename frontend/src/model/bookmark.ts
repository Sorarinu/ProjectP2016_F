/**
 * Bookmarkデータモデル
 */
class Bookmark implements IValidation {

    id : number;
    parentId : number;
    title : string;
    detail : string;
    url : URL;
    regDate : Date;
    folder : boolean;
    bookmark : Bookmark[];


    validate() {
        return false;
    }

}

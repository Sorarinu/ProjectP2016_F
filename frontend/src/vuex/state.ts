import {Bookmark} from '../model/bookmark';
import {BookmarkSimilarity} from '../model/bookmark-similarity';
import {User} from '../model/user';

// root state object
// each Vuex instance is just a single state tree.
export class State {

    // user stateーーーーーーーーーーーーーー

    /**
     * サインイン中かどうか
     */
    signInNow: boolean;

    /**
     * ログイン中のユーザー情報
     */
    user: User;

    // bookmarkRoot stateーーーーーーーーーーーーー

    /**
     * ブックマーク処理通信にエラーがあるか
     */
    bookmarkComError: boolean;

    /**
     * ブックマーク通信処理のエラーメッセージ
     */
    bookmarkComErrorMessage: string;

    /**
     * ブックマーク
     */
    bookmarkRoot: Bookmark;

    /**
     * 開くブックマークのディレクトリID
     */
    openBookmarkDirId: number;

    bookmarkSimilarityRes: BookmarkSimilarity;

    // ui state ---------
    selectBMIds: number[];

    showBMDeleteDialog: boolean;
    showSearchDialog: boolean;
    showUploadDialog: boolean;

    /**
     * 今開いているコンテキストメニューを閉じる関数.
     */
    contextMenuCloser: () => void;

    // state initializer
    constructor() {
        // user
        this.signInNow = false;
        this.user = new User('', '');

        // bookmark
        this.bookmarkRoot = new Bookmark(
            true,
            Number.MAX_VALUE,
            null,
        );

        this.bookmarkSimilarityRes = new BookmarkSimilarity(this.bookmarkRoot, 'hoge');

        this.openBookmarkDirId = Number.MAX_VALUE;

        this.showBMDeleteDialog = false;
        this.showSearchDialog = false;
        this.showUploadDialog = false;

        this.selectBMIds = [];
        this.selectBMIds.push(Number.MAX_VALUE);
    }
};

const state = new State();
export default state;

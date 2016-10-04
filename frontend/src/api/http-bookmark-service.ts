import * as $ from 'jquery';
import {ApiUrl} from './apiurl';
import BOOKMARK = ApiUrl.BOOKMARK;
import {Bookmark} from '../model/bookmark';
import {BookmarkService} from './bookmark-service';

/**
 * Bookmarkデータの取得、更新とかを.
 */
export class HttpBookmarkService　implements BookmarkService {

    postBookmark(bm: Bookmark, requestListener: RequestListener) : void {
        $.ajax({
            method: 'POST',
            url: ApiUrl.resolvePath(BOOKMARK),
            dataType: 'json'
        })
        .done(() => {
            return;
        })
        .fail(() => {
            return;
        });
    }

    getBookmarks(requestListener: RequestListener) : void {
        $.ajax({
            method: 'GET',
            url: ApiUrl.resolvePath(BOOKMARK),
            dataType: 'json'
        })
        .done(() => {
            return;
        })
        .fail(() => {
            return;
        });
    }

    updateBookmark(bm: Bookmark) : void {
        const id = bm.id;
        $.ajax({
            method: 'PUT',
            url: ApiUrl.resolvePath(BOOKMARK) + '/' + id,
            dataType: 'json'
        })
        .done(() => {
            return;
        })
        .fail(() => {
            return;
        });
    }

    deleteBookmark(bm: Bookmark) : void {
        const id = bm.id;
        $.ajax({
            method: 'DELETE',
            url: ApiUrl.resolvePath(BOOKMARK) + '/' + id,
            dataType: 'json'
        })
        .done(() => {
            return;
        })
        .fail(() => {
            return;
        });
    }
}

import {BookmarkSimilarityService} from './bookmark-similarity-service';
import {Bookmark} from '../model/bookmark';
import * as $ from 'jquery';
import {ApiUrl} from './apiurl';
import {BookmarkSimilarity} from '../model/bookmark-similarity';
export class HttpBookmarkSimilarityService implements BookmarkSimilarityService {

    search(searchWord: string, bmf: Bookmark, requestListener: RequestListener): void {

        const bs = new BookmarkSimilarity(bmf, searchWord);

        $.ajax({
            url: ApiUrl.resolvePath(ApiUrl.BOOKMARK_SIMILARITY_SEARCH),
            dataType: 'json',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify(bs)
        })
        .done((data: any) => {
            requestListener.ok(<BookmarkSimilarity>data);
        })
        .fail((xhr) => {
            requestListener.failed(`${xhr.status}: 類似度検索問い合わせ失敗`);
        });
    }
}

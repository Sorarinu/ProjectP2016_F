import * as $ from 'jquery';
import {Bookmark} from '../model/bookmark';
import {BookmarkSimilarity} from '../model/bookmark-similarity';
import {ApiUrl} from './apiurl';
import {BookmarkSimilarityService} from './bookmark-similarity-service';
export class HttpBookmarkSimilarityService implements BookmarkSimilarityService {

    search(searchWord: string, bmf: Bookmark, requestListener: RequestListener): void {

        const bs = new BookmarkSimilarity(bmf, searchWord);

        $.ajax({
            url: ApiUrl.resolvePath(ApiUrl.BOOKMARK_SIMILARITY_SEARCH),
            dataType: 'json',
            method: 'POST',
            data: JSON.stringify(bs),
        })
        .done((data: any) => {
            requestListener.ok(data as BookmarkSimilarity);
        })
        .fail((xhr) => {
            requestListener.failed(`${xhr.status}: 類似度検索問い合わせ失敗`);
        });
    }
}

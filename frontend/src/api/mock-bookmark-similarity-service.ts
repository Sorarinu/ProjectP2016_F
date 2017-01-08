import {Bookmark} from '../model/bookmark';
import {BookmarkSimilarity} from '../model/bookmark-similarity';
import {BookmarkSimilarityService} from './bookmark-similarity-service';

export class MockBookmarkSimilarityService implements BookmarkSimilarityService {
    public search(searchWord: string, bmf: Bookmark, requestListener: RequestListener): void {
        const similarityModel = new BookmarkSimilarity(bmf, searchWord);

        // 処理処理処理・・・
        similarityModel.bookmark = similarityModel.bookmark.map((v) => {
            // ランダムに２割で検索に一致と判断
            const rand = Math.random();
            if (rand >= 0.8) {
                v.similar_flag = true;
            }else {
                v.similar_flag = false;
            }

            return v;
        });

        setTimeout(() => {
            requestListener.ok(similarityModel);
        }, 5000);
    }

}

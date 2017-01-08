import {Bookmark} from '../model/bookmark';
/**
 * ブックマークの類似度出す子
 */
export interface BookmarkSimilarityService {
    search(searchWord: string , bmf: Bookmark, requestListner: RequestListener): void;
}

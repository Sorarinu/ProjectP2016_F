import {Bookmark} from '../../../src/model/bookmark';
import {BookmarkSimilarity} from '../../../src/model/bookmark-similarity';

/**
 * {@link Bookmark}のテスト.
 */
describe('bookmark-similarity unit test', () => {

    let rootBM : Bookmark;
    beforeAll(   () => {
        // init by default
        const mockData = require('src/api/mock-data/bookmark.json');
        rootBM = Bookmark.fromJSON(JSON.stringify(mockData.bookmark));
    });

    it('ブックマークがロードされている', () => {
        expect(rootBM.getSize()).toBe(50);
    });

    it('from json', () => {
        const resJson = '{"bookmark": [{"id": 43, "similar_flag": false, "url": "https://paiza.jp/login"}, {"id": 44, "similar_flag": false, "url": "http://www.nicovideo.jp/"}], "searchWord": "はい"}';
        const bookmarkSimilarity = BookmarkSimilarity.fromJSON(resJson);
        //console.log(JSON.stringify(bookmarkSimilarity));
        expect(bookmarkSimilarity.bookmark.length).toBe(2);
        expect(bookmarkSimilarity.searchWord).toBe('はい');
    });

    it('json-2-way-convert', () => {
        const bookmarkSimilarity = new BookmarkSimilarity(rootBM, 'hoge');
        expect(bookmarkSimilarity.bookmark.length).toBe(42);

        const jsonStr = JSON.stringify(bookmarkSimilarity);

        const bookmarkSimilarity2 = <BookmarkSimilarity>JSON.parse(jsonStr);
        expect(bookmarkSimilarity2.bookmark.length).toBe(42);

    });
});

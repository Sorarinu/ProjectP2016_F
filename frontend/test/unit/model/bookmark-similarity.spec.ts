import {Bookmark} from '../../../src/model/bookmark';
import {BookmarkSimilarity} from '../../../src/model/bookmark-similarity';

/**
 * {@link Bookmark}のテスト.
 */
describe('bookmark-similarity unit test', () => {

    var rootBM : Bookmark;
    beforeAll(   () => {
        // init by default
        const mockData = require('src/api/mock-data/bookmark.json');
        rootBM = Bookmark.fromJSON(JSON.stringify(mockData.bookmark));
    });

    it('ブックマークがロードされている', () => {
        expect(rootBM.getSize()).toBe(50);
    });

    it('json-2-way-convert', () => {
        const bookmarkSimilarity = new BookmarkSimilarity(rootBM, 'hoge');
        expect(bookmarkSimilarity.bookmark.length).toBe(42);

        const jsonStr = JSON.stringify(bookmarkSimilarity);

        const bookmarkSimilarity2 = <BookmarkSimilarity>JSON.parse(jsonStr);
        expect(bookmarkSimilarity2.bookmark.length).toBe(42);

    });
});

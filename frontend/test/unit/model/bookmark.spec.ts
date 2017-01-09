import {Bookmark} from '../../../src/model/bookmark';

/**
 * {@link Bookmark}のテスト.
 */
describe('bookmark-model unit test', () => {

    let rootBM: Bookmark;
    beforeAll(   () => {
        // init by default
        rootBM = new Bookmark(true, Number.MAX_VALUE, null);
        rootBM.title = 'Bookmark root';
        rootBM.detail = 'Bookmark rootフォルダ';
    });

    // ごく基本的な値のbookmarkモデルに対して基礎メソッド実行.

    it('初期化生成したBMがデフォルト値,指定値を持つ', () => {
        expect(rootBM.id).toBe(Number.MAX_VALUE);
        expect(rootBM.folder).toBeTruthy();
        expect(rootBM.title).toBe('Bookmark root');
        expect(rootBM.detail).toBe('Bookmark rootフォルダ');
        expect(rootBM.url).toBe('');
        expect(rootBM.regDate).toBeDefined();

        expect(rootBM.bookmark).toBeDefined();
        expect(rootBM.bookmark).not.toBeNull();
    });

    it('getSize() 1', () => {
        expect(rootBM.getSize()).toBe(1);
    });

    it('getRoot() 1', () => {
        expect(rootBM.getRoot()).toBe(rootBM);
    });

    it('search() 1', () => {
        const searched = rootBM.search(rootBM.id);
        expect(searched).toBe(rootBM);
    });

    it('searchAll() 1', () => {
        const searched = rootBM.searchAll(rootBM.id);
        expect(searched).toBe(rootBM);
    });

    describe('子を追加したりしてちゃんと動くか確かめる', () => {
        let child: Bookmark;
        beforeAll(() => {
            child = new Bookmark(false, 2, rootBM);
            rootBM.addChild(child);
        });

        it('子が追加されている', () => {
            expect(rootBM.bookmark.length).toBe(1);
        });

        it('getSize() 2' , () => {
            expect(rootBM.getSize()).toBe(2);
        });

        it('getRoot() 2', () => {
            expect(child.getRoot()).toBe(rootBM);
        });

        it('search() 2', () => {
            expect(child.search(rootBM.id)).toBeUndefined();
        });

        it('searchAll() 2', () => {
            expect(child.searchAll(rootBM.id)).toBe(rootBM);
        });

        it('JSON T-way-Convert 1', () => {
            const jsonStr = Bookmark.toJSON(rootBM);
            // console.log('rootBM JSON = \n' + jsonStr);
            const revert = Bookmark.fromJSON(jsonStr);

            expect(rootBM.getSize()).toBe(revert.getSize());
        });

        it('remove() 1', () => {
            child.remove();
            expect(rootBM.getSize()).toBe(1);
        });

    });

});

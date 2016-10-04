import {Bookmark} from '../../../src/model/bookmark';
import {BookmarkValue} from '../../../src/model/bookmark-value';
/**
 * Created by namaz on 2016/10/04.
 */
describe('BookmarkValue ブックマークモデルとJSONを中継するクラスのテスト.', () => {
    var rootBM;

    var child1;
    var child2;
    beforeEach(() => {
        rootBM =  new Bookmark(true, Number.MAX_VALUE, null);
        rootBM.title = 'root-folder';


        child1 = new Bookmark(false, 1, rootBM);
        child1.title = 'child1';
        rootBM.addChild(child1);

        child2 = new Bookmark(true, 2, rootBM);
        child2.title = 'child2';
        rootBM.addChild(child2);

        var child21 = new Bookmark(false, 3, child2);
        child21.title = 'child2-1';
        rootBM.addChild(child21);
    });

    it('toBMV()', () => {
        var bmvs = BookmarkValue.fromBM(rootBM);
        expect(bmvs.length).toBe(2);
    });

    it('toJSON()', () => {
        var jsonStr = BookmarkValue.toJSON(
            BookmarkValue.fromBM(rootBM)
        );
        console.log(jsonStr);
    });

    it('fromJSON()', () => {
        var jsonStr = BookmarkValue.toJSON(
            BookmarkValue.fromBM(rootBM)
        );
        var bmvs = BookmarkValue.fromJSON(jsonStr);
        expect(bmvs.length).toBe(2);
    });

    it('fromBMV()', () => {
        var jsonStr = BookmarkValue.toJSON(
            BookmarkValue.fromBM(rootBM)
        );
        var bmvs = BookmarkValue.fromJSON(jsonStr);
        var revertRoot = BookmarkValue.toBM(bmvs);
        expect(revertRoot.getSize()).toBe(4);
    });

});

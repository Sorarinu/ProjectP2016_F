import {State} from '../../../src/vuex/store';
import {bookmarkIsEmpty, getSignInNow, getBookmarkHierarchy} from '../../../src/vuex/getter';
import {Bookmark} from '../../../src/model/bookmark';
describe('vuex-getter-test', () => {

    var state: State;

    beforeEach(() => {
        state = new State();
    });

    it('getSignInNow', () => {
        const ret1 = getSignInNow(state);
        expect(ret1).toEqual(false);

        state.signInNow = true;
        const ret2 = getSignInNow(state);
        expect(ret2).toEqual(true);
    });


    it('bookmarkIsEmpty', () => {
        const ret1 = bookmarkIsEmpty(state);
        expect(ret1).toEqual(true);

        state.bookmarkRoot.addChild(new Bookmark(
            false,
            1,
            state.bookmarkRoot
        ));

        const ret2 = bookmarkIsEmpty(state);
        expect(ret2).toEqual(false);
    });

    it('bookmarkHierarchy', () => {
        // root開く.
        state.openBookmarkDirId = Number.MAX_VALUE;
        expect(getBookmarkHierarchy(state)).toBeDefined();
    });

});

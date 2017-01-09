import {Bookmark} from '../../../src/model/bookmark';
import getters from '../../../src/vuex/getter';
import {State} from '../../../src/vuex/state';

describe('vuex-getter-test', () => {

    let state: State;
    beforeEach(() => {
        state = new State();
    });

    it('bookmarkIsEmpty', () => {
        const ret1 = getters.bookmarkIsEmpty(state);
        expect(ret1).toEqual(true);

        state.bookmarkRoot.addChild(new Bookmark(
            false,
            1,
            state.bookmarkRoot,
        ));

        const ret2 = getters.bookmarkIsEmpty(state);
        expect(ret2).toEqual(false);
    });

    it('bookmarkHierarchy', () => {
        // root開く.
        state.openBookmarkDirId = Number.MAX_VALUE;
        expect(getters.getBookmarkHierarchy(state)).toBeDefined();
    });

});

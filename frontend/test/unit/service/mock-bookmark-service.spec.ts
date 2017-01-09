import {MockBookmarkService} from '../../../src/api/mock-bookmark-service';
/**
 * Created by namaz on 2016/10/04.
 */
describe('ブックマークMOCKサービスクラスのテスト', () => {

    let service;
    beforeAll(() => {
        service = new MockBookmarkService();
    });

    it('mock-data-loaded', () => {
        expect(service.rootBM.getSize()).toBe(50);
    });
});

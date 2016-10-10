import {UserService} from '../../../src/api/user-service';
import {ServiceFactory} from '../../../src/api/service-factory';
import {BookmarkService} from '../../../src/api/bookmark-service';
describe('service-factory-test', () => {


    it('user-service can get', () => {
        const userService: UserService = ServiceFactory.getUserService();
        expect(userService).toBeDefined();

        //user service is singleton
        expect(userService).toBe(ServiceFactory.getUserService());
    });

    it('bookmark-service can get', () => {
        const bookmarkService: BookmarkService = ServiceFactory.getBookmarkService();
        expect(bookmarkService).toBeDefined();

        //bookmark service is singleton
        expect(bookmarkService).toBe(ServiceFactory.getBookmarkService());
    });
});

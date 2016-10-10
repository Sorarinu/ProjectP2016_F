import {UserService} from './user-service';
import {BookmarkService} from './bookmark-service';
import {MockUserService} from './mock-user-service';
import {MockBookmarkService} from './mock-bookmark-service';

/**
 * MockとHttp通信するサービスクラスを柔軟に入れ替えるため.
 * DIは・・・DIはないんですか？？？？
 */
export class ServiceFactory {

    private static userService: UserService;
    static getUserService() : UserService {
        if (!this.userService) {
            this.userService = new MockUserService();
            return this.userService;
        }

        return this.userService;
    }

    private static bookmarkService: BookmarkService;
    static getBookmarkService() : BookmarkService {
        if (!this.bookmarkService) {
            this.bookmarkService = new MockBookmarkService();
            return this.bookmarkService;
        }

        return this.bookmarkService;
    }

}

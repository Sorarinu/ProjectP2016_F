import {UserService} from './user-service';
import {HttpUserService} from './http-user-service';
import {HttpBookmarkService} from './http-bookmark-service';
import {BookmarkService} from './bookmark-service';

/**
 * MockとHttp通信するサービスクラスを柔軟に入れ替えるため.
 * DIは・・・DIはないんですか？？？？
 */
export class ServiceFactory {

    private static userService: UserService;
    static getUserService() : UserService {
        if (this.userService === null) {
            this.userService = new HttpUserService();
            return this.userService;
        }

        return this.userService;
    }

    private static bookmarkService: BookmarkService;
    static getBookmarkService() : BookmarkService {
        if (this.bookmarkService === null) {
            this.bookmarkService = new HttpBookmarkService();
            return this.bookmarkService;
        }

        return this.bookmarkService;
    }

}

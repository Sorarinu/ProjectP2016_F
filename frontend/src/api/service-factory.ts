import {UserService} from './user-service';
import {BookmarkService} from './bookmark-service';
import {BookmarkSimilarityService} from './bookmark-similarity-service';
import {HttpUserService} from './http-user-service';
import {HttpBookmarkSimilarityService} from './http-bookmark-similarity-service';
import {HttpBookmarkService} from './http-bookmark-service';

/**
 * MockとHttp通信するサービスクラスを柔軟に入れ替えるため.
 * DIは・・・DIはないんですか？？？？
 */
export class ServiceFactory {

    private static userService: UserService;
    static getUserService() : UserService {
        if (!this.userService) {
            //this.userService = new MockUserService();
            this.userService = new HttpUserService();
            return this.userService;
        }

        return this.userService;
    }

    private static bookmarkService: BookmarkService;
    static getBookmarkService() : BookmarkService {
        if (!this.bookmarkService) {
            this.bookmarkService = new HttpBookmarkService();
            //this.bookmarkService = new MockBookmarkService();
            return this.bookmarkService;
        }

        return this.bookmarkService;
    }

    private static bookmarkSimilarityService : BookmarkSimilarityService;
    static getBookmarkSimirarityService() : BookmarkSimilarityService {
        if (!this.bookmarkSimilarityService) {
            this.bookmarkSimilarityService = new HttpBookmarkSimilarityService();
            return this.bookmarkSimilarityService;
        }

        return this.bookmarkSimilarityService;
    }

}

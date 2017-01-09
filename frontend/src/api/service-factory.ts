import {BookmarkService} from './bookmark-service';
import {BookmarkSimilarityService} from './bookmark-similarity-service';
import {HttpBookmarkService} from './http-bookmark-service';
import {HttpBookmarkSimilarityService} from './http-bookmark-similarity-service';
import {HttpUserService} from './http-user-service';
import {UserService} from './user-service';

/**
 * MockとHttp通信するサービスクラスを柔軟に入れ替えるため.
 * DIは・・・DIはないんですか？？？？
 */
export class ServiceFactory {

    private static userService: UserService;
    private static bookmarkService: BookmarkService;
    private static bookmarkSimilarityService: BookmarkSimilarityService;

    static getUserService(): UserService {
        if (!this.userService) {
            // this.userService = new MockUserService();
            this.userService = new HttpUserService();
            return this.userService;
        }

        return this.userService;
    }

    static getBookmarkService(): BookmarkService {
        if (!this.bookmarkService) {
            this.bookmarkService = new HttpBookmarkService();
            // this.bookmarkService = new MockBookmarkService();
            return this.bookmarkService;
        }

        return this.bookmarkService;
    }

    static getBookmarkSimirarityService(): BookmarkSimilarityService {
        if (!this.bookmarkSimilarityService) {
            this.bookmarkSimilarityService = new HttpBookmarkSimilarityService();
            return this.bookmarkSimilarityService;
        }

        return this.bookmarkSimilarityService;
    }

}

import {User} from '../model/user';
import {UserService} from './user-service';

/**
 * UserService ローカルで完結するMock
 */
export class MockUserService implements UserService {

    private timeout = 500;

    signUp(requestListener: RequestListener, user: User): void {
        if (user.validate() === true) {
            setTimeout(() => {
                this.signIn(requestListener, user);
            }, this.timeout);
        } else {
            requestListener.failed('user is not valid');
        }

    }

    init(requestListener: RequestListener): void {
        requestListener.ok(new User('hoge@hoge.com', ''));
    }

    signIn(requestListener: RequestListener, user: User): void {
        if (user.validate() === true) {
            setTimeout(() => {
                requestListener.ok('sign in success');
            }, this.timeout);
        } else {
            requestListener.failed('user is not valid');
        }
    }

    signOut(requestListener: RequestListener): void {
        setTimeout(() => {
            requestListener.ok('signout is success');
        }, this.timeout);
    }
}

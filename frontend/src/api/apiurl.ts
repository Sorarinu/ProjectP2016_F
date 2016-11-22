/**
 *  API AccessURLs
 */
export class ApiUrl {
    static resolvePath(path : string) : string {
        const BASE_PATH = 'https://nxtg-t.net';
        return BASE_PATH + path;
    }
}
export namespace ApiUrl {
    export const SIGN_UP = '/api/v1/signup';
    export const SIGN_IN = '/api/v1/signin';
    export const SIGN_OUT = '/api/v1/signout';

    export const BOOKMARK = '/api/v1/bookmarks';

    export const BOOKMARK_UPLOAD = '/api/v1/bookmarks/upload';
    export const BOOKMARK_EXPORT = '/api/v1/bookmarks/export';

    export const BOOKMARK_SIMIRARY = 'api/v1/bookmarks/similar';
}

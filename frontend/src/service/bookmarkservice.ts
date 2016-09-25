import {Service} from './service';
export class BookmarkService extends Service {

    private bookmarks : Bookmark[];

    constructor() {
        super();
        this.bookmarks = null;
    }
}

import {Action, Component, Getter} from 'src/vue-typed/vue-typed';
import {Actions} from 'src/vuex/actions';
import {getUploadDialogShow} from '../../../../vuex/getter';

/**
 * ブックマークファイルをアップロードするダイアログ
 */
@Component({
    template: require('./bm-upload-dialog.pug'),
    components: {
        modal: require('vue-strap').modal,
    },
})
export class BmUploadDialog {

    formData: FormData;

    fileChange(ev: Event) {
        // console.log('called' + ev);
        this.formData = new FormData();
        // TODO: formdataをボタンクリックで作ってActionへ流す
    }

    @Getter(getUploadDialogShow)
    show: boolean;

    // upload() {
    //     this.uploadBookmarkAct(null);
    //     this.closeDialog();
    // }

    // @Action(Actions.uploadBookmark)
    // uploadBookmarkAct(formData: FormData) {
    //     return;
    // }

    closeDialog() {
        this.closeDialogAct();
    }
    @Action(Actions.closeUploadDialog)
    closeDialogAct() {
        return;
    }

}

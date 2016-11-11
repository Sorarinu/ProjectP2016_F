import {Component, Action, Getter} from 'src/vue-typed/vue-typed';
import {Actions} from 'src/vuex/actions';
import {getUploadDialogShow} from '../../../../vuex/getter';

/**
 * ブックマークファイルをアップロードするダイアログ
 */
@Component({
    template: require('./bm-upload-dialog.pug'),
    components: {
        modal: require('vue-strap').modal
    }
})
export class BmUploadDialog {


    filePath : string;

    data() {
        this.filePath = '';

        return {
            filePath: this.filePath
        };
    }


    @Getter(getUploadDialogShow)
    show : boolean;


    upload() {
        this.closeDialog();
    }

    closeDialog() {
        this.closeDialogAct();
    }
    @Action(Actions.closeUploadDialog)
    closeDialogAct() {
        return;
    }

}

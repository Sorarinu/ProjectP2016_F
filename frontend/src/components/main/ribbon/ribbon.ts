import {Action, Component} from '../../../vue-typed/vue-typed';
import {Actions} from '../../../vuex/actions';
/**
 * Ribbon Component
 * リボンUIをつくるよ.
 */
require('./ribbon.scss');
@Component({
    template: require('./ribbon.pug'),
})
export class Ribbon {

    @Action(Actions.openUploadDialog)
    openUploadDialogAct() {
        return;
    }
}

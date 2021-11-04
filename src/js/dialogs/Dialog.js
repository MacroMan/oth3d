import Debug from '../debug/Debug';
import ArrayHelper from '../util/ArrayHelper';

export default class Dialog {
    constructor(config) {
        if (new.target === Dialog) throw TypeError('new of abstract class Dialog');

        this.config = config;
        this.controllers = [];
        this.gui = Debug.debug();
        for (let action in this.config.actions) {
            this.controllers.push(this.gui.addToDialog(this.config.actions, action));
        }
        this.gui.showDialog();
    }

    add(object, action) {
        const controller = this.gui.addToDialog(object, action);
        this.controllers.push(controller);
        return controller;
    }

    remove(controller) {
        this.gui.removeFromDialog(controller);
        ArrayHelper.spliceableForEach(this.controllers, (_controller, index) => {
            if (controller === _controller) {
                this.controllers.splice(index, 1);
            }
        });
    }

    destroy() {
        this.gui.removeFromDialog(this.controllers);
        this.gui.hideDialog();
    }
}

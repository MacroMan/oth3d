import * as dat from '@macroman/dat.gui';
import Events from './Events';

export default class {
    constructor() {
        this.gui = new dat.GUI();

        let obj = {
            cameraMode: () => {
                Events.fire('controls', true);
                Events.fire('build', false);
            },
            buildMode: () => {
                Events.fire('controls', false);
                Events.fire('build', true);
            },
        };

        this.gui.add(obj, 'cameraMode');
        this.gui.add(obj, 'buildMode');
    }
}

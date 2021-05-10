import * as dat from '@macroman/dat.gui';
import Events from './Events';

export default class {
    constructor() {
        this.gui = new dat.GUI();

        let obj = {
            // cameraMode: () => {
            //     Events.fire('controls', true);
            //     Events.fire('build', false);
            // },
            'GP Office': () => {
                Events.fire('build-gp', true);
            },
        };

        let buildFolder = this.gui.addFolder('Build rooms');
        buildFolder.open();
        buildFolder.add(obj, 'GP Office')

        // this.gui.add(obj, 'cameraMode');
    }
}

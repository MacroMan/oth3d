import Events from '../util/Events';
import ThreeHelper from '../util/ThreeHelper';

export default class Floor {
    constructor() {
        this.enabled = false;
        this.mouseMoveListener = null;
        this.domElement = null;
    }

    // set enabled(val) {
    //     if (val) {
    //         this.enable();
    //     } else {
    //         this.disable();
    //     }
    // }

    // get enabled() {
        // return this.enabled;
    // }

    enable() {
        this.mouseMoveListener = Events.listen('mousemove', event => this.hover(event));
    }

    disable() {
        Events.removeListenersByID(this.mouseMoveListener);
    }

    hover(event) {
        let objects = ThreeHelper.getIntersectedFloors(event, 'floor');
        if (!objects.length) {
            return;
        }

        objects.forEach(object => this.showData(event, object));
    }

    showData(event, object) {
        const content = [
            "X: " + object.coords.x,
            "Z: " + object.coords.z,
        ];

        if (this.domElement) {
            this.domElement.remove();
        }

        this.domElement = document.createElement('div');
        this.domElement.classList = "debug-hover-info";
        this.domElement.innerText = content.join('<br/>');
        this.domElement.style.left = event.clientX;
        this.domElement.style.top = event.clientY;
        document.getElementsByTagName('body')[0].append(this.domElement);
    }
}
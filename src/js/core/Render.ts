import { WebGLRenderer } from "three";

export default class Render {
    readonly renderer: WebGLRenderer;
    private readonly container: HTMLElement | null;

    constructor () {
        this.renderer = new WebGLRenderer({antialias: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.container = document.getElementById('container');
        if (this.container === null) {
            throw Error("Element `container` not found in DOM");
        }
        this.container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', () => this.onWindowResize());
    }

    onWindowResize () {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

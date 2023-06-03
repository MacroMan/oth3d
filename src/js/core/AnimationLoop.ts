import Events, {EventName} from "../Util/Events";
import {Camera, WebGLRenderer} from "three";
import Scene from "./Scene";
import {MapControls} from "../Util/OrbitControls";

export default class AnimationLoop {
    private readonly camera: Camera;
    private readonly scene: Scene;
    private readonly renderer: WebGLRenderer;
    private readonly controls: MapControls;

    constructor(camera: Camera, scene: Scene, renderer: WebGLRenderer, controls: MapControls) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.controls = controls;
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.controls.update();
        this.renderer.render(this.scene.scene, this.camera);
        Events.fire(EventName.Animate);
    }
}
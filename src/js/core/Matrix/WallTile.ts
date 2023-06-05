import { Config } from "./WallTypes";
import Scene from "../Scene";
import { FrontSide, Mesh, MeshPhongMaterial, PlaneGeometry, RepeatWrapping, TextureLoader } from "three";
import Unit from "../../Util/Unit";

export default class WallTile {
    private readonly scene: Scene;
    private readonly config: Config;
    private mesh: Mesh<PlaneGeometry, MeshPhongMaterial> | undefined;
    private isDrawn: boolean;

    constructor(scene: Scene, config: Config) {
        this.scene = scene;
        this.config = config;
        this.isDrawn = false;
    }

    draw(): void {
        const geometry = new PlaneGeometry(100, 100);
        // geometry.rotateX(-Math.PI / 2);
        geometry.translate(
            Unit.tileToPixel(this.config.x),
            0,
            Unit.tileToPixel(this.config.z)
        );

        const texture = new TextureLoader().load('/images/walls/' + this.config.texture + '.png');
        texture.repeat.set(1, 1);
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        const material = new MeshPhongMaterial({map: texture, side: FrontSide, opacity: 1, transparent: true});

        this.mesh = new Mesh(geometry, material);

        this.mesh.userData["config"] = this.config;
        this.mesh.userData["mainType"] = "wall";

        // @ts-ignore Mesh extends Object3D, so not sure why ts complains
        this.scene.add(this.mesh);
        this.isDrawn = true;
    }

    remove(): void {
        if (this.isDrawn) {
            // @ts-ignore Mesh extends Object3D, so not sure why ts complains
            this.scene.remove(this.mesh);
            this.isDrawn = false;
        }
    }
}

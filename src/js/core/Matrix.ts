import MatrixObject from "./Matrix/MatrixObject"
import {Texture} from "./Matrix/FloorTypes";
import {MatrixEntry} from "./LevelTypes";
import Scene from "./Scene";

export default class Matrix {
    private readonly matrix: any[];
    private readonly scene: Scene;

    constructor(scene: Scene, width: number, height: number, levelMatrix: Array<MatrixEntry>) {
        this.scene = scene;
        this.matrix = [];

        this.initializeMatrix(width, height);
        this.populateMatrix(levelMatrix);
    }

    initializeMatrix(width: number, height: number): void {
        for (let x = 1; x <= width; x++) {
            this.matrix[x] = [];

            for (let z = 1; z <= height; z++) {
                this.matrix[x][z] = new MatrixObject(this.scene, x, z);
            }
        }
    }

    populateMatrix(levelData: Array<MatrixEntry>) {
        levelData.forEach(data => {
            this.matrix[data.x][data.z].addFloorTile((<any>Texture)[data.t]);
        });
    }

    draw(): void {
        this.matrix.forEach(x => {
            x.forEach((object: MatrixObject) => {
                object.draw();
            });
        });
    }

    getObjectAt(x: number, z: number): MatrixObject {
        return this.matrix[x][z];
    }

    addFloorTileAt(x: number, z: number, texture: Texture): MatrixObject {
        return this.matrix[x][z].addFloorTile(texture);
    }
}
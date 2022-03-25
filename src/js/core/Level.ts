import Matrix from "./Matrix";
import { LevelData } from "./LevelTypes";
import Scene from "./Scene";

export default class Level {
    readonly matrix: Matrix;

    constructor (scene: Scene, data: LevelData) {
        this.matrix = new Matrix(scene, data.width, data.height, data.matrix);
        this.matrix.draw();
    }
}
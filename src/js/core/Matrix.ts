import MatrixObject from "./Matrix/MatrixObject"
import { Texture } from "./Matrix/FloorTypes";
import { MatrixEntry } from "./LevelTypes";
import Scene from "./Scene";
import Events, { EventName } from "../Util/Events";
import FloorTile from "./Matrix/FloorTile";

export default class Matrix {
    private readonly matrix: MatrixObject[][];
    private readonly scene: Scene;
    private hoveredTile: undefined | MatrixObject;
    private selectedTile: undefined | MatrixObject;

    constructor(scene: Scene, width: number, height: number, levelMatrix: Array<MatrixEntry>) {
        this.scene = scene;
        this.matrix = [];

        this.initializeMatrix(width, height);
        this.populateMatrix(levelMatrix);
        this.setupEvents();
    }

    initializeMatrix(width: number, height: number): void {
        for (let x = 1; x <= width; x++) {
            this.matrix[x] = [];

            for (let z = 1; z <= height; z++) {
                // @ts-ignore Object is possibly 'undefined'. We're initializing above
                this.matrix[x][z] = new MatrixObject(this.scene, x, z);
            }
        }
    }

    populateMatrix(levelData: Array<MatrixEntry>) {
        levelData.forEach(data => {
            // @ts-ignore Object is possibly 'undefined'. Err, no, it's not
            if (this.matrix[data.x] && this.matrix[data.x][data.z]) {
                // @ts-ignore
                this.matrix[data.x][data.z].addFloorTile((<any> Texture)[data.t]);
            }
        });
    }

    setupEvents() {
        [{
            listen: EventName.PointerMove,
            fire: EventName.TileChange,
            property: this.hoveredTile,
        }, {
            listen: EventName.PointerDownLeft,
            fire: EventName.TileSelect,
            property: this.selectedTile,
        }].forEach((eventData) => {
            Events.listen(eventData.listen, (event: PointerEvent) => {
                let object = this.scene.getIntersectedFloors(event, 'floor')[0];
                if (!object) {
                    return;
                }

                const matrixObject = this.getObjectAt(object.userData["config"].x, object.userData["config"].z);

                eventData.property = matrixObject;

                Events.fire(eventData.fire, matrixObject);
            });
        })
    }

    draw(): void {
        this.matrix.forEach(x => {
            x.forEach((object: MatrixObject) => {
                object.draw();
            });
        });
    }

    getObjectAt(x: number, z: number): undefined | MatrixObject {
        if (this.matrix[x]) {
            // @ts-ignore Object is possibly 'undefined'.
            return this.matrix[x][z];
        }

        return;
    }

    get hoveredObject(): undefined | MatrixObject {
        return this.hoveredTile;
    }

    get selectedObject(): undefined | MatrixObject {
        return this.selectedTile;
    }

    addFloorTileAt(x: number, z: number, texture: Texture): undefined | FloorTile {
        // @ts-ignore Object is possibly 'undefined'. Err, no, it's not
        if (this.matrix[x] && this.matrix[x][z]) {
            // @ts-ignore
            return this.matrix[x][z].addFloorTile(texture);
        }

        return;
    }
}

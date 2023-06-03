import FloorTile from "./FloorTile";
import WallTile from "./WallTile";
import {Texture} from "./FloorTypes";
import Scene from "../Scene";

/**
 * Represents a collection of floor and wall tiles at a specific in-game coordinate
 */
export default class MatrixObject {
    public readonly x: number;
    public readonly z: number;
    public readonly floorTiles: FloorTile[] = [];
    public readonly wallTiles: WallTile[] = [];
    private readonly scene: Scene;

    /**
     * @param {Scene} scene
     * @param {number} x
     * @param {number} z
     */
    constructor(scene: Scene, x: number, z: number) {
        this.scene = scene;
        this.x = x;
        this.z = z;

        // Add default floor tile of grass
        this.floorTiles.push(new FloorTile(this.scene, {x: this.x, z: this.z, texture: Texture.grass}));
    }

    /**
     * Add a new floor tile. Only the most recently added tile will be visible.
     *
     * @param texture
     * @return FloorTile
     */
    addFloorTile(texture: Texture): FloorTile {
        const floorTile = new FloorTile(this.scene, {x: this.x, z: this.z, texture: texture})
        this.floorTiles.push(floorTile);
        return floorTile;
    }

    /**
     * Remove the last added floor tile
     */
    popFloorTile(): void {
        if (this.floorTiles.length > 1) {
            this.floorTiles.pop();
        }
    }

    /**
     * Draw all tiles at this matrix coordinate
     */
    draw() {
        this.drawFloor();
        this.drawWalls();
    }

    /**
     * Draw the topmost floor tile
     */
    drawFloor(): void {
        this.floorTiles.forEach((tile: FloorTile) => {
            tile.remove();
        });

        const lastTile = this.floorTiles.at(-1) as FloorTile;
        if (lastTile) {
            lastTile.draw();
        }
    }

    /**
     * Draw the wall tiles, the topmost in each direction
     */
    drawWalls() {

    }
}
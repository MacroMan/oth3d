import Events from "../Util/Events";
import FloorTile from "../core/Matrix/FloorTile";
import Dialog from "./Dialog";
import MatrixObject from "../core/Matrix/MatrixObject";
import ArrayHelper from "../Util/ArrayHelper";
import Scene from "../core/Scene";
import Matrix from "../core/Matrix";
import Select from "./Select";
import {getTextures, Texture} from "../core/Matrix/FloorTypes";

/**
 * Allows clicking on any tile to get and change floor and wall information
 *
 * @todo Add wall tiles
 */
export default class TileInspector extends Dialog {
    private object: MatrixObject | undefined;
    private currentFloorTile: number | undefined;
    private pointerDownListener: number | undefined;
    private x: number | undefined;
    private z: number | undefined;

    constructor(scene: Scene, matrix: Matrix) {
        super(scene, matrix);

        this.moveDownButton.addEventListener('click', () => this.moveDown());
        this.moveUpButton.addEventListener('click', () => this.moveUp());
        this.addButton.addEventListener('click', () => this.add());
    }

    get id(): string {
        return 'tile-inspector';
    }

    override onOpen() {
        this.pointerDownListener = Events.listen('pointerdown-left', (event: PointerEvent) => this.onMatrixClick(event));
    }

    override onClose() {
        Events.removeListenersByID(this.pointerDownListener as number);
        this.disableAddButton();
        this.disableMoveButtons();
        delete this.object;
        delete this.currentFloorTile;
        this.floorsElement.replaceChildren();
    }

    /**
     * Get element that holds the list of floor tiles
     */
    get floorsElement(): HTMLElement {
        return this.querySelector('.floors');
    }

    /**
     * Get all floor elements
     */
    get floorChildrenElements(): NodeListOf<HTMLElement> {
        return this.floorsElement.querySelectorAll('div');
    }

    /**
     * Get the input element for the X coord
     */
    get xCoordElement(): HTMLInputElement {
        return this.querySelector('.x-coord') as HTMLInputElement;
    }

    /**
     * Get the input element for the Z coord
     */
    get zCoordElement(): HTMLInputElement {
        return this.querySelector('.z-coord') as HTMLInputElement;
    }

    /**
     * Button to move the order of the floor tile up
     */
    get moveUpButton(): HTMLElement {
        return this.querySelector('.spinner .up');
    }

    /**
     * Button to move the order of the floor tile down
     */
    get moveDownButton(): HTMLElement {
        return this.querySelector('.spinner .down');
    }

    get addButton(): HTMLElement {
        return this.querySelector('.add');
    }

    enableUpButton(): void {
        this.moveUpButton.removeAttribute('disabled');
    }

    enableDownButton(): void {
        this.moveDownButton.removeAttribute('disabled');
    }

    disableUpButton(): void {
        this.moveUpButton.setAttribute('disabled', 'disabled');
    }

    disableDownButton(): void {
        this.moveDownButton.setAttribute('disabled', 'disabled');
    }

    enableMoveButtons(): void {
        this.disableMoveButtons();

        if (this.currentFloorTile == undefined) {
            return;
        }

        if (this.currentFloorTile > 0) {
            this.enableUpButton();
        }

        if (this.currentFloorTile < this.floorChildrenElements.length - 1) {
            this.enableDownButton();
        }
    }

    disableMoveButtons(): void {
        this.disableUpButton();
        this.disableDownButton();
    }

    enableAddButton(): void {
        this.addButton.removeAttribute('disabled');
    }

    disableAddButton(): void {
        this.addButton.setAttribute('disabled', 'disabled');
    }

    /**
     * Update the dialog with the data from the clicked tile
     *
     * @param event
     */
    onMatrixClick(event: PointerEvent): void {
        let object = this.scene.getIntersectedFloors(event, 'floor')[0];
        if (!object) {
            return;
        }

        delete this.currentFloorTile;

        this.object = this.matrix
            .getObjectAt(object.userData["config"].x, object.userData["config"].z);

        this.x = this.object.x;
        this.z = this.object.z;
        this.xCoordElement.value = this.object.x as unknown as string;
        this.zCoordElement.value = this.object.z as unknown as string;

        this.populateFloorElements();

        this.enableAddButton();
        this.disableMoveButtons();
    }

    /**
     * Generate a new DOM element for a floor tile
     *
     * @param index
     * @param texture
     * @param active
     */
    newFloorElement(index: number, texture: string, active: boolean = false): HTMLElement {
        const ele = document.createElement('div');
        ele.dataset["index"] = String(index);
        ele.dataset["texture"] = texture;
        ele.textContent = texture;

        if (active) {
            ele.classList.add('active');
        }

        return ele;
    }

    populateFloorElements(): void {
        if (!this.object) {
            return;
        }

        const floorData = this.object.floorTiles.map((tile: FloorTile, index: number) => {
            return this.newFloorElement(index, tile.config.texture, index == this.currentFloorTile);
        });

        this.floorsElement.replaceChildren(...floorData);
        this.floorsElement.addEventListener('click', (event: MouseEvent) => this.onFloorClick(event));

        this.enableMoveButtons();
    }

    onFloorClick(event: MouseEvent): void {
        this.floorChildrenElements.forEach((floor: HTMLElement) => {
            floor.classList.remove('active');
        });

        const tile = (event.target as HTMLElement);
        tile.classList.add('active');
        this.currentFloorTile = tile.dataset["index"] as unknown as number;

        this.enableMoveButtons();
    }

    moveDown(): void {
        if (this.currentFloorTile == undefined || !this.object || this.currentFloorTile < 0) {
            return;
        }

        ArrayHelper.move(this.object.floorTiles, this.currentFloorTile, ++this.currentFloorTile);
        this.object.drawFloor();
        this.populateFloorElements();
    }

    moveUp(): void {
        if (this.currentFloorTile == undefined || !this.object || this.currentFloorTile > this.object.floorTiles.length - 1) {
            return;
        }

        ArrayHelper.move(this.object.floorTiles, this.currentFloorTile, --this.currentFloorTile);
        this.object.drawFloor();
        this.populateFloorElements();
    }

    add(): void {
        (new Select(this.scene, this.matrix)).show('Texture', getTextures(), (texture: string | false) => {
            if (!texture || !this.object || this.x == undefined || this.z == undefined) {
                return;
            }

            this.matrix.addFloorTileAt(this.x, this.z, texture as Texture);
            this.object.drawFloor();
            this.populateFloorElements();
        });
    }
}
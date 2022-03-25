import Matrix from "../core/Matrix";
import Scene from "../core/Scene";

export default abstract class Dialog {
    protected readonly matrix: Matrix;
    protected readonly scene: Scene;

    protected constructor(scene: Scene, matrix: Matrix) {
        this.scene = scene;
        this.matrix = matrix;

        if (this.closeElement) {
            this.closeElement.addEventListener('click', () => this.close());
        }
    }

    abstract get id(): string;

    /**
     * The dialog DOM element
     */
    get dialog(): HTMLElement {
        return document.getElementById(this.id) as HTMLElement;
    }

    /**
     * Select child elements
     *
     * @param query
     */
    querySelector(query: string): HTMLElement {
        return this.dialog.querySelector(query) as HTMLElement;
    }

    /**
     * Get the element that closes the dialog box
     */
    get closeElement(): HTMLElement {
        return this.querySelector('.close');
    }

    open(): void {
        this.dialog.classList.add("show");
        this.onOpen();
    }

    close(): void {
        this.dialog.classList.remove("show");
        this.onClose();
    }

    onOpen(): void {
    }

    onClose(): void {
    }
}
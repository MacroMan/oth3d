import Dialog from "./Dialog";
import Scene from "../core/Scene";
import Matrix from "../core/Matrix";

export default abstract class Input extends Dialog {
    protected callback: Function | undefined;
    private abortController: AbortController;

    constructor(scene: Scene, matrix: Matrix) {
        super(scene, matrix);

        this.abortController = new AbortController();
    }

    get messageElement(): HTMLElement {
        return this.querySelector('.message');
    }

    get inputElement(): HTMLInputElement {
        return <HTMLInputElement>this.querySelector('.input');
    }

    get cancelElement(): HTMLElement {
        return this.querySelector('.cancel');
    }

    get okElement(): HTMLElement {
        return this.querySelector('.ok');
    }

    protected setupCallback(callback: (value: string | false) => void): void {
        this.callback = callback;

        this.cancelElement.addEventListener('pointerup', () => this.cancelInput(), {signal: this.abortController.signal});
        this.okElement.addEventListener('pointerup', () => this.ok(), {signal: this.abortController.signal});
    }

    private removeEventListeners(): void {
        this.abortController.abort();
    }

    private cancelInput(): void {
        this.removeEventListeners();
        this.close();

        if (this.callback) {
            this.callback(false);
        }
    }

    private ok(): void {
        this.removeEventListeners();
        this.close();

        if (this.callback) {
            this.callback(this.inputElement.value);
        }
    }
}
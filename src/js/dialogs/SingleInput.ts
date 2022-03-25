import Input from "./Input";

export default class SingleInput extends Input {
    get id(): string {
        return 'input';
    }

    show(message: string, callback: (value: string | false) => void): void {
        this.messageElement.innerText = message;
        this.setupCallback(callback);

        this.open();
    }
}
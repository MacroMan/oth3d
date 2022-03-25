import Input from "./Input";

export default class Select extends Input {
    get id(): string {
        return 'select';
    }

    createOptionElement(value: string): HTMLElement {
        const ele = document.createElement('option');
        ele.innerText = value;
        ele.value = value;

        return ele;
    }

    populateOptions(options: Array<string>): void {
        const entries = options.map(value => {
            return this.createOptionElement(value);
        });

        this.inputElement.replaceChildren(...entries);
    }

    show(message: string, options: Array<string>, callback: (value: string | false) => void): void {
        this.messageElement.innerText = message;
        this.populateOptions(options);

        this.setupCallback(callback);

        this.open();
    }
}
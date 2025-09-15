export class Citta {
    constructor(private text: string, private complete: boolean) {}

    getText() {
        return this.text
    }

    isComplete() {
        return this.complete
    }

    toggleComplete(isComplete: boolean) {
        this.complete = isComplete
    }
}
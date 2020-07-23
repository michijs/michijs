import { v4 } from 'uuid';

export class IdGenerator {
    private ids: Map<string, string>;

    constructor() {
        this.ids = new Map<string, string>();
    }

    public get(key: string) {
        let returnId = '';
        if (this.ids.has(key)) {
            returnId = this.ids.get(key);
        } else {
            const newId = v4();
            this.ids.set(key, newId);
            returnId = newId;
        }
        return { id: returnId };
    }
}
import { IdGenerator } from "./IdGenerator";

export class MappedIdGenerator {
  private idGenerator = new IdGenerator();
  ids = new Map<string, string>();

  getId(key: string) {
    if (this.ids.has(key)) {
      return this.ids.get(key);
    }
    const newId = this.idGenerator.generateId();
    this.ids.set(key, newId);
    return newId;
  }

  get(key: string) {
    return { id: this.getId(key) };
  }
}

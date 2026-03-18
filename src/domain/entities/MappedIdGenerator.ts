import { IdGenerator } from "./IdGenerator";

export class MappedIdGenerator {
  private idGenerator = new IdGenerator();
  ids: Map<string, string> = new Map<string, string>();

  getId(key: string): string | undefined {
    if (this.ids.has(key)) {
      return this.ids.get(key);
    }
    const newId = this.idGenerator.generateId();
    this.ids.set(key, newId);
    return newId;
  }

  get(key: string): {
    id: string | undefined;
  } {
    return { id: this.getId(key) };
  }
}

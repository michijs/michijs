import { IdGenerator } from "./IdGenerator";

export class MappedIdGenerator {
  /**
   * @private
   */
  idGenerator = new IdGenerator();
  /**
   * @type {Map<string, string>}
   */
  ids = new Map();

  /**
   * @param {string} key
   */
  getId(key) {
    if (this.ids.has(key)) {
      return this.ids.get(key);
    }
    const newId = this.idGenerator.generateId();
    this.ids.set(key, newId);
    return newId;
  }

  /**
   * @param {string} key
   */
  get(key) {
    return { id: this.getId(key) };
  }
}

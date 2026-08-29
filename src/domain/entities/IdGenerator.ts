export class IdGenerator {
  private ids = new Set<string>();

  generateId(length = 4): string {
    let uint32: string;

    do {
      uint32 = crypto.getRandomValues(new Uint32Array(length)).join("-");
    } while (this.ids.has(uint32));

    return uint32;
  }
}

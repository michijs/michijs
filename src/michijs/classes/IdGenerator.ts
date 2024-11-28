export class IdGenerator {
  private ids = new Set<string>();

  generateId(length = 4): string {
    const cryptoObj: Crypto = window.crypto ?? window.msCrypto; // for IE 11 https://developer.mozilla.org/en-US/docs/Web/API/Window/crypto
    let uint32: string;

    do {
      uint32 = cryptoObj.getRandomValues(new Uint32Array(length)).join("-");
    } while (this.ids.has(uint32));

    return uint32;
  }
}

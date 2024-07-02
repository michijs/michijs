export class IdGenerator {
    /**
     * @private
     */
    ids = new Set();

    generateId(length = 4) {
        //TODO: Check a way to standardize this method
        const cryptoObj = window.crypto ?? window.msCrypto; // for IE 11 https://developer.mozilla.org/en-US/docs/Web/API/Window/crypto
        // let bytes = cryptoObj.getRandomValues(new Uint8Array(32));
        // const randomBytes = () => (bytes = bytes.slice(1)) && bytes[0];

        // // @ts-ignore
        // return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        // 	(c ^ randomBytes() & 15 >> c / 4).toString(16)
        // );
        let uint32;

        do {
            uint32 = cryptoObj.getRandomValues(new Uint32Array(length)).join("-");
        } while (this.ids.has(uint32));

        return uint32;
    }
}

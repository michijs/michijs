import { getBrowser } from "../utils/getBrowser";

const isSafari = ["safari", "iphone"].includes(getBrowser());

let createBuiltInElement: typeof window.customElements.define;
  if (isSafari) {
    const { overrideDocumentCreateElement, safariDefine } = await import("./safariBuiltInElements");
    overrideDocumentCreateElement();
    createBuiltInElement= safariDefine;
  }
  createBuiltInElement= window.customElements.define.bind(window.customElements);

  export {
    createBuiltInElement
  }

import { getBrowser } from "../utils/getBrowser";

const isSafari = ["safari", "iphone"].includes(getBrowser());

let createBuiltInElement: Promise<typeof window.customElements.define> | undefined;
if (isSafari)
  createBuiltInElement = import("./safariBuiltInElements").then(({ overrideDocumentCreateElement, safariDefine }) => {
    overrideDocumentCreateElement();
    return safariDefine;
  })

export { createBuiltInElement };

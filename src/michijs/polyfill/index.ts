import { getBrowser } from "../../shared/utils/getBrowser";

const isSafari = ["safari", "iphone"].includes(getBrowser());

let createBuiltInElement: typeof window.customElements.define;
removeTopLevelAwaits: {
  if (isSafari) {
    const { overrideDocumentCreateElement, safariDefine } = await import(
      "./safariBuiltInElements"
    );
    createBuiltInElement = safariDefine;
    overrideDocumentCreateElement();
  } else
    createBuiltInElement = window.customElements.define.bind(
      window.customElements,
    );
}
export { createBuiltInElement };

import { getBrowser } from "../utils/getBrowser";

const isSafari = ["safari", "iphone"].includes(getBrowser());

export const getCreateBuiltInElement: () => Promise<typeof window.customElements.define> = async () => {
  if (isSafari) {
    const { overrideDocumentCreateElement, safariDefine } = await import("./safariBuiltInElements")
    overrideDocumentCreateElement();
    return safariDefine;
  }
  return window.customElements.define.bind(window.customElements)
}
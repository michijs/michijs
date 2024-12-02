import { getBrowser } from "../utils/getBrowser";
import {
  overrideDocumentCreateElement,
  safariDefine,
} from "./safariBuiltInElements";

const isSafari = ["safari", "iphone"].includes(getBrowser());

let createBuiltInElement: typeof window.customElements.define;
if (isSafari) {
  // esbuild includes always this in the build this if splitting = true
  // const { overrideDocumentCreateElement, safariDefine } = await import(
  //   "./safariBuiltInElements"
  // );
  createBuiltInElement = safariDefine;
  overrideDocumentCreateElement();
} else
  createBuiltInElement = window.customElements.define.bind(
    window.customElements,
  );

export { createBuiltInElement };

import { isClassJSXElement } from "../typeWards/isClassJSXElement";
import { isDOMOrFragmentElement } from "../typeWards/isDOMOrFragmentElement";
import { isNotAPrimitiveJSX } from "../typeWards/isNotAPrimitiveJSX";
import { isFunctionOrClassJSXElement } from "../typeWards/isFunctionOrClassJSXElement";
import type {
  CreateOptions,
  DOMElementJSXElement,
  ObservableNonNullablePrimitiveType,
  SingleJSXElement,
} from "../types";
import { classJSXToObjectJSXElement } from "../utils/classJSXToObjectJSXElement";
import { createDOMElement } from "./createDOMElement";
import { createObject } from "./createObject";
import { createTextElement } from "./createTextElement";
import { isObservableType } from "../typeWards/isObservableType";
import { createObservableTextElement } from "./createObservableTextElement";

export function create(
  jsx: SingleJSXElement,
  options: CreateOptions = {},
): Node {
  if (jsx) {
    if (Array.isArray(jsx))
      return createDOMElement(
        {
          jsxTag: document.createDocumentFragment(),
          attrs: {
            children: jsx,
          },
        },
        options,
      );
    if (isNotAPrimitiveJSX(jsx)) {
      if ("jsxTag" in jsx) {
        //Fix for non-jsx objects
        // Solves undefined Fragment caused by some compilers
        if (isDOMOrFragmentElement(jsx)) {
          jsx.jsxTag ??= document.createDocumentFragment();
          return createDOMElement(jsx as DOMElementJSXElement, options);
        } if (isFunctionOrClassJSXElement(jsx)) {
          // Explicit casting because of tsc error
          if (isClassJSXElement(jsx))
            return createObject(classJSXToObjectJSXElement(jsx), options);
          return create(jsx.jsxTag(jsx.attrs, options), options);
        }
        return createObject(jsx, options);
      } return jsx as Node;
    } if (isObservableType(jsx))
      return createObservableTextElement(
        jsx as unknown as ObservableNonNullablePrimitiveType,
      );
    return createTextElement(jsx);
  }
  return createTextElement(jsx);
}

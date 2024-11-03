import { isClassJSXElement } from "../typeWards/isClassJSXElement";
import { isDOMOrFragmentElement } from "../typeWards/isDOMOrFragmentElement";
import { isNotAPrimitiveJSX } from "../typeWards/isNotAPrimitiveJSX";
import { isFunctionOrClassJSXElement } from "../typeWards/isFunctionOrClassJSXElement";
import type {
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

export function create<T = Node>(
  jsx: SingleJSXElement,
  contextElement?: Element,
  contextNamespace?: string,
): T {
  if (jsx) {
    if (Array.isArray(jsx))
      return createDOMElement(
        {
          jsxTag: document.createDocumentFragment(),
          attrs: {
            children: jsx,
          },
        },
        contextElement,
        contextNamespace,
      ) as T;
    if (isNotAPrimitiveJSX(jsx)) {
      if ("jsxTag" in jsx) {
        //Fix for non-jsx objects
        // Solves undefined Fragment caused by some compilers
        if (isDOMOrFragmentElement(jsx)) {
          jsx.jsxTag ??= document.createDocumentFragment();
          return createDOMElement(
            jsx as DOMElementJSXElement,
            contextElement,
            contextNamespace,
          ) as T;
        }
        if (isFunctionOrClassJSXElement(jsx)) {
          // Explicit casting because of tsc error
          if (isClassJSXElement(jsx))
            return createObject(
              classJSXToObjectJSXElement(jsx),
              contextElement,
              contextNamespace,
            ) as T;
          return create(
            jsx.jsxTag(jsx.attrs, contextElement, contextNamespace),
            contextElement,
            contextNamespace,
          );
        }
        return createObject(jsx, contextElement, contextNamespace) as T;
      }
      return jsx as T;
    }
    if (isObservableType(jsx))
      return createObservableTextElement(
        jsx as unknown as ObservableNonNullablePrimitiveType,
      ) as T;
    return createTextElement(jsx) as T;
  }
  return createTextElement(jsx) as T;
}

import { isClassJSXElement } from "../../typeWards/isClassJSXElement";
import { isDOMElement } from "../../typeWards/isDOMElement";
import { isNotAPrimitiveJSX } from "../../typeWards/isNotAPrimitiveJSX";
import { isFunctionOrClassJSXElement } from "../../typeWards/isFunctionOrClassJSXElement";
import type {
  DOMElementJSXElement,
  ObservableNonNullablePrimitiveType,
  SingleJSXElement,
} from "../../types";
import { classJSXToObjectJSXElement } from "../../utils/classJSXToObjectJSXElement";
import { createDOMElement } from "./createDOMElement";
import { createObject } from "./createObject";
import { createTextElement } from "./createTextElement";
import { isObservableType } from "../../typeWards/isObservableType";
import { createObservableTextElement } from "./createObservableTextElement";
import { createDOMFragment } from "./createDOMFragment";
import { isFragmentElement } from "../../typeWards/isFragmentElement";

export function create<T = Node>(
  jsx: SingleJSXElement,
  contextElement?: Element,
  contextNamespace?: string,
): T {
  if (jsx) {
    if (Array.isArray(jsx))
      return createDOMFragment(
        jsx,
        contextElement,
        contextNamespace,
      ) as T;
    if (isNotAPrimitiveJSX(jsx)) {
      if ("jsxTag" in jsx) {
        //Fix for non-jsx objects
        // Solves undefined Fragment caused by some compilers
        if (isFragmentElement(jsx))
          return createDOMFragment(
            jsx.attrs.children,
            contextElement,
            contextNamespace,
          ) as T;
        if(isDOMElement(jsx))
          return createDOMElement(
            jsx as DOMElementJSXElement<Element>,
            contextElement,
            contextNamespace,
          ) as T;
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

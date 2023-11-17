import { isClassJSXElement } from "../typeWards/isClassJSXElement";
import { isDOMOrFragmentElement } from "../typeWards/isDOMOrFragmentElement";
import { isNotAPrimitiveJSX } from "../typeWards/isNotAPrimitiveJSX";
import { isFunctionOrClassJSXElement } from "../typeWards/isFunctionOrClassJSXElement";
import {
  CreateOptions,
  DOMElementJSXElement,
  NonNullablePrimitiveType,
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
    else if (isNotAPrimitiveJSX(jsx)) {
      // TODO: New primitive types are object. Error
      if ("jsxTag" in jsx) {
        //Fix for non-jsx objects
        // Solves undefined Fragment caused by some compilers
        if (isDOMOrFragmentElement(jsx)) {
          jsx.jsxTag ??= document.createDocumentFragment();
          return createDOMElement(jsx as DOMElementJSXElement, options);
        } else if (isFunctionOrClassJSXElement(jsx)) {
          // Explicit casting because of tsc error
          if (isClassJSXElement(jsx))
            return createObject(classJSXToObjectJSXElement(jsx), options);
          else return create(jsx.jsxTag(jsx.attrs, options), options);
        }
        return createObject(jsx, options);
      }
      else return jsx as Node;
    } else if (isObservableType(jsx))
      return createObservableTextElement(
        jsx as unknown as ObservableNonNullablePrimitiveType,
      )
    return createTextElement(jsx);
  }
  return createTextElement(jsx);
}

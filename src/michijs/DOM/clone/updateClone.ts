import type {
  SingleJSXElement,
  DOMElementJSXElement,
  ObservableNonNullablePrimitiveType,
} from "../../types";
import { isClassJSXElement } from "../../typeWards/isClassJSXElement";
import { isDOMElement } from "../../typeWards/isDOMElement";
import { isFragmentElement } from "../../typeWards/isFragmentElement";
import { isFunctionOrClassJSXElement } from "../../typeWards/isFunctionOrClassJSXElement";
import { isNotAPrimitiveJSX } from "../../typeWards/isNotAPrimitiveJSX";
import { isObservableType } from "../../typeWards/isObservableType";
import { classJSXToObjectJSXElement } from "../../utils/classJSXToObjectJSXElement";
import { updateClonedDomElementOrObjectJSXElement } from "./updateClonedDomElementOrObjectJSXElement";
import { updateObservableTextElement } from "./updateObservableTextElement";
import { updateTextElement } from "./updateTextElement";

export const updateClone = (
  clonedNode: Node,
  jsx: SingleJSXElement,
  contextElement?: Element,
): any => {
  if (jsx) {
    if (Array.isArray(jsx)) throw "Arrays are not supported yet";
    // return createDOMFragment(
    //   jsx,
    //   contextElement,
    //   contextNamespace,
    // ) as T;
    if (isNotAPrimitiveJSX(jsx)) {
      if ("jsxTag" in jsx) {
        //Fix for non-jsx objects
        // Solves undefined Fragment caused by some compilers
        if (isFragmentElement(jsx)) throw "Fragments are not supported yet";
        //   return createDOMFragment(
        //     jsx.attrs.children,
        //     contextElement,
        //     contextNamespace,
        //   ) as T;
        if (isDOMElement(jsx))
          return updateClonedDomElementOrObjectJSXElement(
            clonedNode as Element,
            jsx as DOMElementJSXElement<Element>,
            contextElement,
          );
        if (isFunctionOrClassJSXElement(jsx)) {
          // Explicit casting because of tsc error
          if (isClassJSXElement(jsx))
            return updateClonedDomElementOrObjectJSXElement(
              clonedNode as Element,
              classJSXToObjectJSXElement(jsx),
              contextElement,
            );
          throw "Functions are not supported yet";
          // return create(
          //   jsx.jsxTag(jsx.attrs, contextElement, contextNamespace),
          //   contextElement,
          //   contextNamespace,
          // );
        }
        return updateClonedDomElementOrObjectJSXElement(
          clonedNode as Element,
          jsx,
          contextElement,
        );
      }
      throw "Nodes are not supported yet";
    }
    if (isObservableType(jsx))
      return updateObservableTextElement(
        clonedNode as Text,
        jsx as unknown as ObservableNonNullablePrimitiveType,
      );
    return updateTextElement(clonedNode as Text, jsx);
  }
  return updateTextElement(clonedNode as Text, jsx);
};

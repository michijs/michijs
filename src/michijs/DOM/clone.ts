import { updateTextCallback } from "./callbacks/updateTextCallback";
import type { ArrayJSXElement, DOMElementJSXElement, ObjectJSXElement, ObservableNonNullablePrimitiveType, SingleJSXElement } from "../types";
import { isClassJSXElement } from "../typeWards/isClassJSXElement";
import { isDOMElement } from "../typeWards/isDOMElement";
import { isFragmentElement } from "../typeWards/isFragmentElement";
import { isFunctionOrClassJSXElement } from "../typeWards/isFunctionOrClassJSXElement";
import { isNotAPrimitiveJSX } from "../typeWards/isNotAPrimitiveJSX";
import { isObservableType } from "../typeWards/isObservableType";
import { bindObservableToRef } from "../utils/bindObservableToRef";
import { classJSXToObjectJSXElement } from "../utils/classJSXToObjectJSXElement";
import { forEachChildren } from "./forEachChildren";
import { setProperties } from "./attributes/setProperties";

const UpdateCloneChildNodeCallback = (jsx: ArrayJSXElement, contextElement?: Element) => (childNode: ChildNode, i: number) => updateClone(childNode, jsx[i], contextElement);

export const updateClonedDomElementOrObjectJSXElement = (
  clonedNode: Element,
  // This has a lot of performance improvement for some reason
  { attrs: { children, ...attrs } }: DOMElementJSXElement<Element> | ObjectJSXElement,
  contextElement?: Element,
): void => {
  if (children)
    if (Array.isArray(children))
      forEachChildren(clonedNode.firstChild, UpdateCloneChildNodeCallback(children, contextElement))
    else
      updateClone(clonedNode.firstChild!, children, contextElement)

  setProperties(clonedNode, attrs, contextElement);
};

export const updateObservableTextElement = (
  clonedNode: Text,
  // This has a lot of performance improvement for some reason
  jsx: ObservableNonNullablePrimitiveType
): void => {
  // Updates text as soon as binded
  bindObservableToRef(
    jsx,
    clonedNode,
    updateTextCallback,
  );
};


export const updateClone = (clonedNode: Node, jsx: SingleJSXElement, contextElement?: Element): any => {
  // console.log(jsx)
  if (jsx) {
    if (Array.isArray(jsx))
      // Not supported
      return;
    // return createDOMFragment(
    //   jsx,
    //   contextElement,
    //   contextNamespace,
    // ) as T;
    if (isNotAPrimitiveJSX(jsx)) {
      if ("jsxTag" in jsx) {
        //Fix for non-jsx objects
        // Solves undefined Fragment caused by some compilers
        if (isFragmentElement(jsx))
          return;
        //   return createDOMFragment(
        //     jsx.attrs.children,
        //     contextElement,
        //     contextNamespace,
        //   ) as T;
        if (isDOMElement(jsx)) {
          updateClonedDomElementOrObjectJSXElement(
            clonedNode as Element,
            jsx as DOMElementJSXElement<Element>,
            contextElement
          );
          return;
        }
        if (isFunctionOrClassJSXElement(jsx)) {
          // Explicit casting because of tsc error
          if (isClassJSXElement(jsx)) {
            updateClonedDomElementOrObjectJSXElement(
              clonedNode as Element,
              classJSXToObjectJSXElement(jsx),
              contextElement
            );
            return;
          }
          return;
          // return create(
          //   jsx.jsxTag(jsx.attrs, contextElement, contextNamespace),
          //   contextElement,
          //   contextNamespace,
          // );
        }
        updateClonedDomElementOrObjectJSXElement(clonedNode as Element, jsx, contextElement);
        return;
      }
      return;
    }
    if (isObservableType(jsx))
      return updateObservableTextElement(
        clonedNode as Text,
        jsx as unknown as ObservableNonNullablePrimitiveType,
      );
    return;
  }
  return;
}

export const clone = <T = Node>(template: Node, jsx: SingleJSXElement, contextElement?: Element): T => {
  const clonedNode = template.cloneNode(true);
  updateClone(clonedNode, jsx, contextElement);
  return clonedNode as T;
}
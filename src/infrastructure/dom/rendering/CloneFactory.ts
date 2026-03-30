import { isObservable } from "@domain";
import { classJSXToObjectJSXElement } from "./classJSXToObjectJSXElement";
import { ElementFactory } from "./ElementFactory";
import type {
  CloneFactoryType,
  SingleJSXElement,
  ObservableNonNullablePrimitiveType,
} from "./types";
import { isClassJSXElement } from "./typewards/isClassJSXElement";
import { isFragmentElement } from "./typewards/isFragmentElement";
import { isFunctionOrClassJSXElement } from "./typewards/isFunctionOrClassJSXElement";
import { isNotAPrimitiveJSX } from "./typewards/isNotAPrimitiveJSX";
import { updateObservableTextElement } from "./updateObservableTextElement";
import { updateTextElement } from "./updateTextElement";

export class CloneFactory<S extends Element>
  extends ElementFactory<S>
  implements CloneFactoryType<S>
{
  private template: Node;
  clone<T = Node>(jsx: SingleJSXElement): T {
    const clonedNode = this.template.cloneNode(true);
    this.updateClone(clonedNode, jsx);
    return clonedNode as T;
  }

  override create<T = Node>(jsx: SingleJSXElement): T {
    this.template ??= super.createInternal(jsx) as unknown as Node;
    return this.clone(jsx);
  }

  updateClone(clonedNode: Node, jsx: SingleJSXElement) {
    removeNilJSXElements: {
      if (!jsx) return updateTextElement(clonedNode as Text, jsx);
    }
    if (isNotAPrimitiveJSX(jsx)) {
      removePromiseJSXElements: {
        if (jsx instanceof Promise) throw "Promises are not supported yet";
      }
      removeArrayJSXElements: {
        if (Array.isArray(jsx)) throw "Arrays are not supported yet";
      }
      removeNodeJSXElements: {
        if (jsx instanceof Node) return;
      }
      removeFragmentJSXElements: {
        if (isFragmentElement(jsx)) throw "Fragments are not supported yet";
      }
      removeFunctionAndClassJSXElements: {
        if (isFunctionOrClassJSXElement(jsx)) {
          if (isClassJSXElement(jsx)) jsx = classJSXToObjectJSXElement(jsx);
          throw "Functions are not supported yet";
        }
      }
      if (isObservable(jsx))
        return updateObservableTextElement(
          clonedNode as Text,
          jsx as unknown as ObservableNonNullablePrimitiveType,
        );
      const { children, ...attrs } = jsx.attrs;
      if (children)
        if (Array.isArray(children)) {
          let i = 0;
          for (const x of (clonedNode as ParentNode).childNodes) {
            this.updateClone(x, children[i]);
            i++;
          }
        } else this.updateClone(clonedNode.firstChild!, children);
      this.setProperties(clonedNode as Element, attrs, true);
      return clonedNode;
    }
    removeFunctionObservablesSupport: {
      if (isObservable(jsx))
        return updateObservableTextElement(
          clonedNode as Text,
          jsx as unknown as ObservableNonNullablePrimitiveType,
        );
    }
    return updateTextElement(clonedNode as Text, jsx);
  }
}

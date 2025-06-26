import { Namespaces } from "../../constants/namespaces";
import type { CSSProperties } from "../../generated/htmlType";
import type {
  ElementFactoryType,
  SingleJSXElement,
  ObservableNonNullablePrimitiveType,
  ObjectJSXElement,
  AnyObject,
  CloneFactoryType,
} from "../../types";
import { isClassJSXElement } from "../../typeWards/isClassJSXElement";
import { isDOMElement } from "../../typeWards/isDOMElement";
import { isFragmentElement } from "../../typeWards/isFragmentElement";
import { isFunctionOrClassJSXElement } from "../../typeWards/isFunctionOrClassJSXElement";
import { isMichiCustomElement } from "../../typeWards/isMichiCustomElement";
import { isNotAPrimitiveJSX } from "../../typeWards/isNotAPrimitiveJSX";
import { isObservable } from "../../typeWards/isObservable";
import { bindFunction } from "../../utils/bindFunction";
import { bindObservableToRef } from "../../utils/bindObservableToRef";
import { classJSXToObjectJSXElement } from "../../utils/classJSXToObjectJSXElement";
import { setStyle } from "../attributes/setStyle";
import { updateAttributeCallback } from "../callbacks/updateAttributeCallback";
import { updateClassCallback } from "../callbacks/updateClassCallback";
import { updatePropertyCallback } from "../callbacks/updatePropertyCallback";
import { createObservableTextElement } from "./createObservableTextElement";
import { createTextElement } from "./createTextElement";
import { updateObservableTextElement } from "./updateObservableTextElement";
import { updateTextElement } from "./updateTextElement";

export class ElementFactory<S extends Element>
  implements ElementFactoryType<S>
{
  contextElement?: S;

  constructor(contextElement?: S) {
    this.contextElement = contextElement;
  }

  setProperty(
    el: Element,
    name: string,
    newValue: any,
    shouldValidateInitialValue?: boolean,
  ): void {
    // priority to properties and events
    if (name === "_") {
      for (const propertyName in newValue)
        bindObservableToRef(
          newValue[propertyName],
          el,
          updatePropertyCallback(propertyName),
          shouldValidateInitialValue &&
            el[propertyName] === (newValue[propertyName] as any).valueOf(),
        );
      return;
    }
    removeAttributeEvents: {
      if (name.startsWith("on"))
        return el.addEventListener(
          name.slice(2),
          bindFunction(this.contextElement, newValue),
        );
    }
    removeSpecialAttributes: {
      if (name === "style" && typeof newValue === "object")
        return setStyle(el, newValue as CSSProperties);
      if (
        name === "class" &&
        isMichiCustomElement(el) &&
        el.$michi.styles.className
      )
        return bindObservableToRef(newValue, el, updateClassCallback);
    }
    return bindObservableToRef(
      newValue,
      el,
      updateAttributeCallback(name),
      shouldValidateInitialValue &&
        el.getAttribute(name) === newValue.valueOf(),
    );
  }

  setProperties(
    el: Element,
    attributes: AnyObject,
    shouldValidateInitialValue?: boolean,
  ): void {
    for (const name in attributes)
      this.setProperty(el, name, attributes[name], shouldValidateInitialValue);
  }

  protected setChildren(
    node: ParentNode,
    children?: SingleJSXElement | SingleJSXElement[],
  ) {
    if (children === undefined) return;

    if (Array.isArray(children))
      for (const x of children) node.appendChild(this.createInternal(x));
    else node.appendChild(this.createInternal(children));
  }

  protected createInternal(jsx: SingleJSXElement) {
    removeNilJSXElements: {
      if (!jsx) return createTextElement(jsx);
    }
    if (isNotAPrimitiveJSX(jsx)) {
      removeArrayJSXElements: {
        if (Array.isArray(jsx)) {
          const el = document.createDocumentFragment();
          this.setChildren(el, jsx);
          return el;
        }
      }
      removeNodeJSXElements: {
        if (!("jsxTag" in jsx)) return jsx;
      }
      removeFragmentJSXElements: {
        //Fix for non-jsx objects
        // Solves undefined Fragment caused by some compilers
        if (isFragmentElement(jsx)) {
          const el = document.createDocumentFragment();
          this.setChildren(el, jsx.attrs.children);
          return el;
        }
      }
      removeDOMJSXElements: {
        if (isDOMElement(jsx)) {
          const { children, ...attrs } = jsx.attrs;
          this.setChildren(jsx.jsxTag, children);
          this.setProperties(jsx.jsxTag, attrs);
          return jsx.jsxTag;
        }
      }
      removeFunctionAndClassJSXElements: {
        if (isFunctionOrClassJSXElement(jsx)) {
          if (isClassJSXElement(jsx)) jsx = classJSXToObjectJSXElement(jsx);
          else return this.createInternal(jsx.jsxTag(jsx.attrs, this));
        }
      }
      return this.createObject(jsx);
    }
    if (isObservable(jsx))
      return createObservableTextElement(
        jsx as unknown as ObservableNonNullablePrimitiveType,
      );
    return createTextElement(jsx);
  }

  create<T = Node>(jsx: SingleJSXElement): T {
    return this.createInternal(jsx) as T;
  }

  createObject(
    // This has a lot of performance improvement for some reason
    jsx: ObjectJSXElement,
  ): Element {
    removeSupportForNonHTMLNamespacesAndBuiltInElements: {
      const newContextNamespace = Namespaces?.[jsx.jsxTag];
      if (newContextNamespace)
        return new ElementFactoryWithNamespace(
          newContextNamespace,
          this.contextElement,
        ).createInternal(jsx);
    }
    const { children, ...attrs } = jsx.attrs;
    const el = document.createElement(jsx.jsxTag, {
      is: attrs.is,
    });
    this.setChildren(el, children);
    this.setProperties(el, attrs);
    return el;
  }
}

export class ElementFactoryWithNamespace<
  S extends Element,
> extends ElementFactory<S> {
  contextNamespace: string;
  constructor(contextNamespace: string, contextElement?: S) {
    super(contextElement);
    this.contextNamespace = contextNamespace;
  }
  override createObject = (
    // This has a lot of performance improvement for some reason
    jsx: ObjectJSXElement,
  ): Element => {
    const contextNamespaceFound = Namespaces?.[jsx.jsxTag];
    if (
      contextNamespaceFound &&
      contextNamespaceFound !== this.contextNamespace
    )
      return new ElementFactoryWithNamespace(
        contextNamespaceFound,
        this.contextElement,
      ).createInternal(jsx);

    const { children, ...attrs } = jsx.attrs;
    const el = document.createElementNS(this.contextNamespace, jsx.jsxTag, {
      is: attrs?.is,
    });
    this.setChildren(el, children);

    this.setProperties(el, attrs);

    return el;
  };
}

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
      removeArrayJSXElements: {
        if (Array.isArray(jsx)) throw "Arrays are not supported yet";
      }
      removeNodeJSXElements: {
        if (!("jsxTag" in jsx)) return;
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
    if (isObservable(jsx))
      return updateObservableTextElement(
        clonedNode as Text,
        jsx as unknown as ObservableNonNullablePrimitiveType,
      );
    return updateTextElement(clonedNode as Text, jsx);
  }
}

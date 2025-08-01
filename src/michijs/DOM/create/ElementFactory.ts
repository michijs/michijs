import { Namespaces } from "../../constants/namespaces";
import type {
  ElementFactoryType,
  SingleJSXElement,
  ObservableNonNullablePrimitiveType,
  ObjectJSXElement,
  AnyObject,
  CloneFactoryType,
} from "../../types";
import { isHTMLElement } from "../../typeWards/isHTMLElement";
import { isClassJSXElement } from "../../typeWards/isClassJSXElement";
import { isDOMElement } from "../../typeWards/isDOMElement";
import { isFragmentElement } from "../../typeWards/isFragmentElement";
import { isFunctionOrClassJSXElement } from "../../typeWards/isFunctionOrClassJSXElement";
import { isMichiCustomElement } from "../../typeWards/isMichiCustomElement";
import { isNotAPrimitiveJSX } from "../../typeWards/isNotAPrimitiveJSX";
import { isObservable } from "../../typeWards/isObservable";
import { bindObservable } from "../../utils/bindObservable";
import { formatToKebabCase } from "../../utils/formatToKebabCase";
import { bindFunction } from "../../utils/bindFunction";
import { classJSXToObjectJSXElement } from "../../utils/classJSXToObjectJSXElement";
import { createObservableTextElement } from "./createObservableTextElement";
import { createTextElement } from "./createTextElement";
import { updateObservableTextElement } from "./updateObservableTextElement";
import { updateTextElement } from "./updateTextElement";
import { isNil } from "../../utils/isNil";
import { setAttribute } from "../attributes/setAttribute";
import { GarbageCollectableObject } from "../../classes/GarbageCollectableObject";

export class AttributeManager<S extends Element> {
  contextElement?: S;
  private gc: GarbageCollectableObject<Element>;
  constructor(element: Element, contextElement?: S) {
    this.contextElement = contextElement;
    this.gc = new GarbageCollectableObject(element);
  }

  setProperty(
    name: string,
    newValue: any,
    shouldValidateInitialValue?: boolean,
  ): void {
    removePropertiesSupport: {
      // priority to properties and events
      if (name === "_") {
        for (const propertyName in newValue)
          bindObservable(newValue[propertyName], (newValue) => {
            if (
              !shouldValidateInitialValue ||
              this.gc.ref[propertyName] !== newValue[propertyName]
            )
              this.gc.ref[propertyName] = newValue;
          });
        return;
      }
    }
    if (name.startsWith("on"))
      return this.gc.ref.addEventListener(
        name.slice(2),
        bindFunction(this.contextElement, newValue),
      );
    removeSpecialAttributes: {
      if (name === "style" && typeof newValue === "object") {
        if (isHTMLElement(this.gc.ref))
          for (const [key, value] of Object.entries(newValue)) {
            const formattedKey = formatToKebabCase(key);
            // Manual Update is faster than Object.assign
            bindObservable(value, (newValue) => {
              if (!isNil(newValue))
                (this.gc.ref as HTMLElement).style.setProperty(
                  formattedKey,
                  (value as NonNullable<unknown>).toString(),
                );
              else
                (this.gc.ref as HTMLElement).style.removeProperty(formattedKey);
            });
          }
        return;
      }
      if (
        name === "class" &&
        isMichiCustomElement(this.gc.ref) &&
        this.gc.ref.$michi.styles.className
      ) {
        const newValueWithClassName = `${newValue} ${this.gc.ref.$michi.styles.className}`;
        setAttribute(this.gc.ref, "class", newValueWithClassName);
        return;
      }
    }
    return bindObservable(newValue, (newValue) => {
      if (
        !shouldValidateInitialValue ||
        this.gc.ref.getAttribute(name) !== newValue?.valueOf?.()
      )
        setAttribute(this.gc.ref, name, newValue);
    });
  }

  setProperties(
    attributes: AnyObject,
    shouldValidateInitialValue?: boolean,
  ): void {
    for (const name in attributes)
      this.setProperty(name, attributes[name], shouldValidateInitialValue);
  }
}

export class ElementFactory<S extends Element>
  implements ElementFactoryType<S> {
  contextElement?: S;

  constructor(contextElement?: S) {
    this.contextElement = contextElement;
  }

  setProperties(
    el: Element,
    attributes: AnyObject,
    shouldValidateInitialValue?: boolean,
  ): void {
    const manager = new AttributeManager(el, this.contextElement);
    for (const name in attributes)
      manager.setProperty(name, attributes[name], shouldValidateInitialValue);
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
      removePromiseJSXElements: {
        if (jsx instanceof Promise) {
          let fragment: ChildNode = document.createComment("<promise/>");
          jsx.then(x => {
            const result = this.create(x) as ChildNode;
            fragment.replaceWith(result)
            fragment = result
          })
          return fragment;
        }
      }
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
      // Observables with values
      if (isObservable(jsx))
        return createObservableTextElement(
          jsx as unknown as ObservableNonNullablePrimitiveType,
        );
      return this.createObject(jsx);
    }
    // Observables - functions
    removeFunctionObservablesSupport: {
      if (isObservable(jsx))
        return createObservableTextElement(
          jsx as unknown as ObservableNonNullablePrimitiveType,
        );
    }
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
  private contextNamespace: string;
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
  implements CloneFactoryType<S> {
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

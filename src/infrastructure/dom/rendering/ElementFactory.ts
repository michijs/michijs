import { Namespaces } from "../../platform/constants/namespaces";
import type {
  SingleJSXElement,
  ObservableNonNullablePrimitiveType,
  ObjectJSXElement,
} from "./types";
import type { AnyObject } from "@shared";
import { isHTMLElement } from "./typewards/isHTMLElement";
import { isClassJSXElement } from "./typewards/isClassJSXElement";
import { isDOMElement } from "./typewards/isDOMElement";
import { isFragmentElement } from "./typewards/isFragmentElement";
import { isFunctionOrClassJSXElement } from "./typewards/isFunctionOrClassJSXElement";
import { isNotAPrimitiveJSX } from "./typewards/isNotAPrimitiveJSX";
import { isMichiCustomElement } from "../custom-elements/typewards/isMichiCustomElement";
import {
  isObservable,
  bindObservable,
  GarbageCollectableObject,
  type ElementFactoryPort,
} from "@domain";
import { formatToKebabCase, bindFunction, isNil } from "@shared";
import { classJSXToObjectJSXElement } from "./classJSXToObjectJSXElement";
import { createObservableTextElement } from "./createObservableTextElement";
import { createTextElement } from "./createTextElement";
import { setAttribute } from "./setAttribute";

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
                  (newValue as NonNullable<unknown>).toString(),
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
  implements ElementFactoryPort<S, SingleJSXElement>
{
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
          jsx.then((x) => {
            const result = this.create(x) as ChildNode;
            fragment.replaceWith(result);
            fragment = result;
          });
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
        if (jsx instanceof Node) return jsx;
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

import { useComputedObserve, useObserve } from "../hooks";
import { IdGenerator, MappedIdGenerator } from "../classes";
import type {
  MichiCustomElement,
  CustomElementTag,
  MichiElementOptions,
  MichiElementClass,
  MichiElementSelf,
} from "../types";
import {
  formatToKebabCase,
  addStylesheetsToDocumentOrShadowRoot,
  deepEqual,
} from "../utils";
import { defineEvent } from "./properties/defineEvent";
import { definePropertyFromObservable } from "./properties/definePropertyFromObservable";
import { setReflectedAttributes } from "./properties/setReflectedAttributes";
import { defineMethod } from "./properties/defineMethod";
import { getRootNode } from "../DOM/getRootNode";
import { getAttributeValue } from "../DOM/attributes/getAttributeValue";
import { getMountPoint } from "../DOM/getMountPoint";
import { defineReflectedAttributes } from "./properties/defineReflectedAttributes";
import { useStyleSheet, convertCssObjectToCssVariablesObject } from "../css";
import type { CSSProperties } from "@michijs/htmltype";
import { create } from "../DOMDiff";

let classesIdGenerator: undefined | IdGenerator;

export function createCustomElement<
  O extends MichiElementOptions,
  S extends HTMLElement = MichiElementSelf<O>,
>(
  tag: CustomElementTag,
  elementOptions?: O & ThisType<S>,
): MichiElementClass<O, S> {
  const {
    events,
    attributes,
    reflectedAttributes,
    lifecycle,
    render,
    adoptedStyleSheets,
    extends: extendsObject,
    shadow = extendsObject ? false : { mode: "open" },
    computedStyleSheet,
    cssVariables,
    reflectedCssVariables,
    methods,
    formAssociated = false,
  } = elementOptions ?? {};
  const { class: classToExtend = HTMLElement, tag: extendsTag } =
    extendsObject ?? {};

  if (events) Object.entries(events).forEach(([key, value]) => value.init(key));

  class MichiCustomElementResult
    extends (classToExtend as CustomElementConstructor)
    implements MichiCustomElement
  {
    $michi: MichiCustomElement["$michi"] = {
      store: useObserve({
        ...attributes,
        ...reflectedAttributes,
        ...cssVariables,
        ...reflectedCssVariables,
      }),
      alreadyRendered: false,
      styles: [],
      idGen: undefined,
      internals: undefined,
    };
    connected;
    willMount;
    willConstruct;
    didConstruct;
    didMount;
    willReceiveAttribute;
    didUnmount;
    associatedCallback;
    disabledCallback;
    resetCallback;
    stateRestoreCallback;
    render = render as MichiCustomElement["render"];
    child<T extends (new () => any) | HTMLElement = HTMLElement>(
      selector: string,
    ) {
      return getRootNode(this).querySelector(
        selector,
      ) as unknown as T extends new () => any ? InstanceType<T> : T;
    }
    get idGen() {
      if (!this.$michi.idGen) {
        const idGen = new MappedIdGenerator();
        this.$michi.idGen = idGen.getId;
      }
      return this.$michi.idGen;
    }
    addStylesheets(selector: string, target: DocumentOrShadowRoot) {
      if (cssVariables || reflectedCssVariables) {
        const allCssVariables = Object.keys(cssVariables ?? {})
          .concat(Object.keys(reflectedCssVariables ?? {}))
          .reduce((previousValue, x) => {
            previousValue[x] = this[x];
            return previousValue;
          }, {});

        const parsedCssVariables = useComputedObserve(
          () => convertCssObjectToCssVariablesObject(allCssVariables),
          Object.values(allCssVariables),
        );
        const styleSheet = useStyleSheet({
          [selector]: parsedCssVariables,
        });
        addStylesheetsToDocumentOrShadowRoot(target, styleSheet);
      }
      if (computedStyleSheet) {
        const callback: () => CSSProperties = computedStyleSheet.bind(this);
        const styleSheet = useStyleSheet({ [selector]: callback() });
        addStylesheetsToDocumentOrShadowRoot(target, styleSheet);
      }
      if (adoptedStyleSheets)
        addStylesheetsToDocumentOrShadowRoot(target, ...adoptedStyleSheets);
    }
    constructor() {
      super();

      for (const key in this.$michi.store.valueOf() as object) {
        definePropertyFromObservable(this, key, this.$michi.store);
      }
      defineReflectedAttributes(this, this.$michi.store, reflectedCssVariables);
      defineReflectedAttributes(this, this.$michi.store, reflectedAttributes);
      if (shadow) {
        const attachedShadow = this.attachShadow(shadow);
        this.$michi.shadowRoot = attachedShadow;
        this.addStylesheets(":host", attachedShadow);
      }
      if (lifecycle)
        Object.entries(lifecycle).forEach(
          ([key, value]) => (this[key] = value),
        );

      this.willConstruct?.();

      if (methods)
        Object.entries(methods).forEach(([key, value]) =>
          defineMethod(this, key, value),
        );
      if (events)
        Object.entries(events).forEach(([key, value]) =>
          defineEvent(this, key, value),
        );

      if (formAssociated) this.$michi.internals = this.attachInternals();

      this.didConstruct?.();
    }

    attributeChangedCallback(name: string, oldValue, newValue) {
      if (newValue != oldValue) {
        const parsedNewValue = getAttributeValue(newValue);
        this.willReceiveAttribute?.(name, parsedNewValue, this[name]);
        let oldValueCopy;
        try {
          oldValueCopy = JSON.parse(JSON.stringify(this[name]));
        } catch {
          oldValueCopy = this[name];
        }
        if (
          parsedNewValue != oldValueCopy &&
          !deepEqual(oldValueCopy, parsedNewValue)
        )
          //Prevents type changes - ex: changing from oldValue="text" to newValue=123 on reflected attributes
          this[name] = parsedNewValue;
      }
    }

    static get extends() {
      return extendsTag;
    }
    static get tag() {
      return tag;
    }
    static get observedAttributes() {
      return Object.keys({
        ...reflectedAttributes,
        ...reflectedCssVariables,
      }).map((key) => formatToKebabCase(key));
    }

    connectedCallback() {
      if (!this.$michi.shadowRoot) {
        if (!classesIdGenerator) classesIdGenerator = new IdGenerator();
        // TODO: find a way to reuse the stylesheets probably saving them
        const newClassName = `michijs-${classesIdGenerator.generateId(1)}`;
        this.addStylesheets(
          `.${newClassName}`,
          this.getRootNode() as unknown as DocumentOrShadowRoot,
        );
        if (
          cssVariables ||
          reflectedCssVariables ||
          computedStyleSheet ||
          adoptedStyleSheets
        )
          this.classList.add(newClassName);
      }
      this.connected?.();
      setReflectedAttributes(this, MichiCustomElementResult.observedAttributes);
      if (!this.$michi.alreadyRendered) {
        this.willMount?.();
        if (this.render) {
          const newChildren = create(this.render(), {
            contextElement: this,
          });
          getMountPoint(this).append(newChildren);
        }
        this.$michi.alreadyRendered = true;
        this.didMount?.();
      }
    }

    disconnectedCallback() {
      if (!document.contains(this)) {
        this.didUnmount?.();
      }
    }

    // A11Y
    // Identify the element as a form-associated custom element
    static formAssociated = formAssociated;

    // Lifecycle
    formAssociatedCallback(form) {
      this.formAssociatedCallback?.(form);
    }
    formDisabledCallback(disabled) {
      this.formDisabledCallback?.(disabled);
    }
    formResetCallback() {
      this.formResetCallback?.();
    }
    formStateRestoreCallback(state, mode) {
      this.formStateRestoreCallback(state, mode);
    }

    // The following properties and methods aren't strictly required,
    // but browser-level form controls provide them. Providing them helps
    // ensure consistency with browser-provided controls.
    get form() {
      return this.$michi.internals?.form;
    }
    get name() {
      return this.getAttribute("name");
    }
    get type() {
      return this.localName;
    }
    get validity() {
      return this.$michi.internals?.validity;
    }
    get validationMessage() {
      return this.$michi.internals?.validationMessage;
    }
    get willValidate() {
      return this.$michi.internals?.willValidate;
    }

    checkValidity() {
      return this.$michi.internals?.checkValidity() ?? false;
    }
    reportValidity() {
      return this.$michi.internals?.reportValidity() ?? false;
    }
  }

  try {
    if (extendsTag) {
      window.customElements.define(tag, MichiCustomElementResult, {
        extends: extendsTag,
      });
    } else {
      window.customElements.define(tag, MichiCustomElementResult);
    }
  } catch {
    // In some cases it can happen that a library A imports component X and a library B that consumes A also imports component X,
    // in which case the application could crash.
    // To avoid it I catch the exception. In these cases, the first component to be registered will be taken.
  }

  return MichiCustomElementResult as any;
}

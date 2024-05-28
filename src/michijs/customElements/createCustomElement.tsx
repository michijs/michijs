import { useComputedObserve, useObserve } from "../hooks";
import { IdGenerator, MappedIdGenerator } from "../classes";
import type {
  MichiCustomElement,
  CustomElementTag,
  MichiElementOptions,
  MichiElementClass,
  MichiElementSelf,
  CSSObject,
  NoExtraProperties,
} from "../types";
import {
  formatToKebabCase,
  addStylesheetsToDocumentOrShadowRoot,
} from "../utils";
import { defineEvent } from "./properties/defineEvent";
import { definePropertyFromObservable } from "./properties/definePropertyFromObservable";
import { defineMethod } from "./properties/defineMethod";
import { getRootNode } from "../DOM/getRootNode";
import { getAttributeValue } from "../DOM/attributes/getAttributeValue";
import { getMountPoint } from "../DOM/getMountPoint";
import { defineReflectedAttributes } from "./properties/defineReflectedAttributes";
import { useStyleSheet, convertCssObjectToCssVariablesObject } from "../css";
import { create } from "../DOMDiff";
import { setProperty } from "../DOM/attributes/setProperty";

let classesIdGenerator: undefined | IdGenerator;

export function createCustomElement<
  O extends MichiElementOptions,
  S extends HTMLElement = MichiElementSelf<O>,
>(
  tag: CustomElementTag,
  elementOptions?: NoExtraProperties<MichiElementOptions, O> & ThisType<S>,
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

  const cssSelector = elementOptions?.extends
    ? `${elementOptions.extends.tag}[is="${tag}"]`
    : tag;
  const internalCssSelector = shadow ? ":host" : cssSelector;

  const mappedAdoptedStyleSheets = adoptedStyleSheets
    ? Object.values(adoptedStyleSheets).map((x) =>
      typeof x === "function" ? x(internalCssSelector) : x,
    )
    : undefined;

  if (events) Object.entries(events).forEach(([key, value]) => value.init(key));

  const storeInit = {
    ...attributes,
    ...reflectedAttributes,
    ...cssVariables,
    ...reflectedCssVariables,
  };

  class MichiCustomElementResult
    extends (classToExtend as CustomElementConstructor)
    implements MichiCustomElement {
    $michi: MichiCustomElement["$michi"] = {
      store: useObserve(storeInit),
      alreadyRendered: false,
      styles: {},
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
      this.$michi.idGen ??= new MappedIdGenerator().getId;
      return this.$michi.idGen;
    }
    addInitialStyleSheets(selector: string, target: DocumentOrShadowRoot) {
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
        ) as CSSObject;
        this.$michi.styles.cssVariables ??= useStyleSheet({
          [selector]: parsedCssVariables,
        });
        addStylesheetsToDocumentOrShadowRoot(
          target,
          this.$michi.styles.cssVariables,
        );
      }
      if (computedStyleSheet) {
        this.$michi.styles.computedStyleSheet ??= useStyleSheet(
          computedStyleSheet.bind(this)(selector) as CSSObject,
        );
        addStylesheetsToDocumentOrShadowRoot(
          target,
          this.$michi.styles.computedStyleSheet,
        );
      }
      if (mappedAdoptedStyleSheets)
        addStylesheetsToDocumentOrShadowRoot(
          target,
          ...mappedAdoptedStyleSheets,
        );
    }
    constructor() {
      super();

      for (const key in storeInit) {
        definePropertyFromObservable(this, key, this.$michi.store);
      }
      defineReflectedAttributes(this, this.$michi.store, reflectedCssVariables);
      defineReflectedAttributes(this, this.$michi.store, reflectedAttributes);
      if (shadow) {
        const attachedShadow = this.attachShadow(shadow);
        this.$michi.shadowRoot = attachedShadow;
        this.addInitialStyleSheets(":host", attachedShadow);
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
      // Running this even in the initial render because attributes can be setted before connected
      if (newValue !== oldValue) {
        const parsedNewValue = getAttributeValue(newValue);
        this.willReceiveAttribute?.(name, parsedNewValue, this[name]);
        this[name](parsedNewValue);
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
      if (
        !this.$michi.shadowRoot &&
        (cssVariables ||
          reflectedCssVariables ||
          computedStyleSheet ||
          mappedAdoptedStyleSheets)
      ) {
        if (cssVariables || reflectedCssVariables || computedStyleSheet) {
          classesIdGenerator ??= new IdGenerator();
          this.$michi.styles.className ??= `michijs-${classesIdGenerator.generateId(
            1,
          )}`;
          if (!this.classList.contains(this.$michi.styles.className))
            this.classList.add(this.$michi.styles.className);
        }
        this.addInitialStyleSheets(
          `.${this.$michi.styles.className}`,
          this.getRootNode() as unknown as DocumentOrShadowRoot,
        );
      }
      this.connected?.();
      if (!this.$michi.alreadyRendered) {
        for (const key in {
          ...reflectedAttributes,
          ...reflectedCssVariables,
        }) {
          const standarizedAttributeName = formatToKebabCase(key);
          setProperty(this, standarizedAttributeName, this[key], {
            contextElement: this,
          });
        }
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

    static elementOptions = elementOptions;
    static cssSelector = cssSelector;
    static internalCssSelector = internalCssSelector;

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
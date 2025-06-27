import type {
  MichiCustomElement,
  CustomElementTag,
  MichiElementOptions,
  MichiElementClass,
  MichiElementSelf,
  CSSObject,
  NoExtraProperties,
} from "../types";
import { formatToKebabCase } from "../utils/formatToKebabCase";
import { addStylesheetsToDocumentOrShadowRoot } from "../utils/addStylesheetsToDocumentOrShadowRoot";
import { defineEvent } from "./properties/defineEvent";
import { definePropertyFromObservable } from "./properties/definePropertyFromObservable";
import { defineMethod } from "./properties/defineMethod";
import { getAttributeValue } from "../DOM/attributes/getAttributeValue";
import { getMountPoint } from "../DOM/getMountPoint";
import { defineReflectedAttributes } from "./properties/defineReflectedAttributes";
import { useStyleSheet } from "../css/useStyleSheet";
import { convertCssObjectToCssVariablesObject } from "../css/convertCssObjectToCssVariablesObject";
import { MappedIdGenerator } from "../classes/MappedIdGenerator";
import { IdGenerator } from "../classes/IdGenerator";
import { useComputedObserve } from "../hooks/useComputedObserve";
import { useObserveInternal } from "../hooks/useObserve";
import { createBuiltInElement } from "../polyfill";
import { getShadowRoot } from "../utils/getShadowRoot";
import { AttributeManager, ElementFactory } from "../DOM/create/ElementFactory";

let classesIdGenerator: undefined | IdGenerator;

export function createCustomElement<O extends MichiElementOptions>(
  tag: CustomElementTag,
  elementOptions?: NoExtraProperties<MichiElementOptions, O> &
    ThisType<MichiElementSelf<O>>,
): MichiElementClass<O> {
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

  if (events)
    for (const [key, value] of Object.entries(events)) value.init(key);

  const storeInit = {
    ...attributes,
    ...reflectedAttributes,
    ...cssVariables,
    ...reflectedCssVariables,
  };

  class MichiCustomElementResult
    extends (classToExtend as CustomElementConstructor)
    implements MichiCustomElement
  {
    $michi: MichiCustomElement["$michi"];
    connected;
    willMount;
    willConstruct;
    didConstruct;
    didMount;
    willReceiveAttributeCallback;
    didUnmount;
    disconnected;
    associatedCallback;
    disabledCallback;
    resetCallback;
    stateRestoreCallback;
    render;
    child<T extends (new () => any) | HTMLElement = HTMLElement>(
      selector: string,
    ): T extends new () => any ? InstanceType<T> : T {
      return (getShadowRoot(this)?.querySelector(selector) ??
        this.querySelector(selector)) as unknown as T extends new () => any
        ? InstanceType<T>
        : T;
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

        const parsedCssVariables = useComputedObserve<CSSObject>(
          () => convertCssObjectToCssVariablesObject(allCssVariables),
          Object.values(allCssVariables),
        );
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

      this.fakeConstructor();
    }

    fakeConstructor() {
      this.$michi = {
        store: useObserveInternal(storeInit),
        alreadyRendered: false,
        styles: {},
        idGen: undefined,
        internals: undefined,
      };
      this.render = render as MichiCustomElement["render"];

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
        for (const [key, value] of Object.entries(lifecycle)) this[key] = value;

      this.willConstruct?.();

      if (methods)
        for (const [key, value] of Object.entries(methods))
          defineMethod(this, key, value);
      if (events)
        for (const [key, value] of Object.entries(events))
          defineEvent(this, key, value);

      if (formAssociated) this.$michi.internals = this.attachInternals();

      this.didConstruct?.();
    }

    attributeChangedCallback(name: string, oldValue, newValue) {
      // Running this even in the initial render because attributes can be setted before connected
      if (newValue !== oldValue) {
        const parsedNewValue = getAttributeValue(newValue);
        this.willReceiveAttributeCallback?.(name, parsedNewValue, this[name]);
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
        // TODO: what if svg?
        const attributeManager = new AttributeManager(this, this);
        for (const key in {
          ...reflectedAttributes,
          ...reflectedCssVariables,
        }) {
          const standarizedAttributeName = formatToKebabCase(key);
          attributeManager.setProperty(standarizedAttributeName, this[key]);
        }
        this.willMount?.();
        if (this.render) {
          const factory = new ElementFactory(this);
          const newChildren = factory.create(this.render());
          getMountPoint(this).prepend(newChildren);
        }
        this.$michi.alreadyRendered = true;
        this.didMount?.();
      }
    }

    disconnectedCallback() {
      this.disconnected?.();
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
      createBuiltInElement(tag, MichiCustomElementResult, {
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

  return MichiCustomElementResult as unknown as MichiElementClass<O>;
}

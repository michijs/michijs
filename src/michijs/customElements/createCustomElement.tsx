import { idGenerator, store } from "../hooks";
import {
  Store,
  AttributesType,
  CSSObject,
  CssVariablesType,
  EmptyObject,
  MichiCustomElement,
  MethodsType,
  CustomElementTag,
  MichiElementOptions,
  MichiElementClass,
  MichiElementSelf,
} from "../types";
import { formatToKebabCase } from "../utils/formatToKebabCase";
import { defineTransactionFromStore } from "./properties/defineTransactionFromStore";
import { defineEvent } from "./properties/defineEvent";
import { definePropertyFromStore } from "./properties/definePropertyFromStore";
import { setReflectedAttributes } from "./properties/setReflectedAttributes";
import { defineMethod } from "./properties/defineMethod";
import { deepEqual } from "../utils/deepEqual";
import { getRootNode } from "../DOM/getRootNode";
import { getAttributeValue } from "../DOM/attributes/getAttributeValue";
import { getMountPoint } from "../DOM/getMountPoint";
import { updateChildren } from "../DOMDiff";
import { defineReflectedAttributes } from "./properties/defineReflectedAttributes";
import { addStylesheetsToDocumentOrShadowRoot } from "../utils/addStylesheetsToDocumentOrShadowRoot";
import { h } from "../h";
import { createStyleSheet, createCssVariables, updateStyleSheet } from "../css";
import { cssVariablesFromCssObject } from "../css/cssVariablesFromCssObject";
import type { CSSProperties } from "@michijs/htmltype";
import { setStyleProperty } from "../DOM/attributes/setStyleProperty";

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
    nonObservedAttributes: getNonObservedAttributes,
    reflectedAttributes,
    transactions,
    observe,
    lifecycle,
    render,
    subscribeTo,
    adoptedStyleSheets,
    extends: extendsObject,
    shadow = extendsObject ? false : { mode: "open" },
    computedStyleSheet,
    cssVariables,
    reflectedCssVariables,
    methods,
    fakeRoot = !shadow,
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
      store: store.apply(this, [
        { state: { ...attributes, ...reflectedAttributes }, transactions },
      ]) as Store<AttributesType, MethodsType>,
      cssStore: store.apply(this, [
        { state: { ...cssVariables, ...reflectedCssVariables } },
      ]) as Store<CssVariablesType, EmptyObject>,
      alreadyRendered: false,
      pendingTasks: 0,
      rerenderCallback: (propertyThatChanged) => {
        if (observe)
          Object.entries(observe).forEach(([key, observer]) => {
            const matches =
              typeof propertyThatChanged === "object"
                ? propertyThatChanged.find((x) => x.startsWith(key))
                : propertyThatChanged === key;

            if (matches) {
              this.$michi.pendingTasks++;
              observer?.call(this);
              this.$michi.pendingTasks--;
            }
          });

        if (this.$michi.alreadyRendered && this.$michi.pendingTasks === 0)
          this.rerender();
      },
      styles: [],
      unSubscribeFromStore: new Array<() => void>(),
      idGen: undefined,
      internals: undefined,
    };
    connected;
    willMount;
    willUpdate;
    willConstruct;
    didConstruct;
    didMount;
    didUpdate;
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
    renderCallback() {
      const newChildren = this.render?.();
      updateChildren(
        getMountPoint(this),
        [
          ...this.$michi.styles.map((x) =>
            h.createElement(x, { $staticChildren: true }),
          ),
          newChildren,
        ],
        false,
        false,
        this,
      );
    }
    rerender() {
      this.willUpdate?.();
      this.renderCallback();
      this.didUpdate?.();
    }
    get idGen() {
      if (!this.$michi.idGen) {
        this.$michi.idGen = idGenerator().getId;
      }
      return this.$michi.idGen;
    }
    constructor() {
      super();

      for (const key in this.$michi.cssStore.state) {
        definePropertyFromStore(this, key, this.$michi.cssStore);
      }
      defineReflectedAttributes(
        this,
        this.$michi.cssStore,
        reflectedCssVariables,
      );
      if (shadow) {
        const attachedShadow = this.attachShadow(shadow);
        this.$michi.shadowRoot = attachedShadow;

        if (cssVariables || reflectedCssVariables) {
          const styleSheet = createCssVariables(
            ":host",
            this.$michi.cssStore.state as CSSObject,
          );

          addStylesheetsToDocumentOrShadowRoot(attachedShadow, styleSheet);
          this.$michi.cssStore.subscribe((propertiesThatChanged) => {
            updateStyleSheet(styleSheet, {
              [":host"]: cssVariablesFromCssObject(
                this.$michi.cssStore.state as CSSObject,
              ),
            });

            if (observe)
              Object.entries(observe).forEach(([key, observer]) => {
                const matches = propertiesThatChanged?.find((x) =>
                  x.startsWith(key),
                );
                if (matches) observer?.call(this);
              });
          });
        }
        if (computedStyleSheet) {
          const callback: () => CSSProperties = computedStyleSheet.bind(this);
          const styleSheet = createStyleSheet(callback(), [":host"]);
          addStylesheetsToDocumentOrShadowRoot(attachedShadow, styleSheet);

          const updateStylesheetCallback = () => {
            updateStyleSheet(styleSheet, callback(), [":host"]);
          };
          this.$michi.cssStore.subscribe(updateStylesheetCallback);
          this.$michi.store.subscribe(updateStylesheetCallback);
          if (subscribeTo)
            Object.values(subscribeTo).forEach((store) =>
              store.subscribe(updateStylesheetCallback),
            );
        }
        if (adoptedStyleSheets)
          addStylesheetsToDocumentOrShadowRoot(
            attachedShadow,
            ...adoptedStyleSheets,
          );
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

      for (const key in this.$michi.store.transactions) {
        defineTransactionFromStore(this, key);
      }
      for (const key in this.$michi.store.state) {
        definePropertyFromStore(this, key, this.$michi.store);
      }
      defineReflectedAttributes(this, this.$michi.store, reflectedAttributes);
      if (events)
        Object.entries(events).forEach(([key, value]) =>
          defineEvent(this, key, value),
        );
      if (getNonObservedAttributes) {
        const nonObservedAttributes = getNonObservedAttributes.apply(this);
        Object.entries(nonObservedAttributes).forEach(
          ([key, value]) => (this[key] = value),
        );
      }
      if (subscribeTo)
        Object.entries(subscribeTo).forEach(([key, value]) => {
          const subscribeFunction = (
            propertiesThatChanged?: string[] | unknown,
          ) => {
            if (propertiesThatChanged && Array.isArray(propertiesThatChanged))
              this.$michi.rerenderCallback(
                propertiesThatChanged.map((x) => `${key}.${x}`),
              ); //TODO: ?
            else this.$michi.rerenderCallback(key);
          };
          value.subscribe(subscribeFunction);
          if (value.unsubscribe)
            this.$michi.unSubscribeFromStore.push(() =>
              value.unsubscribe?.(subscribeFunction),
            );
        });

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
        if (cssVariables || reflectedCssVariables) {
          Object.entries(this.$michi.cssStore.state).forEach(([key, value]) => {
            setStyleProperty(this, `--${key}`, value);
          });

          this.$michi.cssStore.subscribe((propertiesThatChanged) => {
            propertiesThatChanged?.forEach((key) => {
              setStyleProperty(
                this,
                `--${key}`,
                this.$michi.cssStore.state[key],
              );
            });

            if (observe)
              Object.entries(observe).forEach(([key, observer]) => {
                const matches = propertiesThatChanged?.find((x) =>
                  x.startsWith(key),
                );
                if (matches) observer?.call(this);
              });
          });
        }
        if (computedStyleSheet) {
          const callback: () => CSSProperties = computedStyleSheet.bind(this);

          const updateStylesheetCallback = () => {
            Object.entries(callback()).forEach(([key, value]) => {
              setStyleProperty(this, key, value);
            });
          };
          updateStylesheetCallback();
          this.$michi.cssStore.subscribe(updateStylesheetCallback);
          this.$michi.store.subscribe(updateStylesheetCallback);
          if (subscribeTo)
            Object.values(subscribeTo).forEach((store) =>
              store.subscribe(updateStylesheetCallback),
            );
        }
        if (adoptedStyleSheets)
          addStylesheetsToDocumentOrShadowRoot(
            this.getRootNode() as unknown as DocumentOrShadowRoot,
            ...adoptedStyleSheets,
          );
      }
      this.connected?.();
      setReflectedAttributes(this, MichiCustomElementResult.observedAttributes);
      if (!this.$michi.alreadyRendered) {
        if (fakeRoot) {
          const mountPoint = getMountPoint(this);
          this.$michi.fakeRoot = document.createElement("michi-fragment");
          this.$michi.fakeRoot.$ignore = true;
          mountPoint.prepend(this.$michi.fakeRoot);
        } else if (!shadow) this.$doNotTouchChildren = true;
        this.willMount?.();
        this.renderCallback();
        this.$michi.alreadyRendered = true;
        this.$michi.store.subscribe(this.$michi.rerenderCallback);
        this.didMount?.();
      }
    }

    disconnectedCallback() {
      if (!document.contains(this)) {
        // TODO: what happens if element is moved?
        this.$michi.unSubscribeFromStore.forEach((fn) => fn());
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

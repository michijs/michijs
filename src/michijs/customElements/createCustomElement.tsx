import { idGenerator, store } from '../hooks';
import { Store, AttributesType, ComputedCssVariablesType, CreateCustomElementStaticResult, CssVariablesType, EmptyObject, EventsType, KebabCase, MichiCustomElement, MichiElementProperties, MethodsType, ReflectedAttributesType, ReflectedCssVariablesType, Self, SubscribeToType, CustomElementTag } from '../types';
import { formatToKebabCase } from '../utils/formatToKebabCase';
import { defineTransactionFromStore } from './properties/defineTransactionFromStore';
import { defineEvent } from './properties/defineEvent';
import { definePropertyFromStore } from './properties/definePropertyFromStore';
import { setReflectedAttributes } from './properties/setReflectedAttributes';
import { defineMethod } from './properties/defineMethod';
import { deepEqual } from '../utils/deepEqual';
import { getRootNode } from '../DOM/getRootNode';
import { getAttributeValue } from '../DOM/attributes/getAttributeValue';
import { getMountPoint } from '../DOM/getMountPoint';
import { updateChildren } from '../DOMDiff';
import { getCssVariableRule } from './properties/getCssVariableRule';
import { defineReflectedAttributes } from './properties/defineReflectedAttributes';
import { addStylesheetsToCustomElement } from '../utils/addStylesheetsToCustomElement';
import { h } from '../h';

export function createCustomElement<
  A extends AttributesType = EmptyObject,
  RA extends ReflectedAttributesType = EmptyObject,
  NOA extends AttributesType = EmptyObject,
  FRA = RA extends object ? {
    [k in keyof RA as KebabCase<k>]: RA[k]
  } : EmptyObject,
  M extends MethodsType = EmptyObject,
  T extends MethodsType = EmptyObject,
  E extends EventsType = EmptyObject,
  S extends SubscribeToType = EmptyObject,
  EL extends Element = HTMLElement,
  FOA extends boolean = false,
  EXTA extends keyof JSX.IntrinsicElements = undefined,
  C extends CssVariablesType = EmptyObject,
  RC extends ReflectedCssVariablesType = EmptyObject,
  FRC extends CssVariablesType = RC extends object ? {
    [k in keyof RC as KebabCase<k>]: RC[k]
  } : EmptyObject,
  CC extends ComputedCssVariablesType = EmptyObject,
  TA extends CustomElementTag = CustomElementTag
>(tag: TA, elementProperties: MichiElementProperties<M, T, E, S, A, RA, NOA, FRA, FOA, EL, EXTA, C, RC, FRC, CC> & ThisType<Self<CC, RC, C, M, T, E, A, RA, NOA, EL, FRA>> = {}): Self<CC, RC, C, M, T, E, A, RA, NOA, EL, FRA> & CreateCustomElementStaticResult<FRC, FRA, FOA, TA, EXTA> {

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
    shadow = extendsObject ? false : { mode: 'open' },
    computedCssVariables,
    cssVariables,
    reflectedCssVariables,
    methods,
    formAssociated = false
  } = elementProperties;
  const { class: classToExtend = HTMLElement, tag: extendsTag } = extendsObject ?? {};

  if (events)
    Object.entries(events).forEach(([key, value]) => value.init(key));

  class LSCustomElementResult extends (classToExtend as CustomElementConstructor) implements MichiCustomElement {
    $michi: MichiCustomElement['$michi'] = {
      store: store.apply(this, [{ state: { ...attributes, ...reflectedAttributes }, transactions }]) as Store,
      cssStore: store.apply(this, [{ state: { ...cssVariables, ...reflectedCssVariables } }]) as Store,
      alreadyRendered: false,
      pendingTasks: 0,
      rerenderCallback: (propertyThatChanged) => {
        if (observe)
          Object.entries<() => void>(observe).forEach(([key, observer]) => {
            const matches = typeof propertyThatChanged === 'object' ? propertyThatChanged.find(x => x.startsWith(key)) : propertyThatChanged === key;

            if (matches) {
              this.$michi.pendingTasks++;
              observer.call(this);
              this.$michi.pendingTasks--;
            }
          });

        if (this.$michi.alreadyRendered && this.$michi.pendingTasks === 0)
          this.rerender();
      },
      styles: [],
      unSubscribeFromStore: new Array<() => void>(),
      idGen: undefined,
      internals: undefined
    }
    willMount
    willUpdate
    didMount
    didUpdate
    willReceiveAttribute
    didUnmount
    associatedCallback
    disabledCallback
    resetCallback
    stateRestoreCallback
    render = render as MichiCustomElement['render'];
    child<T extends (new () => any) | HTMLElement = HTMLElement>(selector: string) {
      return getRootNode(this).querySelector(selector) as unknown as T extends (new () => any) ? InstanceType<T> : T;
    }
    renderCallback() {
      const newChildren = this.render?.();
      updateChildren(getMountPoint(this), [...this.$michi.styles.map(x => h.createElement(x, { $staticChildren: true })), newChildren], false, this);
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
      
      if (shadow) {
        const attachedShadow = this.attachShadow(shadow);
        if (shadow.mode === 'closed')
          this.$michi.shadowRoot = attachedShadow;
      } else
        this.$doNotTouchChildren = true;
      if (lifecycle)
        Object.entries(lifecycle).forEach(([key, value]) => this[key] = value);

      if (methods)
        Object.entries(methods).forEach(([key, value]) => defineMethod(this, key, value));

      for (const key in this.$michi.store.transactions) {
        defineTransactionFromStore(this, key);
      }
      for (const key in this.$michi.store.state) {
        definePropertyFromStore(this, key, this.$michi.store);
      }
      defineReflectedAttributes(this, reflectedAttributes, this.$michi.store);
      if (events)
        Object.entries(events).forEach(([key, value]) => defineEvent(this, key, value));
      if (getNonObservedAttributes) {
        const nonObservedAttributes = getNonObservedAttributes.apply(this);
        Object.entries(nonObservedAttributes).forEach(([key, value]) => this[key] = value);
      }
      if (subscribeTo)
        Object.entries(subscribeTo).forEach(([key, value]) => {
          const subscribeFunction = (propertiesThatChanged?: string[] | unknown) => {
            if (propertiesThatChanged && Array.isArray(propertiesThatChanged))
              this.$michi.rerenderCallback(propertiesThatChanged.map(x => `${key}.${x}`));//TODO: ?
            else
              this.$michi.rerenderCallback(key);
          };
          value.subscribe(subscribeFunction);
          if (value.unsubscribe)
            this.$michi.unSubscribeFromStore.push(() => value.unsubscribe(subscribeFunction));
        });
      for (const key in this.$michi.cssStore.state) {
        definePropertyFromStore(this, key, this.$michi.cssStore);
        const styleSheet = new CSSStyleSheet();
        const standarizedAttributeName = formatToKebabCase(key);

        styleSheet.insertRule(getCssVariableRule(standarizedAttributeName, this[key], this.cssSelector));
        addStylesheetsToCustomElement(this, false, styleSheet);
        this.$michi.cssStore.subscribe((propertiesThatChanged) => {
          if (propertiesThatChanged.find(x => x.startsWith(key)))
            styleSheet.replaceSync(getCssVariableRule(standarizedAttributeName, this[key], this.cssSelector));

          if (observe)
            Object.entries<() => void>(observe).forEach(([key, observer]) => {
              const matches = propertiesThatChanged.find(x => x.startsWith(key));
              if (matches)
                observer.call(this);
            });
        });
      }
      defineReflectedAttributes(this, reflectedCssVariables, this.$michi.cssStore);
      if (computedCssVariables)
        Object.entries(computedCssVariables).forEach(([key, value]) => {
          defineMethod(this, key, value);
          const styleSheet = new CSSStyleSheet();
          const standarizedAttributeName = formatToKebabCase(key);
          let styleSheetValue = this[key]();
          styleSheet.insertRule(getCssVariableRule(standarizedAttributeName, styleSheetValue, this.cssSelector));
          addStylesheetsToCustomElement(this, false, styleSheet);
          const updateStylesheetCallback = () => {
            const newStyleSheetValue = this[key]();
            if (styleSheetValue !== newStyleSheetValue) {
              styleSheetValue = newStyleSheetValue;
              styleSheet.replaceSync(getCssVariableRule(standarizedAttributeName, styleSheetValue, this.cssSelector));
            }
          };
          this.$michi.cssStore.subscribe(updateStylesheetCallback);
          this.$michi.store.subscribe(updateStylesheetCallback);
          if (subscribeTo)
            Object.values(subscribeTo).forEach((store) => store.subscribe(updateStylesheetCallback));
        });
      if (adoptedStyleSheets)
        addStylesheetsToCustomElement(this, true, ...adoptedStyleSheets);

      if (formAssociated)
        this.$michi.internals = this.attachInternals();
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
        if (parsedNewValue != oldValueCopy && !deepEqual(oldValueCopy, parsedNewValue))//Prevents type changes - ex: changing from oldValue="text" to newValue=123 on reflected attributes
          this[name] = parsedNewValue;
      }
    }

    static get extends() { return extendsTag; }
    static get tag() { return tag; }
    static get observedAttributes() {
      return Object.keys({ ...reflectedAttributes, ...reflectedCssVariables }).map(key => formatToKebabCase(key));
    }

    connectedCallback() {
      setReflectedAttributes(this, LSCustomElementResult.observedAttributes);
      if (!this.$michi.alreadyRendered) {
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

    get cssSelector() {
      return shadow ? ':host' : this.localName;
    }
    // The following properties and methods aren't strictly required,
    // but browser-level form controls provide them. Providing them helps
    // ensure consistency with browser-provided controls.
    get form() { return this.$michi.internals?.form; }
    get name() { return this.getAttribute('name'); }
    get type() { return this.localName; }
    get validity() { return this.$michi.internals?.validity; }
    get validationMessage() { return this.$michi.internals?.validationMessage; }
    get willValidate() { return this.$michi.internals?.willValidate; }

    checkValidity() {
      return this.$michi.internals?.checkValidity();
    }
    reportValidity() {
      return this.$michi.internals?.reportValidity();
    }
  }

  if (extendsTag) {
    window.customElements.define(tag, LSCustomElementResult, { extends: extendsTag });
  } else {
    window.customElements.define(tag, LSCustomElementResult);
  }

  return LSCustomElementResult as any;
}
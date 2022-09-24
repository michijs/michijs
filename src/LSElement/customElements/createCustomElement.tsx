import { idGenerator, lsStore } from '../hooks';
import { AttributesType, ComputedCssVariablesType, CreateCustomElementInstanceResult, CreateCustomElementStaticResult, CssVariablesType, EmptyObject, EventsType, KebabCase, LSCustomElement, LSElementProperties, MethodsType, ReflectedAttributesType, ReflectedCssVariablesType, Self, SubscribeToType, Tag } from '../types';
import { formatToKebabCase } from '../utils/formatToKebabCase';
import { defineTransactionFromStore } from './properties/defineTransactionFromStore';
import { defineEvent } from './properties/defineEvent';
import { definePropertyFromStore } from './properties/definePropertyFromStore';
import { setReflectedAttributes } from './properties/setReflectedAttributes';
import { defineMethod } from './properties/defineMethod';
import { deepEqual } from '../utils/deepEqual';
import { getRootNode } from '../DOM/getRootNode';
import { getAttributeValue } from '../DOM/attributes/getAttributeValue';
import { ListFactory } from '../DOMDiff/ListFactory';
import { getMountPoint } from '../DOM/getMountPoint';
import { updateChildren } from '../DOMDiff';
import { getCssVariableRule } from './properties/getCssVariableRule';
import { getShadowRoot } from '../utils/getShadowRoot';
import { defineReflectedAttributes } from './properties/defineReflectedAttributes';

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
  TA extends Tag = Tag
>(tag: TA, elementProperties: LSElementProperties<M, T, E, S, A, RA, NOA, FRA, FOA, EL, EXTA, C, RC, FRC, CC> & ThisType<Self<CC, RC, C, M, T, E, A, RA, NOA, EL>> = {}): CreateCustomElementInstanceResult<CC, RC, C, A, FRA, RA, M, T, E, NOA, EL> & CreateCustomElementStaticResult<FRC, FRA, FOA, TA, EXTA> {

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

  class LSCustomElementResult extends (classToExtend as CustomElementConstructor) implements LSCustomElement {
    ls: LSCustomElement['ls'] = {
      store: lsStore.apply(this, [{ state: { ...attributes, ...reflectedAttributes }, transactions }]) as ReturnType<typeof lsStore>,
      cssStore: lsStore.apply(this, [{ state: { ...cssVariables, ...reflectedCssVariables } }]) as ReturnType<typeof lsStore>,
      alreadyRendered: false,
      adoptedStyleSheets: new Map(),
      pendingTasks: 0,
      rerenderCallback: (propertyThatChanged) => {
        if (observe)
          Object.entries<() => void>(observe).forEach(([key, observer]) => {
            const matches = typeof propertyThatChanged === 'object' ? propertyThatChanged.find(x => x.startsWith(key)) : propertyThatChanged === key;

            if (matches) {
              this.ls.pendingTasks++;
              observer.call(this);
              this.ls.pendingTasks--;
            }
          });

        if (this.ls.alreadyRendered && this.ls.pendingTasks === 0)
          this.rerender();
      },
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
    render = render as LSCustomElement['render'];
    child<T extends (new () => any) | HTMLElement = HTMLElement>(selector: string) {
      return getRootNode(this).querySelector(selector) as unknown as T extends (new () => any) ? InstanceType<T> : T;
    }
    renderCallback() {
      const newChildren = this.render?.();
      const mountPoint = getMountPoint(this);
      if (Array.isArray(newChildren))
        ListFactory.update(newChildren, mountPoint, false, this);
      else
        updateChildren(mountPoint, [newChildren], false, this);
    }
    rerender() {
      this.willUpdate?.();
      this.renderCallback();
      this.didUpdate?.();
    }
    get idGen() {
      if (!this.ls.idGen) {
        this.ls.idGen = idGenerator().getId;
      }
      return this.ls.idGen;
    }
    constructor() {
      super();
      if (shadow) {
        const attachedShadow = this.attachShadow(shadow);
        if (shadow.mode === 'closed')
          this.ls.shadowRoot = attachedShadow;
      } else
        this.$doNotTouchChildren = true;
      if (lifecycle)
        Object.entries(lifecycle).forEach(([key, value]) => this[key] = value);

      if (methods)
        Object.entries(methods).forEach(([key, value]) => defineMethod(this, key, value));

      for (const key in this.ls.store.transactions) {
        defineTransactionFromStore(this, key);
      }
      for (const key in this.ls.store.state) {
        definePropertyFromStore(this, key, this.ls.store);
      }
      defineReflectedAttributes(this, reflectedAttributes, this.ls.store);
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
              this.ls.rerenderCallback(propertiesThatChanged.map(x => `${key}.${x}`));//TODO: ?
            else
              this.ls.rerenderCallback(key);
          };
          value.subscribe(subscribeFunction);
          if (value.unsubscribe)
            this.ls.unSubscribeFromStore.push(() => value.unsubscribe(subscribeFunction));
        });
      for (const key in this.ls.cssStore.state) {
        definePropertyFromStore(this, key, this.ls.cssStore);
        const styleSheet = new CSSStyleSheet();
        const standarizedAttributeName = formatToKebabCase(key);

        styleSheet.insertRule(getCssVariableRule(standarizedAttributeName, this[key], this.cssSelector));
        getShadowRoot(this).adoptedStyleSheets.push(styleSheet);
        this.ls.cssStore.subscribe((propertiesThatChanged) => {
          if (propertiesThatChanged.find(x => x.startsWith(key)))
            styleSheet.replaceSync(getCssVariableRule(standarizedAttributeName, this[key], this.cssSelector));
        });
      }
      defineReflectedAttributes(this, reflectedCssVariables, this.ls.cssStore);
      if (computedCssVariables)
        Object.entries(computedCssVariables).forEach(([key, value]) => {
          defineMethod(this, key, value);
          const styleSheet = new CSSStyleSheet();
          const standarizedAttributeName = formatToKebabCase(key);
          let styleSheetValue = this[key]();
          styleSheet.insertRule(getCssVariableRule(standarizedAttributeName, styleSheetValue, this.cssSelector));
          getShadowRoot(this).adoptedStyleSheets.push(styleSheet);
          const updateStylesheetCallback = () => {
            const newStyleSheetValue = this[key]();
            if (styleSheetValue !== newStyleSheetValue) {
              styleSheetValue = newStyleSheetValue;
              styleSheet.replaceSync(getCssVariableRule(standarizedAttributeName, styleSheetValue, this.cssSelector));
            }
          };
          this.ls.cssStore.subscribe(updateStylesheetCallback);
          this.ls.store.subscribe(updateStylesheetCallback);
          if (subscribeTo)
            Object.values(subscribeTo).forEach((store) => store.subscribe(updateStylesheetCallback));
        });

      if (formAssociated)
        this.ls.internals = this.attachInternals();
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
      if (!this.ls.alreadyRendered) {
        this.willMount?.();
        this.renderCallback();
        this.ls.alreadyRendered = true;
        this.ls.store.subscribe(this.ls.rerenderCallback);
        this.didMount?.();
      }
    }

    disconnectedCallback() {
      if (this.parentNode === null) {
        //TODO: search a better way to validate if element does not exists anymore
        // TODO: what happens if element is moved?
        this.ls.unSubscribeFromStore.forEach((fn) => fn());
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
    get form() { return this.ls.internals?.form; }
    get name() { return this.getAttribute('name'); }
    get type() { return this.localName; }
    get validity() { return this.ls.internals?.validity; }
    get validationMessage() { return this.ls.internals?.validationMessage; }
    get willValidate() { return this.ls.internals?.willValidate; }

    checkValidity() {
      return this.ls.internals?.checkValidity();
    }
    reportValidity() {
      return this.ls.internals?.reportValidity();
    }
  }

  if (extendsTag) {
    window.customElements.define(tag, LSCustomElementResult, { extends: extendsTag });
  } else {
    window.customElements.define(tag, LSCustomElementResult);
  }

  return LSCustomElementResult as any;
}
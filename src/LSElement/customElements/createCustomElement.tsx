import { idGenerator, lsStore } from '../hooks';
import { AttributesType, CreateCustomElementInstanceResult, CreateCustomElementStaticResult, EmptyObject, EventsType, KebabCase, LSCustomElement, LSElementProperties, MethodsType, Self, SubscribeToType, Tag } from '../types';
import { formatToKebabCase } from '../utils/formatToKebabCase';
import { defineTransactionFromStore } from './properties/defineTransactionFromStore';
import { defineEvent } from './properties/defineEvent';
import { definePropertyFromStore } from './properties/definePropertyFromStore';
import { setReflectedAttributes } from './properties/setReflectedAttributes';
import { defineMethod } from './properties/defineMethod';
import { deepEqual } from '../utils/deepEqual';
import { getRootNode } from '../DOM/getRootNode';
import { getAttributeValue } from '../DOM/attributes/getAttributeValue';
import { setAttributes } from '../DOM/attributes/setAttributes';
import { ListFactory } from '../DOMDiff/ListFactory';
import { getMountPoint } from '../DOM/getMountPoint';
import { updateChildren } from '../DOMDiff';

export function createCustomElement<
  A extends AttributesType = EmptyObject,
  RA extends AttributesType = EmptyObject,
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
  TA extends Tag = Tag
>(el: TA, elementProperties: LSElementProperties<M, T, E, S, A, RA, NOA, FRA, FOA, EL, EXTA> & ThisType<Self<M, T, E, A, RA, NOA, EL>> = {}): CreateCustomElementInstanceResult<A, FRA, RA, M, T, E, NOA, EL> & CreateCustomElementStaticResult<FRA, FOA, TA, EXTA> {

  const { extends: extendsTag = undefined, tag, class: classToExtend = HTMLElement } = typeof el === 'string' ? { tag: el } : el;
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
    shadow = extendsTag ? false : { mode: 'open' },
    methods,
    formAssociated = false
  } = elementProperties;

  if (events)
    Object.entries(events).forEach(([key, value]) => value.init(key));

  class LSCustomElementResult extends (classToExtend as CustomElementConstructor) implements LSCustomElement {
    ls: LSCustomElement['ls'] = {
      store: lsStore.apply(this, [{ state: { ...attributes, ...reflectedAttributes }, transactions }]) as ReturnType<typeof lsStore>,
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
        definePropertyFromStore(this, key);
      }
      if (events)
        Object.entries(events).forEach(([key, value]) => defineEvent(this, key, value));
      if (reflectedAttributes)
        for (const key in reflectedAttributes) {
          const standarizedAttributeName = formatToKebabCase(key);
          if (key !== standarizedAttributeName) {
            definePropertyFromStore(this, standarizedAttributeName, key);
          }
          this.ls.store.subscribe((propertiesThatChanged) => {
            if (propertiesThatChanged.find(x => x.startsWith(key))) {
              const newAttributes = { [standarizedAttributeName]: this.ls.store.state[key as string] };
              setAttributes(this, newAttributes, this);
            }
          });
        }
      if (getNonObservedAttributes) {
        const nonObservedAttributes = getNonObservedAttributes.apply(this);
        for (const key in nonObservedAttributes) {
          this[key] = nonObservedAttributes[key];
        }
      }
      if (subscribeTo)
        Object.entries(subscribeTo).forEach(([key, value]) => {
          const subscribeFunction = (propertyThatChanged?: string[] | unknown) => {
            if (propertyThatChanged && Array.isArray(propertyThatChanged))
              this.ls.rerenderCallback(propertyThatChanged.map(x => `${key}.${propertyThatChanged}`));//TODO: ?
            else
              this.ls.rerenderCallback(key);
          };
          value.subscribe(subscribeFunction);
          if (value.unsubscribe)
            this.ls.unSubscribeFromStore.push(() => value.unsubscribe(subscribeFunction));
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
    static get observedAttributes() { return reflectedAttributes ? Object.keys(reflectedAttributes).map(key => formatToKebabCase(key)) : []; }

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
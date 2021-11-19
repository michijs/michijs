import { idGenerator, lsStore } from '../hooks';
import { AttributesType, CreateCustomElementResult, EmptyObject, EventsType, KebabCase, LSCustomElement, LSElementConfig, LSElementProperties, MethodsType, Self, SubscribeToType } from '../types';
import { executeFirstRender } from '../DOM/executeFirstRender';
import { rerender } from '../DOM/rerender';
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

export function createCustomElement<
  A extends AttributesType = EmptyObject,
  RA extends AttributesType = EmptyObject,
  FRA = RA extends object ? { [k in keyof RA as KebabCase<k>]: RA[k] } : EmptyObject,
  M extends MethodsType = EmptyObject,
  T extends MethodsType = EmptyObject,
  E extends EventsType = EmptyObject,
  S extends SubscribeToType = EmptyObject,
  EX extends keyof JSX.IntrinsicElements = 'div',
  EL extends Element = HTMLElement
>(el: LSElementConfig<EX, EL>, elementProperties: LSElementProperties<M, T, E, S, A, RA, FRA> & ThisType<Self<M, T, E, A, RA, EL>> = {}): CreateCustomElementResult<A, FRA, RA, M, T, E, EL> {

  const { extends: extendsTag, tag, class: classToExtend } = typeof el === 'string' ? { class: HTMLElement, tag: el, extends: undefined } : el;
  const { events, attributes, reflectedAttributes, transactions, observe, lifecycle, render, subscribeTo, shadow, methods } = elementProperties;

  if (events)
    Object.entries(events).forEach(([key, value]) => value.init(key));

  class LSCustomElementResult extends (classToExtend as CustomElementConstructor) implements LSCustomElement {
    ls: LSCustomElement['ls'] = {
      store: lsStore.apply(this, [{ state: { ...attributes, ...reflectedAttributes }, transactions }]) as ReturnType<typeof lsStore>,
      alreadyRendered: false,
      adoptedStyleSheets: [],
      renderInProgress: [],
      pendingTasks: 0,
      events: {},
      rerenderCallback: (propertyThatChanged: Set<PropertyKey> | PropertyKey) => {
        if (observe)
          Object.entries<() => void>(observe).forEach(([key, observer]) => {
            const matches = typeof propertyThatChanged === 'object' ? propertyThatChanged.has(key) : propertyThatChanged === key;

            if (matches) {
              this.ls.pendingTasks++;
              observer.call(this);
              this.ls.pendingTasks--;
            }
          });

        if (this.ls.alreadyRendered && this.ls.pendingTasks === 0) {
          rerender(this);
        }
      },
      unSubscribeFromStore: new Array<() => void>(),
      idGen: undefined
    }
    willMount
    didMount
    didUnmount
    render = render as LSCustomElement['render'];
    child<T = HTMLElement>(id: string) {
      return getRootNode(this).getElementById(id) as unknown as T;
    }
    rerender() {
      rerender(this);
    }
    get idGen() {
      if (!this.ls.idGen) {
        this.ls.idGen = idGenerator().getId;
      }
      return this.ls.idGen;
    }
    constructor() {
      super();
      if ((typeof el === 'string' && shadow !== false) || (typeof el !== 'string' && shadow)) {
        const { mode, ...otherShadowOptions } = shadow ?? { mode: 'open' };
        const attachedShadow = this.attachShadow({ mode, ...otherShadowOptions });
        if (mode === 'closed') {
          this.ls.shadowRoot = attachedShadow;
        }
      }
      if (lifecycle)
        Object.entries(lifecycle).forEach(([key, value]) => {
          this[key] = value;
        });

      if (methods)
        Object.entries(methods).forEach(([key, value]) => defineMethod(this, key, value));
      Object.keys(this.ls.store.transactions).forEach(key => defineTransactionFromStore(this, key));
      Object.keys(this.ls.store.state).forEach(key => definePropertyFromStore(this, key));
      if (events)
        Object.entries(events).forEach(([key, value]) => defineEvent(this, key, value));
      if (reflectedAttributes)
        Object.keys(reflectedAttributes).forEach(key => {
          const standarizedAttributeName = formatToKebabCase(key);
          if (key !== standarizedAttributeName) {
            definePropertyFromStore(this, standarizedAttributeName, key);
          }
          this.ls.store.subscribe((propertiesThatChanged) => {
            if (propertiesThatChanged.has(key)) {
              const newAttributes = { [standarizedAttributeName]: this.ls.store.state[key] };
              const oldAttributes = { [standarizedAttributeName]: getAttributeValue(this.getAttribute(standarizedAttributeName)) };
              setAttributes({
                target: this,
                newAttributes,
                oldAttributes,
                self: this,
                events: this.ls.events
              });
            }
          });
        });
      if (subscribeTo)
        Object.entries(subscribeTo).forEach(([key, value]) => {
          const subscribeFunction = () => this.ls.rerenderCallback(key);
          value.subscribe(subscribeFunction);
          if (value.unsubscribe)
            this.ls.unSubscribeFromStore.push(() => value.unsubscribe(subscribeFunction));
        });
    }

    attributeChangedCallback(this: any, name: keyof FRA, oldValue, newValue) {
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
        executeFirstRender(this);
        this.ls.alreadyRendered = true;
        this.ls.store.subscribe(this.ls.rerenderCallback);
        this.didMount?.();
      }
    }

    disconnectedCallback() {
      if (this.parentNode === null) {//TODO: search a better way to validate if element does not exists anymore
        this.ls.unSubscribeFromStore.forEach((fn) => fn());
        this.didUnmount?.();
      }
    }
  }

  if (extendsTag) {
    window.customElements.define(tag, LSCustomElementResult, { extends: extendsTag });
  } else {
    window.customElements.define(tag, LSCustomElementResult);
  }

  return LSCustomElementResult as unknown as CreateCustomElementResult<A, FRA, RA, M, T, E, EL>;
}
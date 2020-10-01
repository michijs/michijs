import { formatToKebabCase } from '../utils/formatToKebabCase';
import type { LSCustomElement } from '../types';
import { initLsStatic } from '../properties/initLsStatic';
import { addEventDispatchers } from '../properties/addEventDispatchers';
import { addElementsReferences } from '../properties/addElementsReferences';
import { addReduxStores } from '../properties/addReduxStores';
import { getObservedAttributes } from '../properties/createGetterAndSetterForObservedAttributes';
import { connectedCallback } from '../callbacks/connectedCallback';
import { disconnectedCallback } from '../callbacks/disconnectedCallback';
import { attributeChangedCallback } from '../callbacks/attributeChangedCallback';

interface CustomizedBuiltInElementConfig {
  tag?: string;
  extends: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap;
}

const validateTag = (tag: string) => {
  if (tag.indexOf('-') <= 0) {
    throw new Error('You need at least 1 dash in the custom element name!');
  }
};

export const CustomizedBuiltInElement = function (config: CustomizedBuiltInElementConfig) {
  return function (element: CustomElementConstructor) {
    const tag = config?.tag || formatToKebabCase(element.name);
    validateTag(tag);

    element.prototype.lsStatic = initLsStatic(element.prototype.lsStatic);
    element.prototype.lsStatic.tag = tag;
    element.prototype.lsStatic.extends = config.extends;

    class newClass extends element {
      constructor() {
        super();
        const self: LSCustomElement = this;
        self.ls = self.ls || {};
        addEventDispatchers(self);
        addReduxStores(self);
        addElementsReferences(self);
      }

      attributeChangedCallback(name: string, oldValue, newValue) {
        attributeChangedCallback(this, name, oldValue, newValue);
      }

      static get observedAttributes() { return getObservedAttributes(element.prototype.lsStatic); }

      connectedCallback() {
        connectedCallback(this);
      }

      disconnectedCallback() {
        disconnectedCallback(this);
      }
    }

    window.customElements.define(tag, newClass, { extends: config.extends });

  };
};
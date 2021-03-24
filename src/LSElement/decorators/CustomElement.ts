import { formatToKebabCase } from '../utils/formatToKebabCase';
import { initLsStatic } from '../properties/initLsStatic';
import { initObservedAttributes } from '../properties/initObservedAttributes';
import { connectedCallback } from './shared/connectedCallback';
import { disconnectedCallback } from './shared/disconnectedCallback';
import { attributeChangedCallback } from './shared/attributeChangedCallback';
import { elementConstructor } from './shared/elementConstructor';
import { validateTag } from './shared/validateTag';
import { AutonomousCustomElementConfig, CustomElementConfig, CustomizedBuiltInElementConfig, LSCustomElement } from '../types';

function CustomElement(config?: CustomElementConfig) {
  return function (element: (new () => LSCustomElement) & CustomElementConstructor) {
    const { tag = formatToKebabCase(element.name), shadow = config?.extends ? false : 'open', ...otherShadowOptions } = config || {};
    validateTag(tag);

    element.prototype.lsStatic = initLsStatic(element.prototype.lsStatic);
    element.prototype.lsStatic.tag = tag;
    element.prototype.lsStatic.extends = config?.extends;

    class newClass extends element {
      constructor() {
        super();
        elementConstructor(this, shadow, otherShadowOptions);
      }

      attributeChangedCallback(name: string, oldValue, newValue) {
        attributeChangedCallback(this, name, oldValue, newValue);
      }

      static get observedAttributes() { return initObservedAttributes(element.prototype.lsStatic); }

      connectedCallback() {
        connectedCallback(this);
      }

      disconnectedCallback() {
        disconnectedCallback(this);
      }
    }

    if (config?.extends) {
      window.customElements.define(tag, newClass, { extends: config.extends });
    } else {
      window.customElements.define(tag, newClass);
    }
  };
}

export function AutonomousCustomElement(config?: AutonomousCustomElementConfig) {
  return CustomElement(config);
}

export function CustomizedBuiltInElement(config: CustomizedBuiltInElementConfig) {
  return CustomElement(config);
}
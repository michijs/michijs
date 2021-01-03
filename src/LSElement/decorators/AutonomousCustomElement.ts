import { formatToKebabCase } from '../utils/formatToKebabCase';
import type { AutonomousCustomElementConfig, LSCustomElement } from '../types';
import { initLsStatic } from '../properties/initLsStatic';
import { initObservedAttributes } from '../properties/initObservedAttributes';
import { connectedCallback } from './shared/connectedCallback';
import { disconnectedCallback } from './shared/disconnectedCallback';
import { attributeChangedCallback } from './shared/attributeChangedCallback';
import { elementConstructor } from './shared/elementConstructor';
import { validateTag } from './shared/validateTag';

export function AutonomousCustomElement(config?: AutonomousCustomElementConfig) {
  return function (element: CustomElementConstructor) {
    const tag = config?.tag || formatToKebabCase(element.name);
    validateTag(tag);

    element.prototype.lsStatic = initLsStatic(element.prototype.lsStatic);
    element.prototype.lsStatic.tag = tag;

    class newClass extends element {
      constructor() {
        super();
        const self: LSCustomElement = this;
        const useShadow = config?.shadow !== false;
        if (useShadow) {
          const shadowMode = config?.shadow || 'open';
          self.attachShadow({ mode: shadowMode });
        }
        elementConstructor(self);
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

    window.customElements.define(tag, newClass);
  };
}
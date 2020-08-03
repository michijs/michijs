import { formatToKebabCase } from '../utils/formatToKebabCase';
import type { LSCustomElement } from '../types';
import { initLsStatic } from '../properties/initLsStatic';
import { addEventDispatchers } from '../properties/addEventDispatchers';
import { addElementsReferences } from '../properties/addElementsReferences';
import { addAttributes } from '../properties/addAttributes';
import { addReduxStores } from '../properties/addReduxStores';
import { getObservedAttributes } from '../properties/createGetterAndSetterForObservedAttributes';
import { connectedCallback } from '../render/connectedCallback';
import { disconnectedCallback } from '../render/disconnectedCallback';
import { attributeChangedCallback } from '../render/attributeChangedCallback';

interface AutonomousCustomElementConfig {
	tag?: string;
	shadow?: false | 'open' | 'closed';
}

const validateTag = (tag: string) => {
	if (tag.indexOf('-') <= 0) {
		throw new Error('You need at least 1 dash in the custom element name!');
	}
};

export const AutonomousCustomElement = function (config?: AutonomousCustomElementConfig) {
	return function (element: CustomElementConstructor) {
		const tag = config?.tag || formatToKebabCase(element.name);
		validateTag(tag);

		element.prototype.lsStatic = initLsStatic(element.prototype.lsStatic);

		class newClass extends element {
			constructor() {
				super();
				const self: LSCustomElement = this;
				const useShadow = config?.shadow !== false;
				if (useShadow) {
					const shadowMode = config?.shadow || 'open';
					self.attachShadow({ mode: shadowMode });
				}
				self.ls = self.ls || {};
				addEventDispatchers(self);
				addReduxStores(self);
				addElementsReferences(self);
				addAttributes(self);
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

		window.customElements.define(tag, newClass);

	};
};
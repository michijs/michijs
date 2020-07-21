import { formatToLowerCase } from '../utils/formatToLowerCase';
import { LSCustomElement } from '../types';
import { executeFirstRender, importStyles } from './utils/RenderUtils';
import { addEventDispatchers, addElementsReferences, addProperties, addAttributes, createGetterAndSetterForObservedAttributes, convertStringToDataType } from './utils/PropertyDecoratorsUtils';
import { initLsStatic } from './utils/initLsStatic';

interface AutonomousCustomElementConfig {
	tag?: string;
	shadow?: false | 'open' | 'closed';
	// elementDefinitionOptions?: ElementDefinitionOptions
}

const validateTag = (tag: string) => {
	if (tag.indexOf('-') <= 0) {
		throw new Error('You need at least 1 dash in the custom element name!');
	}
};

export const AutonomousCustomElement = (config?: AutonomousCustomElementConfig) => (element: CustomElementConstructor) => {
	const tag = config?.tag || formatToLowerCase(element.name);
	validateTag(tag);

	// if (!config?.elementDefinitionOptions?.extends) {
	//     // const tag = getTagOf(element.prototype);
	//     if (tag) {
	//         if(!config){
	//             config = {};
	//         }
	//         if(!config.elementDefinitionOptions){
	//             config.elementDefinitionOptions = {};
	//         }
	//         config.elementDefinitionOptions.extends = tag;
	//     }
	// }

	const emptyFunction = () => { };
	const connectedCallback = element.prototype.connectedCallback || emptyFunction;
	const disconnectedCallback = element.prototype.disconnectedCallback || emptyFunction;

	element.prototype.attributeChangedCallback = function (name: string, oldValue, newValue) {
		if (newValue != oldValue) {
			this[name] = convertStringToDataType(newValue);
		}
	};
	
	element.prototype.lsStatic = initLsStatic(element.prototype.lsStatic);

	Object.defineProperty(element.prototype.constructor, 'observedAttributes', createGetterAndSetterForObservedAttributes(element.prototype.lsStatic));

	element.prototype.connectedCallback = function () {
		const self: LSCustomElement = this;
		console.log(element.prototype.lsStatic);
		// console.log(self.ls);
		// console.log(self.lsStatic);
		if (!self.ls?.alreadyConnected) {
			self.ls = {};
			const useShadow = config?.shadow !== false;
			if (useShadow) {
				const shadowMode = config?.shadow || 'open';
				self.attachShadow({ mode: shadowMode });
			}

			importStyles(self);
			addEventDispatchers(self);
			addElementsReferences(self);
			addProperties(self);
			addAttributes(self);
			executeFirstRender(self);

			//Lifecycle methods
			if (self.componentWillMount) {
				self.componentWillMount();
			}
			connectedCallback.call(self);
			if (self.componentDidMount) {
				self.componentDidMount();
			}
			self.ls.alreadyConnected = true;
		}
	};

	element.prototype.disconnectedCallback = function () {
		if (this.componentWillUnmount) {
			this.componentWillUnmount();
		}
		disconnectedCallback.call(this);
		if (this.componentDidUnmount) {
			this.componentDidUnmount();
		}
	};

	window.customElements.define(tag, element);
};

// function getTagOf(prototype) {
//     switch (true) {
//         case prototype instanceof HTMLElement:
//             return undefined;
//         case prototype instanceof HTMLButtonElement:
//             return 'button';
//         default: return undefined;
//     }
// }

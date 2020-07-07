import { formatToLowerCase } from "./formatToLowerCase";
import { ObservedAttributesType, LSCustomElement, ElementsType, PropertiesType } from "./types";

interface ComponentConfig {
    tag?: string;
    shadow?: false | 'open' | 'closed';
    elementDefinitionOptions?: ElementDefinitionOptions
}

const emptyFunction = () => { };

const validateTag = (tag: string) => {
    if (tag.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
};

export const LSElement = (config?: ComponentConfig) => (element: CustomElementConstructor) => {
    let tag = config?.tag ? config.tag : formatToLowerCase(element.name);
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

    const connectedCallback = element.prototype.connectedCallback || emptyFunction;
    const disconnectedCallback = element.prototype.disconnectedCallback || emptyFunction;

    element.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        if (newValue != oldValue) {
            this[name] = newValue;
        }
    }

    const elements: Array<ElementsType> | undefined = element.prototype.elements;
    const properties: Array<PropertiesType> | undefined = element.prototype.properties;
    const observedAttributes: Array<ObservedAttributesType> | undefined = element.prototype.observedAttributes;

    Object.defineProperty(element.prototype.constructor, 'observedAttributes', {
        get() {
            return observedAttributes ? observedAttributes.map(attribute => formatToLowerCase(attribute.propertyName)) : [];
        },
    })

    element.prototype.connectedCallback = function () {
        //If it is a builtin element cannot use shadow dom
        const useShadow = config?.shadow !== false;
        if (useShadow) {
            const shadowMode = config?.shadow ? config?.shadow : 'open';
            this.attachShadow({ mode: shadowMode });
        }
        const rootElement: ShadowRoot = useShadow ? this.shadowRoot : this;
        const renderResult: HTMLElement | Array<HTMLElement> = this.render();

        if (!renderResult) {
            throw new Error('You need to pass a template for the element');
        }
        if (Array.isArray(renderResult)) {
            renderResult.forEach(element => {
                rootElement.appendChild(element);
            });
        } else {
            rootElement.appendChild(renderResult);
        }

        if (this.styles()) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('scoped', '');
            Promise.all((this.styles() as Array<Promise<string>>)).then(styles => {
                let textArray = new Array<string>();
                if (typeof styles[0] === 'string') {
                    textArray = styles;
                    //@ts-ignore
                } else if (styles[0].default) {//Stenciljs
                    //@ts-ignore
                    textArray = styles.map(style => style.default);
                }
                styleElement.textContent = minifyString(textArray.join(' '));
                rootElement.appendChild(styleElement);
            })
        }

        elements.forEach(element => {
            delete this[element.propertyName]
            Object.defineProperty(this, element.propertyName, {
                get() {
                    return rootElement.getElementById(element.id);
                },
            })
        });

        properties.forEach(property => {
            const oldValue = this[property.propertyName];
            delete this[property.propertyName];
            if (property.options?.reflect) {
                const formattedKey = formatToLowerCase(property.propertyName);
                Object.defineProperty(this, property.propertyName, {
                    set(newValue) {
                        const oldValue = this[property.propertyName];
                        if (typeof newValue === "boolean") {
                            if (newValue) {
                                this.setAttribute(formattedKey, '');
                            } else {
                                this.removeAttribute(formattedKey)
                            }
                        } else {
                            this.setAttribute(formattedKey, newValue);
                        }
                        if (property.options.onChange) {
                            this[property.options.onChange](newValue, oldValue);
                        }
                    },
                    get() {
                        if (this.getAttribute(formattedKey) === 'true' || this.getAttribute(formattedKey) === 'false') {
                            return this.hasAttribute(formattedKey);
                        } else {
                            return this.getAttribute(formattedKey);
                        }
                    },
                });
            } else {
                Object.defineProperty(this, property.propertyName, createGetterAndSetterWithObserver(this, property.propertyName, property.options?.onChange));
            }
            this[property.propertyName] = oldValue;
        })

        observedAttributes.forEach(attribute => {
            const newAttributeId = formatToLowerCase(attribute.propertyName);
            const initialValue = this[attribute.propertyName];
            delete this[attribute.propertyName];
            Object.defineProperty(this, newAttributeId, createGetterAndSetterWithObserver(this, newAttributeId, attribute.options?.onChange));

            //First init for observedAttributes
            const attributeValue = this.getAttribute(newAttributeId);
            if (attributeValue === 'true' || attributeValue === 'false') {
                this[newAttributeId] = this.hasAttribute(newAttributeId);
            } else if (attributeValue) {
                this[newAttributeId] = attributeValue;
            } else {
                this.setAttribute(newAttributeId, initialValue)
            }
        })

        //Lifecycle methods
        if (this.componentWillMount) {
            this.componentWillMount();
        }
        connectedCallback.call(this);
        if (this.componentDidMount) {
            this.componentDidMount();
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

    window.customElements.define(tag, element, config?.elementDefinitionOptions);
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

function minifyString(string) {
    return string.replace(/\s+/g, ' ').trim();
}

const createGetterAndSetterWithObserver = (target: LSCustomElement, propertyKey: string, onChange: string) => {
    let propertyRealKey = `_${propertyKey}`;
    return {
        set(newValue) {
            const oldValue = target[propertyRealKey];
            if (target[onChange]) {
                target[onChange](newValue, oldValue);
            }
            target[propertyRealKey] = newValue;
        },
        get() {
            return target[propertyRealKey];
        },
    };
}
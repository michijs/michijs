import { formatToLowerCase } from "../utils/formatToLowerCase";
import { LSCustomElement, StylesType, LsAttributesType } from "../types";
import { CustomEventDispatcher } from "../utils/CustomEventDispatcher";

interface AutonomousCustomElementConfig {
    tag?: string;
    shadow?: false | 'open' | 'closed';
    // elementDefinitionOptions?: ElementDefinitionOptions
}

const emptyFunction = () => { };

const validateTag = (tag: string) => {
    if (tag.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
};

export const AutonomousCustomElement = (config?: AutonomousCustomElementConfig) => (element: CustomElementConstructor) => {
    let tag = config?.tag || formatToLowerCase(element.name);
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

    const lsAttributes: LsAttributesType = element.prototype.ls;

    Object.defineProperty(element.prototype.constructor, 'observedAttributes', {
        get() {
            return lsAttributes.observedAttributes.map(attribute => formatToLowerCase(attribute.propertyName));
        },
    })

    element.prototype.connectedCallback = function () {
        if (!this.ls?.alreadyConnected) {
            if (this.ls) {
                this.ls.alreadyConnected = true;
            } else {
                this.ls = { alreadyConnected: true };
            }
            //If it is a builtin element cannot use shadow dom
            const useShadow = config?.shadow !== false;
            if (useShadow) {
                const shadowMode = config?.shadow ? config?.shadow : 'open';
                this.attachShadow({ mode: shadowMode });
            }
            const rootElement: ShadowRoot = useShadow ? this.shadowRoot : this;
            const renderResult: HTMLElement | Array<HTMLElement> | undefined = this.render ? this.render() : undefined;
            const styles: StylesType | undefined = this.styles ? this.styles(): undefined;

            if (renderResult) {
                if (Array.isArray(renderResult)) {
                    renderResult.forEach(element => {
                        rootElement.appendChild(element);
                    });
                } else {
                    rootElement.appendChild(renderResult);
                }
            }

            if (styles && styles.length > 0) {
                const styleElement = document.createElement('style');
                styleElement.setAttribute('scoped', '');
                Promise.all(styles).then(styleArray => {
                    styleElement.textContent = styleArray.map(x => typeof x === 'string' ? x : x.default).join(' ');
                    rootElement.appendChild(styleElement);
                })
            }

            lsAttributes.eventsDispatchers.forEach(eventDispatcher => {
                this[eventDispatcher.propertyName] = new CustomEventDispatcher(
                    eventDispatcher.propertyName,
                    this,
                    eventDispatcher.eventInit?.bubbles,
                    eventDispatcher.eventInit?.cancelable,
                    eventDispatcher.eventInit?.composed
                );
            });

            lsAttributes.elements.forEach(element => {
                delete this[element.propertyName]
                Object.defineProperty(this, element.propertyName, {
                    get() {
                        return rootElement.getElementById(element.id);
                    },
                })
            });

            lsAttributes.properties.forEach(property => {
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

            lsAttributes.observedAttributes.forEach(attribute => {
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
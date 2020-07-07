import { formatToLowerCase } from "./formatToLowerCase";

type LSElement = {
    elements: string[],
}

type AttributeOptionsType = {
    onChange?: string;
}

function createGetterAndSetter(target: HTMLElement, propertyKey: string, onChange: string) {
    let propertyRealKey = `_${propertyKey}`;
    delete target[propertyKey];
    Object.defineProperty(target, propertyKey, {
        set(newValue) {
            const oldValue = this[propertyRealKey];
            if (this[onChange]) {
                this[onChange](newValue, oldValue);
            }
            this[propertyRealKey] = newValue;
        },
        get() {
            return this[propertyRealKey];
        },
    });
}

export function Attribute(options?: AttributeOptionsType) {
    return function (target: HTMLElement & { observedAttributes?: string[] }, propertyKey: string) {
        const trueAttributeKey = formatToLowerCase(propertyKey);
        if (!target.observedAttributes) {
            target.observedAttributes = [trueAttributeKey];
        } else {
            target.observedAttributes.push(trueAttributeKey);
        }
        createGetterAndSetter(target, trueAttributeKey, options?.onChange);
    }
}

type PropertyOptionsType = {
    reflect?: boolean;
    onChange?: string;
}

export function Property(options?: PropertyOptionsType) {
    return function (target: HTMLElement, propertyKey: string) {
        if (options?.reflect) {
            const formattedKey = formatToLowerCase(propertyKey);
            Object.defineProperty(target, propertyKey, {
                set(newValue) {
                    const oldValue = this[propertyKey];
                    if (typeof newValue === "boolean") {
                        if (newValue) {
                            this.setAttribute(formattedKey, '');
                        } else {
                            this.removeAttribute(formattedKey)
                        }
                    } else {
                        this.setAttribute(formattedKey, newValue);
                    }
                    if (options.onChange) {
                        this[options.onChange](newValue, oldValue);
                    }
                },
                get() {
                    //ver
                    if (this.getAttribute(formattedKey) === 'true' || this.getAttribute(formattedKey) === 'false') {
                        return this.hasAttribute(formattedKey);
                    } else {
                        return this.getAttribute(formattedKey);
                    }
                },
            });
        } else {
            createGetterAndSetter(target, propertyKey, options.onChange)
        }

    }
}

export function Element(options: { id: string }) {
    return function (target: HTMLElement & { elements?: string[] }, propertyKey: string) {
        target.elements(id);
        if (!target.elements) {
            target.observedAttributes = [trueAttributeKey];
        } else {
            target.observedAttributes.push(trueAttributeKey);
        }
        // Object.defineProperty(target, propertyKey, {
        //     get() {
        //         try {
        //             if (this.shadowRoot) {
        //                 return this.shadowRoot.getElementById(options.id);
        //             } else {
        //                 return this.getElementById(options.id);
        //             }
        //         }catch(error){

        //         }
        //     },
        // });
    }
}
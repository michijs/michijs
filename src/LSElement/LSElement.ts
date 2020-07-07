import { formatToLowerCase } from "./formatToLowerCase";

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

    const observedAttributes = element.prototype.observedAttributes;
    // delete element.prototype.observedAttributes;

    Object.defineProperty(element.prototype.constructor, 'observedAttributes', {
        get() {
            return observedAttributes;
        },
    })

    element.prototype.connectedCallback = function () {
        const renderResult: Array<HTMLElement> = this.render();
        if (!renderResult || renderResult.length === 0) {
            throw new Error('You need to pass a template for the element');
        }

        //If it is a builtin element cannot use shadow dom
        const canUseShadow = config?.elementDefinitionOptions?.extends === undefined;
        const useShadow = config?.shadow !== false && canUseShadow;
        if (useShadow) {
            const shadowMode = config?.shadow ? config?.shadow : 'open';
            this.attachShadow({ mode: shadowMode });
        }
        const appendTarget = useShadow ? this.shadowRoot : this;

        renderResult.forEach(element => {
            appendTarget.appendChild(element);
        });

        // this.styles().forEach((styles) => {
            const element = document.createElement('style');
            element.setAttribute('scoped','')
            element.textContent = minifyString((this.styles() as string[]).join(' '));
            appendTarget.appendChild(element);
        // })

        this.observedAttributes.forEach(attribute => {
            //ver
            const value = this.getAttribute(attribute);
            if (value === 'true' || value === 'false') {
                this[attribute] = this.hasAttribute(attribute);
            } else if (value) {
                this[attribute] = value;
            }
        });

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


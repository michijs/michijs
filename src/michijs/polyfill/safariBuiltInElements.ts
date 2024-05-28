import { isSafari } from "../utils";

console.log(isSafari);
if (true) {
  const extendedElements: Record<string, [CustomElementConstructor, string]> =
    {};

  const originalDefine = window.customElements.define.bind(
    window.customElements,
  );

  window.customElements.define = (name, constructor, options) => {
    if (options?.extends) {
      extendedElements[name] = [constructor, options.extends];
    } else originalDefine(name, constructor, options);
  };

  const originalCreateElement = document.createElement.bind(document);

  document.createElement = (
    tagName: string,
    options?: ElementCreationOptions,
  ) => {
    const newEl = originalCreateElement(tagName, options);

    if (options?.is) {
      console.log(newEl);
      const [customElement, customElementTag] = extendedElements[options.is];
      Object.setPrototypeOf(newEl, customElement.prototype);
      newEl.setAttribute("is", customElementTag);

      customElement.prototype.constructor.call(newEl);
      // @ts-ignore
      if (typeof newEl.connectedCallback === "function") {
        // @ts-ignore
        newEl.connectedCallback();
      }
      if (
        // @ts-ignore
        typeof newEl.attributeChangedCallback === "function" &&
        // @ts-ignore
        customElementPrototype.observedAttributes
      ) {
        const observer = new MutationObserver((mutationList) => {
          mutationList.forEach((mutation) => {
            switch (mutation.type) {
              case "attributes":
                // @ts-ignore
                newEl.attributeChangedCallback(
                  mutation.attributeName,
                  mutation.oldValue,
                  // @ts-ignore
                  mutation.target[mutation.attributeName],
                );
            }
          });
        });
        observer.observe(newEl, {
          // @ts-ignore
          attributeFilter: customElementPrototype.observedAttributes,
          attributeOldValue: true,
        });
      }
    }

    return newEl;
  };
}

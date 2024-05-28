import { isSafari } from "../utils";

if (isSafari) {
  const extendedElements: Record<string, [CustomElementConstructor, string]> =
    {};

  const originalDefine = window.customElements.define;

  window.customElements.define = (name, constructor, options) => {
    if (options?.extends) {
      extendedElements[name] = [constructor, options.extends];
    } else originalDefine(name, constructor, options);
  };

  const originalCreateElement = document.createElement;

  document.createElement = (
    tagName: string,
    options?: ElementCreationOptions,
  ) => {
    const newEl = originalCreateElement(tagName, options);

    if (options?.is) {
      const [customElementPrototype, customElementTag] =
        extendedElements[options.is];
      Object.setPrototypeOf(newEl, customElementPrototype);
      newEl.setAttribute("is", customElementTag);
      // @ts-ignore
      if (typeof newEl.connectedCallback === "function") {
        // @ts-ignore
        newEl.connectedCallback();
      }
      // @ts-ignore
      if (
        typeof newEl.attributeChangedCallback === "function" &&
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

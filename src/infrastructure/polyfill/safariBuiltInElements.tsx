import { GenericElement } from "../components/GenericElement";
import { create } from "../DOM/create/create";
import type { CustomElementWithCallbacks } from "../types";

export const extendedElements: Record<
  string,
  [CustomElementConstructor, string]
> = {};

export const safariDefine: typeof window.customElements.define = (
  name,
  elementConstructor,
  options,
) => {
  extendedElements[name] = [elementConstructor, options!.extends!];
};

export const overrideDocumentCreateElement = () => {
  const observer = new MutationObserver((mutationList) => {
    for (const mutation of mutationList) {
      if (mutation.type === "attributes")
        (
          mutation.target as CustomElementWithCallbacks
        ).attributeChangedCallback?.(
          mutation.attributeName!,
          mutation.oldValue,
          (mutation.target as CustomElementWithCallbacks).getAttribute(
            mutation.attributeName!,
          ),
        );
    }
  });

  const originalCreateElement = document.createElement.bind(document);
  document.createElement = (
    tagName: string,
    options?: ElementCreationOptions,
  ) => {
    const newEl = originalCreateElement(
      tagName,
      options,
    ) as CustomElementWithCallbacks;

    if (options?.is) {
      const [customElement, customElementTag] = extendedElements[options.is]!;
      Object.setPrototypeOf(newEl, customElement.prototype);
      newEl.setAttribute("is", customElementTag);

      // esbuild includes always this in the build this if splitting = true
      // import("../components/GenericElement").then(({ GenericElement }) => {
      const helper = create(
        <GenericElement
          onelementconnected={() => newEl.connectedCallback?.()}
          onelementdisconnected={() => newEl.disconnectedCallback?.()}
        />,
      );
      newEl.append(helper);
      // });

      // @ts-ignore
      newEl.fakeConstructor?.();
      if (
        // @ts-ignore
        typeof newEl.attributeChangedCallback === "function" &&
        // @ts-ignore
        customElement.observedAttributes
      ) {
        observer.observe(newEl, {
          // @ts-ignore
          attributeFilter: customElement.observedAttributes,
          attributeOldValue: true,
        });
      }
    }

    return newEl;
  };
};

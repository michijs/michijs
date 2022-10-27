import { setAttributes } from './attributes/setAttributes';

export function createElement<t extends keyof JSX.IntrinsicElements>(tagName: t, attributes?: JSX.IntrinsicElements[t], options?: ElementCreationOptions) {
  const el = document.createElement(tagName, options);
  if (attributes)
    setAttributes(el, attributes);

  return el as unknown as (t extends keyof HTMLElementTagNameMap
        ? HTMLElementTagNameMap[t]
        : (
            t extends keyof SVGElementTagNameMap
            ? SVGElementTagNameMap[t]
            : HTMLElement
        ))
    & (
        new () => {
            props?: JSX.IntrinsicElements[t]
        }
    );
}
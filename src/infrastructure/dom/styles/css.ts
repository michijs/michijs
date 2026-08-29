import {
  GarbageCollectableObject,
  useStringTemplate,
  bindObservable,
  type ObservableProxyPort,
} from "#domain";

/**
 * Allows to create a Constructable Stylesheet with a Template String.
 * Recomended extension for VSCode:
 * @link https://marketplace.visualstudio.com/items?itemName=paulmolluzzo.convert-css-in-js
 */
export function css(
  cssObject: TemplateStringsArray,
  ...props: (ObservableProxyPort<string | number> | string | number)[]
): CSSStyleSheet {
  const template = useStringTemplate(cssObject, ...props);
  const styleSheet = new CSSStyleSheet();
  const gc = new GarbageCollectableObject(styleSheet);
  bindObservable(template, (newValue) => gc.ref.replaceSync(newValue));
  return styleSheet;
}

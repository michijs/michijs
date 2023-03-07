/**
 * Allows to create a Constructable Stylesheet with a Template String.
 * Recomended extension for VSCode:
 * @link https://marketplace.visualstudio.com/items?itemName=paulmolluzzo.convert-css-in-js
 */
export const css = (
  cssObject: TemplateStringsArray,
  ...props: (string | number)[]
) => {
  const styleSheet = new CSSStyleSheet();
  styleSheet.replaceSync(
    cssObject.raw.reduce((previousValue, currentValue, i) => {
      const type = typeof props[i];
      if (type === 'string' || type === 'number')
        return `${previousValue}${currentValue}${props[i]}`;
      return `${previousValue}${currentValue}`;
      // The accumulator takes the first value if you don't pass a value as the second argument:
    }, ''),
  );
  return styleSheet;
};

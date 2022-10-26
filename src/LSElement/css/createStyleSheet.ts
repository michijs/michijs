import { CSSObject } from '../types';
import { formatToKebabCase } from '../utils/formatToKebabCase';
import { valueIsCSSObject } from '../typeWards/valueIsCSSObject';

/**Allows to create a Constructable Stylesheet with a CSSObject */
export const createStyleSheet = (cssObject: CSSObject, selectors: string[] = [], styleSheet = new CSSStyleSheet()) => {
  const ruleDeclarations = Object.entries(cssObject).reduce((previousValue, [key, value]) => {
    if (valueIsCSSObject(value)) {
      createStyleSheet(value, selectors.concat(key), styleSheet);
      return previousValue;
    } return `${previousValue}${formatToKebabCase(key)}: ${value};`;
  }, '');

  // If rule is not empty
  if (ruleDeclarations) {
    const indexMedia = selectors.findIndex(x => x.startsWith('@'));
    let endOfTheRule = '}';
    if (indexMedia !== -1) {
      const mediaSelector = selectors.splice(indexMedia, 1);
      selectors.unshift(`${mediaSelector}{`);
      endOfTheRule += '}';
    }
    // Selectors of the rule
    const ruleSelectors = selectors.join('');
    // Rules with @ should be behind other rules
    const rule = `${ruleSelectors}{${ruleDeclarations}${endOfTheRule}`;
    styleSheet.insertRule(rule);
  }
  return styleSheet;
};

/**
 * Allows to create a Constructable Stylesheet with a Template String.
 * Recomended extension for VSCode: 
 * @link https://marketplace.visualstudio.com/items?itemName=paulmolluzzo.convert-css-in-js
 */
export const css = (cssObject: TemplateStringsArray, ...props: (string | number)[]) => {
  const styleSheet = new CSSStyleSheet();
  styleSheet.replaceSync(cssObject.raw.reduce((previousValue, currentValue, i) => {
    const type = typeof props[i];
    if (type === 'string' || type === 'number')
      return `${previousValue}${currentValue}${props[i]}`;
    return `${previousValue}${currentValue}`;
  }));
  return styleSheet;
};
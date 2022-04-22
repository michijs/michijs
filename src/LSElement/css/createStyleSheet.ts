import { supportsAdoptingStyleSheets } from './supportsAdoptingStyleSheets';
import { CompatibleStyleSheet, CSSObject } from '../types';
import { formatToKebabCase } from '../utils/formatToKebabCase';
import { valueIsCSSObject } from '../typeWards/valueIsCSSObject';

const compatibleStyleSheet = () => {
  if (supportsAdoptingStyleSheets) {
    const styleSheet = new CSSStyleSheet();
    return {
      insertRule(rule: string) {
        styleSheet.insertRule(rule);
      },
      getStyleSheet() {
        return styleSheet;
      },
      replaceSync(rule: string) {
        styleSheet.replaceSync(rule);
      }
    };
  }
  const rules = [];
  return {
    insertRule(rule: string) {
      rules.push(rule);
    },
    getStyleSheet() {
      return rules.join('');
    },
    replaceSync(rule: string) {
      rules.push(rule);
    }
  };

};

/**Allows to create a Constructable Stylesheet with a CSSObject */
export const createStyleSheet = (cssObject: CSSObject | string, selectors: string[] = [], styleSheet = compatibleStyleSheet()): CompatibleStyleSheet => {
  let rule: string;
  if (typeof cssObject === 'object') {
    Object.entries(cssObject).forEach(([key, value]) => {
      if (valueIsCSSObject(value)) {
        createStyleSheet(value, selectors.concat(key), styleSheet);
      } else {
        if (!rule)
          rule = `${selectors.sort(selector => selector.startsWith('@') ? -1 : 1).map(selector => selector.startsWith('@') ? `${selector}{` : selector).join('')}{`;
        rule += `${formatToKebabCase(key)}: ${value};`;
      }
    });
    if (rule) {
      selectors.forEach((selector) => { if (selector.startsWith('@')) rule += '}'; });
      rule += '}';
      styleSheet.insertRule(rule);
    }
  } else {
    styleSheet.replaceSync(cssObject);
  }
  return styleSheet.getStyleSheet();
};

/**
 * Allows to create a Constructable Stylesheet with a Template String.
 * Recomended extension for VSCode: 
 * @link https://marketplace.visualstudio.com/items?itemName=paulmolluzzo.convert-css-in-js
 */
export const css = (cssObject: TemplateStringsArray, ...props: (string | number)[]) => {
  return createStyleSheet(cssObject.raw.map((value, i) => {
    const type = typeof props[i];
    if (type === 'string' || type === 'number') {
      return value + props[i].toString();
    }
    return value;

  }).join(''));
};
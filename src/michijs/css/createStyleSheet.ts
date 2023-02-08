import type { Attributes } from '@michijs/htmltype';
import { CSSObject } from '../types';
import { ruleListFromCssObject } from './ruleListFromCssObject';

/**Allows to create a Constructable Stylesheet with a CSSObject */
export const createStyleSheet = (cssObject: CSSObject | Attributes.CSSProperties, selectors?: string[]) => {
  const styleSheet = new CSSStyleSheet();
  const rules = ruleListFromCssObject(cssObject, selectors);

  rules.forEach(x => {
    try {
      styleSheet.insertRule(x)
    } catch (ex) {
      console.error(`Error trying to insert rule: 
${x}`)
      console.error(ex);
    }
  });
  return styleSheet
};

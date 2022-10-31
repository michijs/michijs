import { CSSObject } from '../types';
import { ruleListFromCssObject } from './ruleListFromCssObject';

/**Allows to create a Constructable Stylesheet with a CSSObject */
export const createStyleSheet = (cssObject: CSSObject) => {
  const styleSheet = new CSSStyleSheet();
  const rules = ruleListFromCssObject(cssObject);
  rules.forEach(x => styleSheet.insertRule(x));
  return styleSheet
};

import type { CSSProperties } from '@michijs/htmltype';
import { CSSObject } from '../types';
import { valueIsCSSObject } from '../typeWards/valueIsCSSObject';
import { formatToKebabCase } from '../utils';

/**
 * returns the list of rules from a css object
 */
export const ruleListFromCssObject = (
  cssObject: CSSObject | CSSProperties,
  selectors: string[] = [],
) => {
  const ruleList: string[] = [];
  const ruleDeclarations = Object.entries(cssObject).reduce(
    (previousValue, [key, value]) => {
      if (value !== undefined && value !== null) {
        if (valueIsCSSObject(value)) {
          ruleList.push(...ruleListFromCssObject(value, selectors.concat(key)));
          return previousValue;
        }
        return `${previousValue}${formatToKebabCase(key)}: ${value};`;
      } else return previousValue;
    },
    '',
  );

  // If rule is not empty
  if (ruleDeclarations) {
    const [atRules, previousNotAtRules] = selectors.reduce(
      ([previousAtRules, previousNotAtRules], rule) => {
        if (rule.startsWith('@')) previousAtRules.push(rule);
        else previousNotAtRules.push(rule);
        return [previousAtRules, previousNotAtRules];
      },
      [new Array<string>(), new Array<string>()],
    );

    let ruleStart = '';
    let ruleEnd = '';

    if (previousNotAtRules.length > 0) {
      ruleStart += `${previousNotAtRules.join('')}{`;
      ruleEnd += '}';
    }
    if (atRules.length > 0) {
      ruleStart = `${atRules.join('{')}{${ruleStart}`;
      ruleEnd += '}'.repeat(atRules.length);
    }

    // Rules with @ should be behind other rules
    ruleList.push(`${ruleStart}${ruleDeclarations}${ruleEnd}`);
  }
  return ruleList;
};

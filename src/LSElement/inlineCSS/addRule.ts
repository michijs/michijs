import { CSSProperties } from '@lsegurado/htmltype/Attributes';

function addSelector(selector: string, text?: string) {
  return `${selector}{${text}}`;
}

export function addRule(sheet: CSSStyleSheet, selector: string, properties: CSSProperties, mediaValue?: string) {
  let rule = addSelector(selector, '');
  if (mediaValue) {
    rule = addSelector(mediaValue, rule);
  }
  const newRuleIndex = sheet.insertRule(rule);

  // @ts-ignore
  const pathOfStyle = mediaValue ? sheet.rules[newRuleIndex].cssRules[0] : sheet.rules[newRuleIndex];

  if (pathOfStyle) {
    Object.assign(pathOfStyle.style, properties);
  } else {
    if (mediaValue) {
      console.error(`Invalid selector at ${selector} or invalid media at ${mediaValue}`);
    } else {
      console.error(`Invalid selector at ${selector}`);
    }
    sheet.deleteRule(newRuleIndex);
  }
}

import { CSSProperties } from '@lsegurado/htmltype/Attributes';
import { addRule } from './addRule';

// TODO:
export const createInlineStyle = (properties: CSSProperties, mediaValue?: string) => {
  const newStyleSheet = new CSSStyleSheet();
  return (selector) => {
    addRule(newStyleSheet, selector, properties, mediaValue);
    return newStyleSheet;
  };
};
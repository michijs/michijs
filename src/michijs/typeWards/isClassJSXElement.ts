import { ClassJSXElement, IterableJSX } from '../..';

export function isClassJSXElement(param: IterableJSX): param is ClassJSXElement {
  return param.tag.tag;
}

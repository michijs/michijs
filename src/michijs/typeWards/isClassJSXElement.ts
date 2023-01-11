import { ClassJSXElement, FunctionJSXElement } from '../..';

export function isClassJSXElement(param: FunctionJSXElement | ClassJSXElement): param is ClassJSXElement {
  return 'tag' in param.tag;
}

import { h } from '../h';
import { LSCustomElement, RenderResult } from '../types';

export function CustomElementWrapper<T>(component: {prototype: LSCustomElement}) {
  return function (attrs: T, children): RenderResult {
    const lsStatic = component.prototype.lsStatic;
    if (lsStatic.extends) {
      return h.createElement(lsStatic.extends, { ...attrs, is: lsStatic.tag }, ...children);
    } 
    return h.createElement(lsStatic.tag, attrs, ...children);
  };
}

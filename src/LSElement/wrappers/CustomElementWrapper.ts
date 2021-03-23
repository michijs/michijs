import { h } from '../h';
import { commonElement } from '../h/DOM/HTMLElements/commonElementsWithAllRoles';
import { LSTag } from '../h/tags/LSTag';
import { RenderResult } from '../types';

export function CustomElementWrapper<T>() {
  return function <E extends Element>(component: new () => E) {
    return function (attrs: LSTag<T & commonElement, E>, children): RenderResult {
      const lsStatic = component.prototype.lsStatic;
      if (lsStatic.extends) {
        return h.createElement(lsStatic.extends, { ...attrs, is: lsStatic.tag }, ...children);
      }
      return h.createElement(lsStatic.tag, attrs, ...children);
    };
  }
}

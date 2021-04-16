import { h } from '../h';
import { commonElement } from '@lsegurado/htmltype/HTMLElements/commonElementsWithAllRoles';
import { LSTag } from '../h/tags/LSTag';

export function CustomElementWrapper<T>() {
  return function <E extends Element>(component: new () => E) {
    return function (attrs: LSTag<T & commonElement, E>, children): JSX.Element {
      const lsStatic = component.prototype.lsStatic;
      if (lsStatic.extends) {
        return h.createElement(lsStatic.extends, { ...attrs, is: lsStatic.tag }, ...children);
      }
      return h.createElement(lsStatic.tag, attrs, ...children);
    };
  };
}

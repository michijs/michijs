import { RenderResult } from '../types';
import { isAFunction } from '../typeWards/IsAFunction';

export interface FunctionComponent {
  (attrs: any, ...children): RenderResult;
}

export const h = {
  // TODO: Fix types
  createElement(tag: string | FunctionComponent, attrs, ...children) {
    if (tag === undefined) {
      return children;
    }
    if (isAFunction(tag)) {
      return tag(attrs, children);
    }
    const processedChildren = [];
    children.forEach(child => Array.isArray(child) ? processedChildren.push(...child): processedChildren.push(child));
    return { tag, attrs, children: processedChildren };
  },
};
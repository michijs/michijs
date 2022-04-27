import { createTarget, ListFactory } from '../DOMDiff/ListFactory';
import { h } from '../h';
import { FC, LSCustomElement } from '../types';

export type ListAttrs<Y, T extends string> = Parameters<
    FC<{
        as?: T,
        data: Y[],
        renderItem: (item: Y, index: number) => JSX.Element
    }>
>[0]
    & (T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : JSX.IntrinsicElements['div'])
    & { children?: never };

export function List<Y, T extends string = 'ls-list'>({ as, data, renderItem, ...attrs }: ListAttrs<Y, T>, self?: LSCustomElement) {
  const childrenRenderResult = data.map((x, i) => renderItem(x, i));
  return h.createElement(as ?? 'ls-list', {
    ...attrs,
    doNotTouchChildren: true,
    oncreated: (el) => {
      el.append(...createTarget(el, self).create(childrenRenderResult));
    },
    onupdate: (_jsx, el: Element, isSVG?: boolean, context?: LSCustomElement) => {
      ListFactory.update(childrenRenderResult, el, isSVG, context);
    }
  }, []);
}
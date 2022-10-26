import { createTarget, ListFactory } from '../DOMDiff/ListFactory';
import { h } from '../h';
import { FC, LSCustomElement } from '../types';
import { ListElement } from './FragmentAndList';

export type ListAttrs<Y, T extends string> = Parameters<
    FC<{
        as?: T,
        data: Y[],
        renderItem: (item: Y, index: number) => JSX.Element
    }>
>[0]
    & (T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : JSX.IntrinsicElements['div'])
    & { children?: never };

export function List<Y, T extends string = typeof ListElement.tag>({ as, data, renderItem, ...attrs }: ListAttrs<Y, T>, self?: LSCustomElement) {
  const childrenRenderResult = data.map((x, i) => renderItem(x, i));
  return h.createElement(as ?? ListElement.tag, {
    ...attrs,
    $doNotTouchChildren: true,
    $oncreated: (el, isSVG) => {
      createTarget(el, isSVG, self).appendItems(...childrenRenderResult);
    },
    $onupdate: (_jsx, el: Element, isSVG?: boolean, context?: LSCustomElement) => {
      ListFactory.update(childrenRenderResult, el, isSVG, context);
    }
  }, []);
}
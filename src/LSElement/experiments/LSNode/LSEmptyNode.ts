import { LSCustomElement } from '../../..';
import { EmptyType } from '../../types';
import { getJSXElementType, JSXElementType } from '../../typeWards/getJSXElementType';
import { LSNodeType } from './LSNode';
import { replaceNodeWith } from './replaceNodeWith';

export const LSEmptyNode = (_: EmptyType, isSVGParam: boolean, self: LSCustomElement) => {
  const el = document.createComment('');

  const node: LSNodeType = {
    el,
    children: null,
    updateElement: (newJSXElement: JSX.Element) => {
      const [type] = getJSXElementType(newJSXElement);
      if (type !== JSXElementType.EMPTY) {
        return replaceNodeWith(node, newJSXElement, isSVGParam, self);
      } 
      return node;
    },
    replaceWith: (...nodes) => el.replaceWith(...nodes),
    remove: () => el.remove(),
  };

  return node;
};
import { FragmentTag } from '../constants';
import { FC } from '../types';
import { addFragmentAndListStyle } from '../utils/addFragmentAndListStyle';

export const Fragment: FC<JSX.IntrinsicElements['div']> = (attrs, self) => ({
  tag: FragmentTag,
  attrs: {
    ...attrs,
    $oncreated: (el, isSVG, context) => {
      attrs?.$oncreated?.(el, isSVG, context);
      addFragmentAndListStyle(el, self);
    }
  }
});
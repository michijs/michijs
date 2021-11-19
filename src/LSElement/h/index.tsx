import { Fragment } from '../components/Fragment';

export const h = {
  createElement(tag, attrs, ...children): JSX.Element {
    const { children: attrsChildren, key, ...finalAttrs } = attrs ?? {};
    return { tag, attrs: { ...finalAttrs, children: attrsChildren ?? children }, key};
  },
  Fragment
};
